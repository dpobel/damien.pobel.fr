---
title: "Sortie de Auto Status 0.2"
tags: ez publish, extension, twitter, php
updated: 2011-07-22T20:07:11.000Z
lang: "fr"
node: "69198"
remoteId: "2631222cfa9df006ce40f13585c764bb"
published: 2011-07-05T20:42:36+02:00
---

[Auto Status version 0.2](http://projects.ez.no/autostatus/downloads/auto_status_0_2) est sortie ! [Auto Status](http://projects.ez.no/autostatus) est une extension [eZ Publish](/tag/ez-publish) capable de mettre à jour votre statut sur différents réseaux sociaux (Twitter and Identi.ca sont supportés pour le moment) de manière automatique ou semie-automatique.


## Quoi de neuf ?


[La version 0.1](/post/sortie-de-auto-status-0-1) était inutilisable depuis [la suppression de l'authentification Basic par Twitter](http://blog.twitter.com/2010/08/twitter-applications-and-oauth.html) (oui je sais cette mise à jour a plus de 10 mois...). Cette nouvelle version supporte l'authentification OAuth sur Twitter et Identi.ca.


Grâce à [Nicolas Pastorino](http://share.ez.no/community/profile/9804), l'évènement de workflow peut être configuré pour construire l'URL de l'objet pour un siteaccess donné.


En plus, l'extension apporte un nouvel onglet dans l'interface d'administration où il est possible de voir les mises à jour de statut effectuées par le workflow ainsi que le résultat de la mise à jour. Cet onglet permet également de relancer ou de réessayer une mise à jour ayant échouée.


Cette extension est maintenant disponible en 5 langues, je te tiens à remercier les traducteurs qui ont répondu à [mon appel à contribution](http://share.ez.no/blogs/damien-pobel/soon-to-be-release-autostatus-extension-needs-translators) :

* [Thiago Campos Viana](http://share.ez.no/community/profile/10894) pour la traduction brésilienne
* [Georg Franz](http://share.ez.no/community/profile/7805) pour la traduction allemande
* [Nicolas Panau](http://share.ez.no/community/profile/90180) pour la traduction française
* [Sandra Parente](http://share.ez.no/community/profile/7343) pour la traduction italienne

Si vous voulez traduire cette extension dans votre langue il n'est pas trop tard, vous pouvez toujours m'envoyer le fichier de traduction ou [devenir membre du projet](http://projects.ez.no/autostatus/team/members).


## Et après ?


Le fichier [TODO](http://websvn.projects.ez.no/wsvn/autostatus/trunk/extension/autostatus/TODO) contient pas mal d'améliorations possibles. Le support de Linkedin et de Facebook sont plus ou moins prévu, pour le reste (ou toute autre idée), les contributions sont les bienvenues :-) Je vais probablement migrer vers Github ce qui permettra d'avoir un bug tracker et de faciliter les contributions.

