---
title: "De retour du eZCamp 2007"
tags: ez publish, openoffice, apache, formats, ez components, cms, google, web
updated: 2008-08-12T15:42:07.000Z
lang: "fr"
node: "64137"
remoteId: "ad3cc963c719eed934897b6e574f6d6a"
published: 2007-01-27T00:31:26+01:00
---

*Short summary for non french speaking people : it was a really nice event ! I was very impressed by the Bård's hack about import/export in ODF and export in PDF. It's a great feature. Paul's searching extension is another project that promises a lot with some new functionalities that missed in eZ publish... And I love my new t-shirt ;-)*


Comme [annoncé précédemment](/post/ezcamp-a-lyon-le-26-janvier-2007), j'étais au [Barcamp nom de code eZCamp](http://barcamp.org/EzCampLyon) dédié aux technologies autour d'[eZ publish](/tag/ez-publish) et d'eZ components aujourd'hui à Lyon. Cette escapade fut très instructive, j'ai assisté à ce qu'on peut appeler 3 présentations/discussions :

* [Bård Farstad](http://papelipe.no/) (co-fondateur d'eZ systems) nous a fait une démonstrattion d'un *hack*/prototype permettant l'import/export ODF et l'export PDF à partir d'un *template* en ODF ;
* Sam Johnston (de [Microcost](http://www.microcost.com/)) nous a fait une présentation sur l'intérêt de l'intégration des services Google avec eZ publish pour donner un environnement de bureau *online* ;
* [Paul Borgermans](http://walhalla.wordpress.com/) nous a présenté une nouvelle extension permettant la recherche en utilisant [le projet Solr](http://lucene.apache.org/solr/) de la fondation Apache.


La première présentation m'a vraiment bluffé. En gros, Bård Farstad a mis au point un *hack* permettant d'importer/exporter en ODF des documents complexes et structurés. En fait, dans le *template* ODF, on définit des cadres (au sens Openoffice du terme) où viendront s'insérer les différents attributs d'un objet (titre, résumé, texte, image, ...) ainsi le moteur est capable soit d'extraire les informations d'un document existant pour créer ou mettre à jour un objet, soit d'en génèrer un en respectant la mise en page au pixel près. L'export peut également se faire au format PDF en respectant exactement la mise en page aussi grâce à la fonction export d'Openoffice. Cette dernière fonctionnalité nécessite d'avoir Openoffice (et X11...) d'installer sur une machine (pas forcément la même que celle du serveur web heureusement) pour profiter sa fonction d'export. En terme d'administration système c'est un peu problématique mais la fonctionnalité est impressionnante. À quand un utilitaire en ligne de commande *odf2pdf* ou mieux encore un module PHP intégrant une partie du moteur d'Openoffice de conversion... On peut rêver non ?


La deuxième présentation était de mon point de vue moins intéressante, car moins technique/pratique. Sam Johnston a présenté Microcost, une société très &quot; *web 2.0*&quot; dont une des activités consiste à intégrer des services tiers (principalement ceux de Google) au sein d'application web de manière à recréer un environnement de travail en ligne.


Enfin, Paul Borgermans a présenté [une nouvelle extension dédié à la recherche](http://walhalla.wordpress.com/2007/01/17/ez-barcamp-lyon-advanced-searching-and-navigation-topic/). Cette extension utilise le projet Solr de la fondation Apache pour indexer et rechercher dans un site. Fonctionnellement parlant, c'est très intéressant (je pense en particulier au classement par pertinence) avec des performances apparemment très bonnes (malgré la mauvaise réputation de Java dans ce domaine). Un projet de plus à suivre voire à tester.


Je ne regrette pas mon déplacement, c'était vraiment enrichissant et sympathique et puis comme tout participant, j'ai eu un chouette t-shirt &quot;eZCamp Lyon 2007&quot; ;-)

