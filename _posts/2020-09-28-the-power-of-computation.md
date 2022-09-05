---
layout: post
title:  The Power of Computation
date: 2020-09-28 12:00:00
description: 
tags: 
categories: Technology
---
When I first heard of <em>Computation</em> and <em>Computational Science</em>, I stopped for a moment and asked myself: “Do I know what a computation <em>is</em>? It has something to do with <b>compute</b>rs, that much I’m sure of. But do I know anything more?” The answer was no. As always, this drove me to learn more about the topic.

Today, many months later, I’d like to put into words parts of what I have since gotten to know about Computation and Computational Science, similar to the jumble of definitions and concepts that I picked up on in my <a href="https://medium.com/@adaniabutto/what-is-cognitive-neuroscience-and-what-does-its-research-look-like-450012335d0e" target="_blank">article on Cognitive Neuroscience</a>.

<h2>What exactly is Computation?</h2>
To <em>compute</em> really just means to <em>calculate</em> or <em>process</em>. You can think of it as <em>processing an input</em> which then (usually) results in an <em>output</em>. A simple example of this is “2+2 = ?”, with “2+2” being the input and “?” being the output, which ends up being 4. A nice way to portray any input-output relationship is by the use of <em>mathematical functions</em>, e.g.
$$ f(x) = x+x $$ for which the <em>output</em> is 4 when the input (i.e. “x”) is <em>2</em>. Obviously, as the input changes, the output changes, too. Functions are very useful to compute things!

But what does the processing? Does it have to be a computer or could it also be a person? The answer to these questions became clear to me once I had watched the movie <a href="https://www.imdb.com/title/tt4846340/" target="_blank">Hidden Figures</a>, which tells the story of <a href="https://en.wikipedia.org/wiki/Katherine_Johnson" target="_blank">Katherine Johnson</a> and her colleagues, <a href="https://en.wikipedia.org/wiki/Mary_Jackson_(engineer)" target="_blank">Mary Jackson</a> and <a href="https://en.wikipedia.org/wiki/Dorothy_Vaughan" target="_blank">Dorothy Vaughan</a>. All three of them worked as <a href="https://en.wikipedia.org/wiki/Computer_(job_description)" target="_blank">human computers</a> for NASA, starting back in the 1950’s. The definition of a human computer in that context is “a person <b>performing mathematical calculations</b>, before electronic computers became commercially available”.

The three friends ended up making various crucial contributions to NASA’s work, especially the Apollo 11 mission and Space Shuttle program— Katherine Johnson calculated the trajectories and launch windows that were central to the success of said things. However, for the three of them to receive credit for their accomplishments back then was a constant struggle. If you’re interested in the full story, you can read more about it in the books <a href="https://en.wikipedia.org/wiki/Hidden_Figures_(book)" target="_blank">Hidden Figures</a> (the story of the three of them) and/or <a href="https://www.goodreads.com/book/show/43309900-reaching-for-the-moon" target="_blank">Reaching for the Moon</a> (the autobiography of Katherine Johnson).

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/hiddenfigures.jpeg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
NASA’s “human computers”, Mary Jackson on far right, taken in the 1950s. Photo source: <a href="https://en.wikipedia.org/wiki/File:NASA_human_computers_-_Mary_Jackson_on_far_right_-_Pressure_Tunnel_staff_taken_in_1950s.jpg" target="_blank">Wikipedia</a>.
</div>

So, to get to the point: Yes, the “processing” entity can technically also be a human being. However, since computers have long ago proven to be much faster at performing calculations than (most) humans, they are the ones that are nowadays being used for such endeavours. There are of course many types of computers, which the following <a href="https://en.wikipedia.org/wiki/Computation#Physical_phenomenon" target="_blank">quote</a> illustrates well:

<blockquote>
A computation can be seen as a purely physical phenomenon occurring inside a closed <a href="https://en.wikipedia.org/wiki/Physical_system" target="_blank">physical system</a> called a computer. Examples of such physical systems include <a href="https://en.wikipedia.org/wiki/Digital_computer" target="_blank">digital computers</a>, <a href="https://en.wikipedia.org/wiki/Mechanical_computer" target="_blank">mechanical computers</a>, <a href="https://en.wikipedia.org/wiki/Quantum_computer" target="_blank">quantum computers</a>, <a href="https://en.wikipedia.org/wiki/DNA_computer" target="_blank">DNA computers</a>, <a href="https://en.wikipedia.org/wiki/Molecular_computer" target="_blank">molecular computers</a>, microfluidics-based computers, <a href="https://en.wikipedia.org/wiki/Analog_computer" target="_blank">analog computers</a>, or <a href="https://en.wikipedia.org/wiki/Wetware_computer" target="_blank">wetware computers</a>. …
</blockquote>

More radical theories argue that the brain fundamentally is a computer and thus human thought is computation. <a href="https://en.wikipedia.org/wiki/Digital_physics#Pancomputationalism" target="_blank">Some</a> go even further and say the entire universe is a computation. I personally have not read enough about these theories to further dive into them in today’s story, which is why I’ll keep to the “original” definition of computation for now.

<h2>What can computation do (and what can it not do)?</h2>
So, we have now covered that computation, in the <a href="https://www.merriam-webster.com/dictionary/computing" target="_blank">original sense of the word</a>, is referring to processing and performing (mathematical) calculations using a computer. At first, this might not seem like much, but <em>a lot</em> can be done with such computation. The best examples of this are algorithms:

An impressive one would be <a href="https://en.wikipedia.org/wiki/Data_compression" target="_blank">data compression</a>, which is what essentially enables us to store more data on our devices by reducing file size. A rather basic (but still important) example would be <a href="https://en.wikipedia.org/wiki/Zeller%27s_congruence" target="_blank">Zeller’s congruence</a> which can calculate the day of the week for any (gregorian or julian) calendar date.

However, there are <b>limits</b> to what a computer and computations can do: Some problems are simply too complex. An example of that would be accurate weather predictions at a local scale. The impossibility of the computation of it seems to mostly come down to a (current) lack of computing power and available data. Furthermore, some problems are impossible to compute, even as computers get faster and better, such as the <a href="https://en.wikipedia.org/wiki/Halting_problem" target="_blank">Turing Halting problem</a>. And last but not least, a computer can only compute what we <em>tell it</em> to compute. Thus, the realm of problems that can be solved via computation is constricted to the problems we <em>know of</em>. Despite this being quite obvious, it is still a crucial point when it comes to understanding what a computer can do — as of now, computers don’t have a mind of their own. Once they do, we might profit from their ways of thinking of new problems or their ways of going about solving problems!

<h2>How and why is this relevant to the future of the world?</h2>
With the examples I listed in the previous section, it is quite evident that computations contribute a large amount to our progression in science and society. This also becomes clear through the recent emergence of many computational subfields, such as <a href="https://en.wikipedia.org/wiki/Computational_social_science" target="_blank">Computational Social Science</a>, <a href="https://en.wikipedia.org/wiki/Computational_neuroscience" target="_blank">Computational Neuroscience</a>, <a href="https://en.wikipedia.org/wiki/Computational_biology" target="_blank">Computational Biology</a>, and so forth, which are all making use of computational methods to attack problems and tackle open questions from a different angle in order to generate answers and solutions.

I for one am excited to learn more about how computation works and evolves, as it is also becoming increasingly relevant in Psychology and other fields that are interests of mine. I’m very optimistic about what can be done with the help of computers, which I have stated many times in my previous articles. If you happen to also be interested in learning the very basics of computation and/or computer science, <a href="https://www.edx.org/course/introduction-to-computer-science-and-programming-7" target="_blank">this edX course</a> is one that has been working well for me.