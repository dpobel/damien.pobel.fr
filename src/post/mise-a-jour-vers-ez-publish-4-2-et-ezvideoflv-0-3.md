---
title: "Mise à jour vers eZ Publish 4.2 et eZVideoFLV 0.3"
tags: ez publish, blog, ezvideoflv, php, vidéo
lang: "fr"
node: "67996"
remoteId: "c30c805ed25091ff55703c8fb38d13bc"
published: 2009-10-04T22:33:55+02:00
updated: 2016-02-09 08:21
---

J'ai finalement pris mon courage à deux mains et j'ai migré [pwet.fr](/) de la
version 4.0.1 à la version 4.2.0 d'[eZ Publish](/tag/ez-publish) sortie il y a
[quelques jours avec plein
d'améliorations](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/changelogs/4.2/CHANGELOG-4.1.0-to-4.2.0). Au
niveau de la migration d'eZ Publish, rien de bien compliqué surtout que pour une
fois, [la documentation de mise à
jour](http://ez.no/doc/ez_publish/upgrading/upgrading_to_4_2/upgrading_from_4_1_x_to_4_2_y)
sort en même temps que le produit.


Mon principal soucis était au niveau de mon [extension
ezvideoflv](http://projects.ez.no/ezvideoflv) incompatible avec la version 4.2
(et 4.1) en raison [des modifications apportées dans la version 4.1 au niveau
des *binary file
handlers*](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/changelogs/4.1/CHANGELOG-4.0.0-to-4.1.0).
J'ai donc sorti [la version 0.3 de
eZVideoFLV](http://projects.ez.no/ezvideoflv/downloads/ezvideoflv_datatype_0_3)
compatible avec eZ Publish 4.1 et supérieur. Au passage, merci encore à
Sébastien Morel pour son aide.
