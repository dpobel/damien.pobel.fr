---
title: "Le moteur de recherche d'eZ publish"
tags: ez publish, truc, linux, pense bête
lang: "fr"
node: "61637"
remoteId: "106b69b06cbbdd4ce564e8008169e200"
published: 2006-09-29T00:00:14+02:00
updated: 2016-02-12 09:21
---
 
Le moteur de recherche est une fonctionnalité que je trouve particulièrement
réussie dans eZ publish, à la fois simple à mettre en oeuvre et bien conçu. Il
existe [en deux
versions](http://ez.no/doc/ez_publish/technical_manual/3_8/features/search_engine)
(une simple et une avancée) et fonctionne très bien grâce l'indexation des
textes et autres documents à télécharger ([PDF, Document Word et bien sûr Plain
Text sont
supportés](https://doc.ez.no/eZ-Publish/Technical-manual/4.x/Reference/Configuration-files/binaryfile.ini/HandlerSettings/MetaDataExtractor)
par défaut). D'ailleurs en regardant [le code nécessaire à l'indexation de
fichiers
PDF](https://github.com/ezsystems/ezpublish-legacy/blob/master/kernel/classes/datatypes/ezbinaryfile/plugins/ezpdfparser.php),
l'ajout du support d'autres formats ne semble pas être très difficile pourvu
qu'un programme en ligne de commande existe pour extraire les données textuelles
ou qu'il soit possible d'en écrire un. [Un article sur une autre manière
d'implémenter l'indexation de
documents](http://ez.no/community/articles/indexing_multiple_binary_file_types)
a été publié récemment, personnellement je trouve [la solution proposée moins
élégante que celle par
défaut](http://share.ez.no/learn/ez-publish/indexing-multiple-binary-file-types/%28page%29/3)
car cette solution utilise (en partie) l'extension du fichier pour détecter son
type et les programmes permettant d'extraire les données sont écrits en dur,
bref pas génial…

 
Pour en revenir au moteur de recherche par défaut, deux directives [de
configuration](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/searchsettings)
me semblent particulièrement intéressantes mais pas forcément simples à
comprendre au premier abord :

* [StopWordThresholdPercent](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/searchsettings/stopwordthresholdpercent) pour ne pas afficher une recherche avec énormément de résultats
* [DelayedIndexing](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/searchsettings/delayedindexing) pour améliorer les temps de réponses lors de la publication de données en remettant l'indexation à plus tard
 
  
## StopWordThresholdPercent

 
J'ai découvert cette directive aujourd'hui suite à une remarque d'un client qui
avait remarqué que le moteur de recherche ne renvoyait aucun résultat pour un
terme pourtant présent quasiment partout ; et c'était justement ça le problème!
En fait cette directive est positionnée à 60 par défaut, ce qui signifie que si
un terme est présent dans plus de 60% des objets publiés dans eZ publish, le
moteur l'ignore lors de la recherche c'est à dire qu'il considère le mot comme
un **StopWord**.
[StopWordThresholdValue](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/searchsettings/stopwordthresholdvalue)
indique à eZ publish d'utiliser le mécanisme des *StopWords* au delà d'un
certain de nombre de résultats. Par défaut cette valeur est positionnée à 100.

   
## DelayedIndexing

Cette directive indique à eZ publish de ne pas indexer le contenu des objets
lors de la publication. En activant cette fonctionnalité, eZ publish met en
attente l'indexation des objets lors de la publication. Ils seront alors indexés
par **indexcontent.php** lui même est lancé par le script **runcronjobs.php**
qui devra être lancé régulièrement à l'aide d'une tâche planifiée
([crontab](http://pwet.fr/man/linux/formats/crontab) sous Linux) pour garder la
pertinence du moteur. Je trouve ce mécanisme très intelligent car il apporte un
confort appréciable à l'utilisateur grâce à de meilleurs de temps réponse tout
en n'étant pas ou peu pénalisant à l'utilisation dans la plupart des cas.
