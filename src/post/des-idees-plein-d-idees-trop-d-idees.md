---
title: "Des idées, plein d'idées, trop d'idées"
tags: framework, xul, geek, ez publish, yahoo, spam, ez components, logiciels libres, google, blog, php, référencement, web
updated: 2006-11-19T11:12:17.000Z
lang: "fr"
node: "62721"
remoteId: "9798971c1d39ae040cb980e4b0758198"
published: 2006-11-04T16:16:53+01:00
---
 
Par moment il m'arrive d'avoir plein d'idées de développements que ce soit pour vraiment produire quelque chose (comme ce [blog](/) / [cv](/page/cv-fr) / [galerie photo](http://photos.pwet.fr) par exemple) ou tout simplement par curiosité pour tester de nouvelles technologies. Voici une liste non exhaustive de ce que j'aimerais avoir le temps de faire/tester en ce moment :

 * [Un logiciel de suivi de référencement](#eztoc167940_1)
 * [Un lecteur RSS en ligne](#eztoc167940_1)
 * [Une extension eZ publish permettant d'administrer &quot;par liste&quot;](#eztoc167940_3)
 * [Un logiciel d'administration pour eZ publish](#eztoc167940_4)
  
## Un logiciel de suivi de référencement

 
Celui la, j'y pense depuis un sacré moment, un logiciel qui permettrait de visualiser et gérer sur une interface web le nombre de page indexées, son positionnement sur des mots clefs différents sur les principaux moteurs de recherche. Le tout avec la génération de jolies graphiques pour suivre son évolution. Un peu dans l'esprit de mes &quot;bricolages&quot; en [shell script pour Yahoo!](/post/un-script-shell-pour-compter-le-nombre-de-pages-indexees-dans-yahoo) et [Google](/post/un-script-shell-pour-compter-le-nombre-de-pages-indexees-dans-google) associés au [test du module Graph d'eZ components](/post/graphique-d-indexation-avec-le-module-graph-d-ez-components) mais en beaucoup plus propre évidemment. À ma connaissance, il n'existe pas d'outils libre de ce type.

 
Pour ce type de projet, la base pourrait être un framework qui propose différents modules et simplifierait le stockage de données dans une base, le premier qui me vient à l'esprit est [eZ components](http://ez.no/products/ez_components) qui me séduit vraiment par sa conception, mais d'autres alternatives plus à la mode ou plus sexies pourrait être intéressantes, je pense au très connu [Ruby on Rails](http://www.rubyonrails.org/) mais aussi à [Symphony](http://www.symfony-project.com/) récemment [adopté par Yahoo!](http://linuxfr.org/2006/11/01/21559.html) et il y en a beaucoup d'autres...

   
## Un lecteur RSS en ligne

 
Il en existe déjà pas mal. Je verrais bien une interface en [XUL](http://xulfr.org/) en ligne associant ergonomie et praticité d'une interface riche aux avantages d'une interface en ligne (accessible partout, légèreté), le tout associé à une extension Firefox permettant d'ajouter directement ses flux dans l'application, ce serait vraiment sympa. J'avais d'ailleurs fait un prototype de l'interface, mais j'arrive pas à remettre la main dessus...

   
## Une extension eZ publish permettant d'administrer &quot;par liste&quot;

 
Sur ce blog, je suis de plus en plus confronté aux *spams* par les *trackbacks*. L'administration d'un site eZ publish [basée sur l'arborescence](http://ez.no/doc/ez_publish/user_manual/3_8/the_administration_interface/the_content_structure_tab) est très pratique pour gérer son contenu, mais pas pour supprimer, visualiser les *trackbacks* ou les commentaires sur un blog. J'aimerais vraiment avoir une page ou je pourrais lister un ensemble d'objets par classe, l'ensemble pourrait être trié/restreint selon différents critères (date, auteur, ...).

   
## Un logiciel d'administration pour eZ publish

 
eZ publish propose une interface [SOAP](http://fr.wikipedia.org/wiki/Simple_Object_Access_Protocol), je n'ai pas encore pu vraiment étudier la question en profondeur (c'est très peu documenté...), mais il devrait être théoriquement possible d'administrer un site via des requêtes SOAP. Ces requêtes SOAP pourraient très bien être envoyées par une application &quot;en dur&quot; (exemple construite avec [xulrunner](http://xulfr.org/wiki/XulRunner)) proposant une interface bien plus évoluée que n'importe quelle interface web.

 
Par rapport aux trois autres idées, celle-ci est plus de l'ordre du fantasme qu'autre chose, car le travail pour arriver à quelque chose d'utilisable me semble assez énorme. Mais si il y a des volontaires en manque d'idées ... :-)

 