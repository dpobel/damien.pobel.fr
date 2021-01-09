---
title: "Let's play with eZ Components : Template and SystemInformation"
tags: geek, ez publish, ez components, php
node: "65759"
remoteId: "749094a0b6336259a4bd10816a62fce7"
published: 2007-06-17T17:12:02+02:00
updated: 2016-02-10 08:06
---
 
One of the main topics at [the eZ Conference](/post/ez-conference-2007) was the
[eZ Components](http://zetacomponents.org/). In fact, it's quite logic, eZ
Components will be the base of the future [eZ Publish](/tag/ez-publish). As
announced in the last community
newsletter (page put offline since…)
migration to eZ Components in eZ Publish will be made step by step and the
version 4.0 of eZ Publish will include [the Template
component](http://zetacomponents.org/documentation/trunk/Template/tutorial.html),
so it's time to have a look at it. I had already [tested the Graph
component](/post/graphique-d-indexation-avec-le-module-graph-d-ez-components)
and the PersistentObject one too. I was very impressed by the quality of those
libraries even if I had [some weird system related problems with PHP
PDO](/post/pdo-mysql-sous-ubuntu-au-bord-de-la-crise-nerfs).
 
I built [a very simple application](http://vrac.pwet.fr/sysinfo/) that uses the
Template component to display informations provided by [the
SystemInformation](http://zetacomponents.org/documentation/trunk/SystemInformation/tutorial.html)
one. I notice some improvements in this new template engine :

* it seems more strict. it's a good news for developers. In my opinion,
  strictness is mandatory to have a predictive and easy to use templating
  system.
* there are [many new
  operators](http://zetacomponents.org/documentation/trunk/Template/functions.html)
  and the syntax is more consistent.
* the syntax of templates is a bit different but there are some improvements
  that make developer tasks easier&nbsp;:
    * a template has to declare variables that it will use with the `use`
      keywords so you can see what you can use in templates. Templates can also
      send data to templating engine ;
    * local variables have to be declared at the top level scope, no more
      declaration in the middle of a loop ;
    * I love the `1..10` syntax to build an array from 1 to 10 ;
    * there's no more [wash
      operator](http://ez.no/doc/ez_publish/technical_manual/3_9/reference/template_operators/strings/wash),
      everything is automatic with the context of the template engine and if you
      don't need it, you can use [the `raw` keywords.

For me the new template system goes to the right direction, it's more strict and
by the way easier to use, operators seem more consistent and the new syntax
brings some facilities that simplify developer's life. We now have to wait until
the end of 2007 to use it in eZ Publish…
