---
title: eZ Publish 4 Alpha 1 et beaucoup d'autres choses
tags: ez publish, mysql, ez components, linux, php, sécurité
updated: 2008-10-24T07:25:20.000Z
lang: fr
node: 66338
remoteId: eee60f9314a8675eec2b0e51ad39d752
published: 2007-10-06T00:42:52+02:00
---

## eZ Publish 4 Alpha 1


[eZ Publish](/tag/ez+publish) 4 arrive enfin, une première version alpha est sortie jeudi dernier basée sur [le portage communautaire](http://pubsvn.ez.no/nextgen/unstable/2007-03-21-php5/) débuté par [Kristof Coomans](http://blog.coomanskristof.be/) et [Paul Borgermans](http://walhalla.wordpress.com/). En terme fonctionnel ce ne sera probablement pas une révolution mais le principal atout de cette version est évidemment [le support tant attendu de PHP5](/post/ez-publish-et-php5) (les utilisateurs de distribution Linux ne supportant que PHP5 vont apprécier). En plus de cela, je retiens deux points qui apportent des perspectives intéressantes :

* l'intégration progressive des [eZ Components](/tag/ez+components)
* l'utilisation du mécanisme [d'autoload de PHP5](http://fr.php.net/autoload)


L'intégration des eZ Components permettra dans un premier temps d'utiliser ces composants dans les extensions en attendant qu'ils soient réellement intégrer dans eZ Publish en lui-même. Cela ouvre déjà pas mal de perspectives intéressantes, en tout cas j'ai plein d'idées :-)


Le second point paraît plus anodin mais en fait, en plus de simplifier la vie du développeur, il pourra permettre de modifier facilement une classe du kernel eZ Publish sans vraiment le modifier. Ce n'est bien sûr pas recommandé mais c'est malheureusement parfois nécessaire et là on pourra le faire de manière *presque propre*.


[LLaumgui parle aussi de cette sortie](http://www.llaumgui.com/post/eZ-publish-40-alpha-1-support-du-php5) avec [un commentaire instructif de Paul Borgermans](http://www.llaumgui.com/post/eZ-publish-40-alpha-1-support-du-php5#c4642).


## Et le reste ?


À côté de cet évènement eZ Publish 3.10 est sorti avec des nouveautés fonctionnelles intéressantes (qui sont aussi de fait dans eZ Publish 4), en particulier :

* [l'amélioration du clustering](http://pubsvn.ez.no/websvn/filedetails.php?repname=nextgen&amp;path=%2Frelease%2F3.10.0%2Fdoc%2Ffeatures%2F3.10%2Fcluster_enhancement.txt&amp;rev=0&amp;sc=1) (maintenant uniquement disponible pour MySQL)
* [un meilleure gestion des URL](http://pubsvn.ez.no/websvn/filedetails.php?repname=nextgen&amp;path=%2Frelease%2F3.10.0%2Fdoc%2Ffeatures%2F3.10%2Fmultilingual_support_for_urlalias.txt&amp;rev=0&amp;sc=1) (multilangue, règles de génération paramètrables, support de l'UTF8, ...)
* l'amélioration du datatype ISBN et un nouveau datatype Multi-options2

J'ai testé les nouvelles fonctionnalités autour des URL en développant [eZVideoFLV](/post/video-flv-datatype-extension) avec la 3.10beta ; habitué des _ et de l'ASCII c'est assez déroutant mais c'est enfin configurable et extensible, ça ne peut être que mieux. Je n'ai pas encore testé le datatype Multi-options2 mais ça ne saurait tarder.


[Les versions 3.9.4 et 3.8.10 sont également sorties](http://ez.no/developer/news/ez_publish_security_fixes_3_9_4_and_3_8_10) corrigeant deux failles de sécurité. Bref quoi qu'il arrive, des mises à jours sont à prévoir. Pour moi ce sera probablement en 3.10.x voire en 4.0 si une beta pointe le bout de son nez dans pas trop longtemps.


Enfin [Clever Age publie sur son blog un article plutôt pertinent](http://www.clever-age.com/veille/blog/ezpublish-et-mysql-un-couple-inseparable.html) sur le support un peu délaissé des SGBD autres que MySQL par eZ Publish (qu'ils ne savent par contre pas orthographier correctement :p).

