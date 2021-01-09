---
title: "Demo de l'API REST v2 d'eZ Publish à la eZ Unconf #2"
tags: ez publish, ez publish 5, rest, javascript
lang: "fr"
published: 2013-06-13T14:50:02+02:00
---

([English version available on
share.ez.no](http://share.ez.no/blogs/damien-pobel/rest-api-demo-application-at-the-ez-unconf-2))

[Comme je l'écrivais
dernièrement](/post/ez-community-unconference-2), j'étais
à la [eZ Unconference
2013](http://share.ez.no/blogs/ez/ez-unconference-2-look-back-at-the-event-slides-and-pics)
à proximité de Montpellier. Pendant l'atelier API publique et API REST, j'ai
présenté une utilisation concrète [l'API REST v2 d'eZ
Publish](https://confluence.ez.no/display/EZP/REST+API). J'ai choisi de
construire une petite application en HTML5/JavaScript statique pour montrer qu'il est possible
de faire une application assez amusante avec très peu de lignes de code.

## L'application

Le code de cette application est disponible [sur Github dans le dépôt
eZunConf2013-REST-API-demo](https://github.com/ezunconference/eZunConf2013-REST-API-demo)
et [elle est installable](https://github.com/ezunconference/eZunConf2013-REST-API-demo#install)
sur n'importe quel eZ Publish 5 suffisament récent. Avec [un navigateur moderne
supportant l'API getUserMedia/Stream](http://caniuse.com/stream), elle permet de
prendre une photo avec la webcam de votre ordinateur et de créer un objet Image
à partir de celle-ci dans eZ Publish&nbsp;! Voici un rapide screencast de
l'application en action:

<div class="video-container">
<iframe width="640" height="480" src="https://www.youtube-nocookie.com/embed/4bTClN_4HYg?rel=0"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Ce genre de fonctionnalité aurait typiquement sa place sur n'importe quel site
où les utilisateurs devraient avoir une vraie photo sur leur profil comme un
réseau social, un intranet d'entreprise, un site communitaire,&nbsp;…

## Quelques détails techniques

* Dans le screencast, le navigateur demande à l'utilisateur de s'identifier car
  l'application utilise l'authentification *Basic* (la méthode d'authenfication
par défault de l'API REST). [Avec quelques modifications
mineures](https://github.com/ezunconference/eZunConf2013-REST-API-demo#session-authentication),
l'authenfication par session est aussi utilisable.
* 6 requêtes HTTP sont nécessaires à la création du contenu et à la récupération
  de son URI. Ce chiffre relativement important est dû à la division fine des
ressources (il s'agit d'une bonne pratique dans le design d'une API REST). Autre
point sur les ressources, les URIs ne devraient jamais être construites par le
client REST, mais toujours récupérées depuis une réponse précédente. Des API
clientes (en PHP et en JavaScript) sont en cours d'écriture et elles devraient
permettre de largement simplifier le code en évitant d'avoir à travailler au
niveau requêtes HTTP.
* L'application doit être sur le même domaine qu'eZ Publish. Il s'agit d'une
  limitation imposée par les navigateurs. [Il est possible de *contourner* ce
problème](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS)
mais je n'ai juste pas eu le temps de me pencher en détail là dessus.

Pour de plus amples détails, je vous laisse examiner [le code
JavaScript](https://github.com/ezunconference/eZunConf2013-REST-API-demo/blob/master/demorest/index.htm#L46). Merci
d'être indulgent sur la qualité du code, cet exemple a vraiment été écrit
rapidement et dans le but d'être très simple à comprendre. J'espère avoir le
temps d'écrire une version plus propre et plus avancée prochainement.

## Ressources au sujet de l'API REST v2 d'eZ Publish

* [La documentation officielle](https://confluence.ez.no/display/EZP/REST+API)
* [Les spécfications de l'API REST
  v2](https://github.com/ezsystems/ezpublish-kernel/blob/master/doc/specifications/rest/REST-API-V2.rst)
* [createcontent.sh](https://gist.github.com/bdunogier/3918294) par [Bertrand Dunogier](http://share.ez.no/community/profile/10106)
* [Un ensemble de scripts de test](https://github.com/emodric/ezpRestScripts) par [Edi Modrić](http://share.ez.no/community/profile/89539)
* [Using the eZ Publish REST API v2 with
  cURL](http://damien.pobel.fr/post/ez-publish-rest-curl) publié ici-même il y'a
quelques temps
