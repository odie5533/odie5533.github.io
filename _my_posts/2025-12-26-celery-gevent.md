---
layout: post
title: "Celery: 63% RAM reduction and 100x concurrency with gevent"
date: 2025-12-26 00:00:00
description: From a single worker to 100x concurrency while reducing RAM from 378 MB to 139 MB.
tags: celery gevent python
categories: programming
---

Celery is the most popular task queue for Python. It's used when you need to run a background job, such as sending emails, scraping APIs, or any long-running task that you don't want your Flask, Django, or FastAPI application to handle in the request/response cycle.

Out of the box, Celery needs some tweaks to achieve good performance and concurrency. Without them, you're going to constantly be dealing with latency, memory, and broker issues.

## The Default Worker

```sh
celery worker -A celery_worker.celery -Q api-scraper
  -c 1
```

By default, Celery uses a prefork worker pool. This creates a parent process and a separate process for each worker, and each worker follows standard blocking execution. For a single worker queue, this means two processes (1 parent and 1 child).

## Enter gevent

```sh
celery worker -A celery_worker.celery -Q api-scraper
  -P gevent -c 100
```

Gevent is a library and worker class that modifies how underlying IO calls work in Python, offloading the IO calls to work asynchronously without you needing to modify your code. Your normal blocking code that uses requests, redis-py, boto3, or psycopg3 will just work (nb: if you're using psycopg2, pip install [psycogreen](https://pypi.org/project/psycogreen/) to make it work with gevent). The benefit proposition of gevent is that since your Celery worker is async, it can scale up how many tasks a single worker can run, and you no longer need extra child processes at all! Instead of each worker being a process, each worker is a greenlet which is like a thread but lighter and managed inside of Python instead of by your OS. We now cut the RAM usage roughly in half and we increased our concurrency by 100x.

<div class="text-center">
{% include figure.liquid loading="lazy" path="assets/img/my-posts-images/2025-12-26-celery-gevent/twice-your-level-500.jpg" title="Star Trek screencap of Captain Kirk with caption, 'We have your psychokinetic ability at twice your power level'" class="img-fluid rounded z-depth-1" max-width="500px" %}
</div>

## Extra flags, extra wins

```sh
celery worker -A celery_worker.celery -Q api-scraper
  --without-gossip --without-mingle --without-heartbeat
  -P gevent -c 100
```

These flags (--without-gossip --without-mingle --without-heartbeat) reduce overhead on your message broker assuming you don’t use Flower or Celery events. These features of Celery can overwhelm your broker at high message rates, so unless you need them, turn them off. See the advice at [https://docs.hatchet.run/blog/problems-with-celery#heartbeatgossipmingle](https://docs.hatchet.run/blog/problems-with-celery#heartbeatgossipmingle) for more information on these.

## Importing the World

```sh
celery worker -A celery_worker.celery -Q api-scraper
  --without-gossip --without-mingle --without-heartbeat
  -P gevent -c 100
  -I tasks.api_scraper
```

Don’t import the world. If you have 5 different Celery tasks, structure your project so that each task lives on its own island. Maybe one task uses Scipy and another needs Selenium. If you’re not careful, every Celery worker is going to load Scipy and Selenium into memory!

Your celery_worker.py file should be simple. Just load the config and setup logging. Don’t import your tasks. Instead, use the -I flag to import your specific task. Five different celery processes with five different queues can then each have their own set of libraries they load into memory without all of them loading everything.

If one queue is processing many tasks, consider lazy loading within those tasks if they’re not commonly run. If you only occasionally run boto3 tasks on the queue, lazy import the boto3 library within the task rather than at the top of the module.

## Prefetch One

```python
# celery_worker.py
app.conf.worker_prefetch_multiplier = 1
```

`worker_prefetch_multiplier` is 4 by default. This is great if your tasks take less than 100 ms each. But if your tasks take more than 100 ms, you should set this down to 1. Prefetch 4 means the first worker to start takes 4 messages _per concurrency_. Each of those messages is from FIFO, so they end up waiting longer even though they were first in line. If your tasks are simple database operations, leaving it at 4 is fine. But if they’re longer running, the task work is going to be the predominant time sink and the extra calls to the broker aren’t going to matter.

## At Most Once or At Least Once?

```python
app.conf.task_acks_late = True
app.conf.task_reject_on_worker_lost = True
```

The other flag to consider is acks_late. It defaults to False which means that as soon as a worker retrieves a task from the message broker, it tells the message broker to delete the task. What happens if the worker immediately dies after that? The task goes poof is what happens, because it was already acknowledged.

You can set acks_late to True. This means that Celery will only mark the task complete if it doesn’t die mid-task. Pair this with task_reject_on_worker_lost so the task gets requeued if the worker crashes. But you could end up with situations where the task is partly run twice! So think this one through. Note that only worker death requeues tasks. If you want to requeue on exceptions, you’ll need to use the retry option in the task decorator.

## Gotchas

Because the gevent worker pool doesn’t spawn child processes, the max_tasks_per_child flag doesn’t work with it. That flag normally would restart your prefork workers every 1000 tasks or so to prevent memory leaks. If you encounter leaks, you’ll need to front celery with [circus](https://circus.readthedocs.io/en/latest/) and have circus restart your celery workers. You’ll be back at 2 celery processes, but at least now they can handle 100x concurrent tasks each.

```conf
[watcher:celery-api-scraper]
cmd = celery
args = worker -A celery_worker.celery --without-gossip --without-mingle --without-heartbeat -P gevent -Q api-scraper -c 100 -I tasks.api_scraper
numprocesses = 2
max_age = 21600 # restart after 6 hours
max_age_variance = 3600 # add up to 1 hour of randomness so they don't restart together
graceful_timeout = 60
```

## IO-Bound Only

Gevent works best with purely IO-bound work: network calls to APIs, calls to your services, calls to the database, calls to Redis. Things get hairy if you try to mix in any CPU-bound work because CPU-bound work won’t yield inside the process to the other greenlets. You’ll need to separate out the CPU work to other celery pools, or get creative with OS thread pools or process pools.

## Conclusion

| Worker Type           | RAM Usage |
| --------------------- | --------- |
| Gevent + lazy loading | 139 MB    |
| Prefork + all modules | 378 MB    |

<br/>
There are a few very important knobs on Celery that you should turn in even the simplest of setups. Switching to gevent and taking a bit of care with imports will make your pools a lot faster and a lot leaner. Though for numpy or other CPU-bound tasks, prefork or a thread-based pool is still necessary.

#### Final Command

```sh
celery worker -A celery_worker.celery -Q api-scraper
  --without-gossip --without-mingle --without-heartbeat
  -P gevent -c 100
  -I tasks.api_scraper
```

## Other options

- If you don't like Celery, try [Taskiq](https://github.com/taskiq-python/taskiq), [Hatchet](https://hatchet.run/), [Airflow](https://airflow.apache.org/), [Temporal](https://temporal.io/), [Dramatiq](https://github.com/Bogdanp/dramatiq), or [rq](https://github.com/rq/rq).
