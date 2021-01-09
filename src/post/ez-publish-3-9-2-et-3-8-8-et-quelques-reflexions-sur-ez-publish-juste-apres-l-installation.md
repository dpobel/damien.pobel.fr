---
title: "eZ Publish 3.9.2 et 3.8.8 et quelques réflexions sur eZ Publish juste après l'installation"
tags: humeurs, ez publish, mysql, interface, blog
lang: "fr"
node: "65213"
remoteId: "7a6e2f49559db55d3aaa685bb22a43b9"
published: 2007-05-04T20:03:30+02:00
updated: 2016-02-09 09:46
---
 
Ces deux versions sont sorties aujourd'hui. Le ChangeLog de la version 3.8.8
(page indisponible…) indique uniquement des corrections de bugs (environ 70
tout de même !). Le ChangeLog de la version 3.9.2 (page indisponible…) indique
en plus des nombreuses corrections de bugs (presque 80&nbsp;!) plusieurs
fonctionnalités ou améliorations importantes, je remarque en particulier&nbsp;:

* Une meilleure compatibilité avec MySQL 5; * Des améliorations de l'extension
[d'import/export au format ODF](http://ez.no/doc/extensions/odf_import_export);
* La version 1.2 de l'interface de contribution directement sur le site, [la
fameuse *Website Interface*](http://ez.no/doc/extensions/website_interface).
 
Sur ce dernier point, il semble qu'il y ait eu pas mal de travail. Au détour
d'un sujet sur eZ Publish France (site mort depuis…) j'ai appris qu'eZ Systems
travaillait sur l'amélioration des *packages* par défaut en particulier sur
celui de weblog. Comme je l'écris dans ce fil de discussion, j'ai toujours
trouvé les *templates* par défaut un peu juste en terme de qualité que ce soit
graphique, fonctionnelle ou ergonomique. Ils ne reflètent pas du tout la qualité
du reste du logiciel et c'est forcément un peu dommage car la première
impression est plutôt négative. Depuis [la version
3.9.0](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/changelogs/3.9/CHANGELOG-3.8.0-to-3.9.0),
la *Website Interface* et ses *templates* par défaut rattrapent un peu le coup,
mais (jusqu'à cette version 3.9.2 ?) les packages Gallery ou Weblog sont tout de
même pas terribles après l'installation sans modification.
