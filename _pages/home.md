---
layout: about
title: home
permalink: /
nav: false
order: 1

profile:
  align: right
  image: profile_pic.png
  more_info: >
    <div class="social"><div class="contact-icons" style="font-size: 16pt"><a href="/assets/pdf/David Bern Resume.pdf"><i class='fa-regular fa-2x fa-file-pdf'></i></a> <a href="https://github.com/odie5533"><i class='fab fa-2x fa-github'></i></a></div></div>

projects: true
news: false # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I'm a Software Engineer at Live Building Systems. I am passionate about solving difficult technology problems, working with excellent people, and using and building awesome software.

I received my Bachelor of Science from Illinois Institute of Technology in Biomedical Engineering. My coursework included biological applications of statistics, digital signal processing, fluid dynamics, and differential equations.

In my free time, I dabble in small <a href="https://github.com/odie5533">coding projects</a>. I always enjoy exchanging ideas with others, so please don't hesitate to reach out!<br><br>

<h2 style="clear: both"><b>p</b>rojects</h2>

<div class="row">
    <div class="col-sm-4">
        <a href="https://chrome.google.com/webstore/detail/wikipedia-watchlist/kmfbnpoggnebafhbanelibhdpbkkncfe?hl=en">{% include figure.liquid loading="eager" path="assets/img/wikipediawatchlist.jpg" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://chrome.google.com/webstore/detail/wikipedia-watchlist/kmfbnpoggnebafhbanelibhdpbkkncfe?hl=en">Wikipedia Watchlist</a>, an extension for Google Chrome that checks your watchlist on Wikipedia and updates the browser icon when new changes are found. Clicking the icon shows a summarized view of the changes and links to them. Options page allows you to configure the language and update interval. <a href="https://github.com/odie5533/Chrome-Wikipedia-Watchlist"><i class='fa-brands fa-square-github'></i></a>
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <a href="https://github.com/browning/tiger-hash-python">{% include figure.liquid loading="eager" path="assets/img/tiger.png" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://github.com/browning/tiger-hash-python">tiger-hash-python</a>, completed the first pure Python implementation of the <a href="https://en.wikipedia.org/wiki/Tiger_(hash_function)">Tiger Hash function</a>, building on the initial work of Brian Browning.
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <a href="https://davidbern.com/Comic-Viewer/">{% include figure.liquid loading="eager" path="assets/img/comicviewer.png" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://davidbern.com/Comic-Viewer/">Comic Viewer</a>, a Windows application for reading comics on your computer. It can read from standard .cbr and .cbz files, caches images in memory to increase responsiveness, and can find similarly named files in the same directory. The program is written in Python using Pygame, it includes a Windows Explorer plugin for thumbnail generation that is written in C++, and the app is bundled using an installer.<a href="https://github.com/odie5533/Comic-Viewer"><i class='fa-brands fa-square-github'></i></a>
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <a href="https://github.com/odie5533/WarcQtViewer">{% include figure.liquid loading="eager" path="assets/img/warcqtviewer.png" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://github.com/odie5533/WarcQtViewer">WarcQtViewer</a> is an application for viewing and managing .warc or .warc.gz files. It is written in Python, using PyQt to create a user interface and light web browser widget. It uses my WarcReplay library to create a proxy and lets you view and navigate the archived website files.
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <a href="https://github.com/odie5533/WarcMiddleware">{% include figure.liquid loading="eager"  path="assets/img/scrapy.png" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://github.com/odie5533/WarcMiddleware">WarcMiddleware</a> is a library that lets users save mirror backups of websites to their computer. It is an addon for the Python web crawler Scrapy that saves web server transactions (requests and responses) into a Web ARChive (WARC) file (ISO 28500). The transactions can then be played back or viewed, similar to using Archive.org's WayBackMachine. The WARC format is a standard method of saving these transactions.
    </div>
</div>

<div class="row">
    <div class="col-sm-4">
        <a href="https://github.com/odie5533/Python-RTSP">{% include figure.liquid loading="eager"  path="assets/img/streaming.png" title="example image" class="img-fluid rounded z-depth-1" %}</a>
    </div>
    <div class="col-sm-8">
        <a href="https://github.com/odie5533/Python-RTSP">Python-RTSP</a>, a library which extends the Twisted Python library to support Real Time Streaming Protocol (RTSP) and Real Data Transport (RDT) for connecting to streaming video servers. It also includes support for handling ASMRP, SDPP, and RMFF data transported over those protocols.
    </div>
</div>
