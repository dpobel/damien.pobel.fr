---
title: "Performances et \"extensibilité\" (scalability)"
tags: performances, php, mysql, web, réseau, http, citation
lang: "fr"
node: "67915"
remoteId: "a77fce82e8b3caa04247abc210252424"
published: 2009-08-21T00:33:10+02:00
updated: 2016-02-12 12:08
---

*Via* [High
Scalability](http://highscalability.com/blog/2009/8/18/real-world-web-performance-scalability.html),
j'ai découvert cette présentation intitulée [Real World Web: Performance &amp;
Scalability](http://develooper.com/talks/rww-mysql-2008.pdf) donnée lors de la
MySQL conference 2008 par [Ask Bjørn
Hansen](http://www.askbjoernhansen.com/). Cette longue présentation (189
pages&nbsp;!) est une excellente compilation de la plupart des conseils que l'on peut
trouver un peu partout pour améliorer les performances et l'extensibilité (au
niveau de l'architecture) d'une application web par exemple à base de MySQL et
du langage de votre choix (PHP, Perl, Ruby, ...)

On peut y trouver également quelques petites phrases assez amusantes du type
(traduction libre)&nbsp;:

<blockquote>
N'hésitez pas à dé-normaliser les données; [...] appelez cela des summary tables, votre DBA n'y prêtera même pas attention.
</blockquote>

où encore une jolie manière d'expliquer les concepts de <abbr title="Model View
Controller">MVC</abbr>  et d'<abbr title="Application Programming
Interface">API</abbr> <abbr title="Application Programming Interface"> </abbr>

<blockquote>
<ul>
<li>Model&nbsp;: parle le SQL</li>
<li>View&nbsp;: parle le HTML</li>
<li>Controller&nbsp;: parle le HTTP</li>
<li>API&nbsp;: fait des trucs</li>
</ul>
</blockquote>


Bref, ce document mérite de s'y attarder quelques minutes&nbsp;:

<iframe class="scribd_iframe_embed" src="https://www.scribd.com/embeds/2569319/content?start_page=1&view_mode=slideshow&access_key=key-hmtv7al4b6kq08y533b&show_recommendations=false" data-auto-height="false" data-aspect-ratio="0.75" scrolling="no" id="doc_58185" width="660" height="880" frameborder="0"></iframe>
