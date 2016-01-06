---
title: "eZ Publish 3.9.2 et 3.8.8 et quelques réflexions sur eZ Publish juste après l'installation"
tags:
    - humeurs
    - ez publish
    - mysql
    - interface
    - blog
updated: 2007-07-13T09:49:34+02:00
lang: fr
node: 65213
remoteId: 7a6e2f49559db55d3aaa685bb22a43b9
---
 
[Ces deux versions sont sorties aujourd'hui](http://ez.no/community/news/ez_publish_3_9_2_3_8_8_released). [Le ChangeLog de la version 3.8.8](http://ez.no/download/ez_publish/changelogs/ez_publish_3_8/changelog_3_8_7_to_3_8_8) indique uniquement des corrections de bugs (environ 70 tout de même !). [Le ChangeLog de la version 3.9.2](http://ez.no/download/ez_publish/changelogs/ez_publish_3_9/changelog_3_9_1_to_3_9_2) indique en plus des nombreuses corrections de bugs (presque 80 !) plusieurs fonctionnalités ou améliorations importantes, je remarque en particulier :

 * Une meilleure compatibilité avec MySQL 5 ;
 * Des améliorations de l'extension [d'import/export au format ODF](http://ez.no/doc/extensions/odf_import_export) ;
 * La version 1.2 de l'interface de contribution directement sur le site, [la fameuse *Website Interface*](http://ez.no/doc/extensions/website_interface).
 
Sur ce dernier point, il semble qu'il y ait eu pas mal de travail. Au détour [d'un sujet sur eZ Publish France](http://www.ezpublish-france.com/index.php/fr/forums/questions_techniques/gestion_de_blogs#msg3114), j'ai appris qu'eZ Systems travaillait sur l'amélioration des *packages* par défaut en particulier sur celui de weblog. Comme je l'écris dans ce fil de discussion, j'ai toujours trouvé les *templates* par défaut un peu juste en terme de qualité que ce soit graphique, fonctionnelle ou ergonomique. Ils ne reflètent pas du tout la qualité du reste du logiciel et c'est forcément un peu dommage car la première impression est plutôt négative. Depuis [la version 3.9.0](http://ez.no/download/ez_publish/changelogs/ez_publish_3_9), la *Website Interface* et ses *templates* par défaut rattrapent un peu le coup, mais (jusqu'à cette version 3.9.2 ?) les packages Gallery ou Weblog sont tout de même pas terribles après l'installation sans modification.

