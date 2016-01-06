---
title: Performances et "extensibilité" (scalability)
tags: performances, php, mysql, web, réseau, http
updated: 2010-06-13T21:09:23.000Z
lang: fr
node: 67915
remoteId: a77fce82e8b3caa04247abc210252424
published: 2009-08-21T00:33:10+02:00
---

*Via*[High Scalability](http://highscalability.com/real-world-web-performance-scalability), j'ai découvert cette présentation intitulée [Real World Web: Performance &amp; Scalability](http://develooper.com/talks/rww-mysql-2008.pdf) donnée lors de la [MySQL conference 2008](http://www.mysqlconf.com/mysql2008) par [Ask Bjørn Hansen](http://www.askbjoernhansen.com/). Cette longue présentation (189 pages !) est une excellente compilation de la plupart des conseils que l'on peut trouver un peu partout pour améliorer les performances et l'extensibilité (au niveau de l'architecture) d'une application web par exemple à base de MySQL et du langage de votre choix (PHP, Perl, Ruby, ...)


On peut y trouver également quelques petites phrases assez amusantes du type (traduction libre) :

<blockquote>
N'hésitez pas à dé-normaliser les données; [...] appelez cela des summary tables, votre DBA n'y prêtera même pas attention.
</blockquote>


où encore une jolie manière d'expliquer les concepts de <abbr title="Model View Controller">MVC</abbr>  et d'<abbr title="Application Programming Interface">API</abbr> <abbr title="Application Programming Interface"> </abbr>

<blockquote>
* Model : parle le SQL
* View : parle le HTML
* Controller : parle le HTTP
* API : fait des trucs
</blockquote>


Bref, ce document mérite de s'y attarder quelques minutes :

<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" id="doc_850333342495640" name="doc_850333342495640" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" height="410" width="520" >
<param name="movie" value="http://d.scribd.com/ScribdViewer.swf?document_id=2569319&access_key=key-hmtv7al4b6kq08y533b&page=1&version=1&viewMode=slideshow">
<param name="quality" value="high">
<param name="play" value="true">
<param name="loop" value="true">
<param name="scale" value="showall">
<param name="wmode" value="opaque">
<param name="devicefont" value="false">
<param name="bgcolor" value="#ffffff"> 
<param name="menu" value="false">
<param name="allowFullScreen" value="true">
<param name="allowScriptAccess" value="always">
<param name="salign" value="">
<param name="mode" value="slideshow">
<embed src="http://d.scribd.com/ScribdViewer.swf?document_id=2569319&access_key=key-hmtv7al4b6kq08y533b&page=1&version=1&viewMode=slideshow" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" scale="showall" wmode="opaque" devicefont="false" bgcolor="#ffffff" name="doc_850333342495640_object" menu="true" allowfullscreen="true" allowscriptaccess="always" salign="" type="application/x-shockwave-flash" align="middle" mode="slideshow" height="410" width="520"></embed>
</object>


