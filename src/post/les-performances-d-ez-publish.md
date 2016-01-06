---
title: "Les performances d'eZ Publish ?"
tags: ez publish, performances, php, mysql, cms, drupal
updated: 2009-03-23T20:49:00.000Z
lang: "fr"
node: "67684"
remoteId: "092aa8a168f767748ce2fcce8b3ce156"
published: 2009-03-21T15:22:08+01:00
---

*[Est ce que les problémes de performance ont bien été corrigé ?](/post/etude-du-planet-ez-publish-fr-3-3-performances-caches-et-compagnie#c67673)* voila le sujet d'un commentaire de abhunguru [sur un des billets](/post/etude-du-planet-ez-publish-fr-3-3-performances-caches-et-compagnie) consacrés au [Planet eZ Publish.fr](http://www.planet-ezpublish.fr/) ; commentaire qui fait référence à deux billets de [Pierre Jean Duvivier](http://www.media-business.biz) à propos de l'expérience [eZ Publish](/tag/ez+publish) chez Edipresse et du passage à Drupal pour résoudre plusieurs problèmes. Il y'a d'autres billets du même auteur sur le sujet dont [un ou j'avais laissé un commentaire](http://www.media-business.biz/content/ezpublish-vs-drupal-pourquoi-ezpublish-est-battu-par-ko#comment-1). Les questions de performances des applications web est un vaste sujet, je vais essayer de pas faire trop long.


Première chose, les informations fournies dans ces billets sont assez confuses voire inexactes (voir le paragraphe intitulé [*eZpublish ré-invente la compilation en PHP*](http://www.media-business.biz/content/ezpublish-lenfer-du-devoir) par exemple), je pense qu'il s'agit de la vision non technique de problèmes techniques, en fait ce qui ressort avant tout, c'est la frustration de l'auteur. Ensuite, [la comparaison brute](http://www.media-business.biz/content/ezpublish-et-drupal-chez-edipresse-18-mois-apr%C3%A8squel-est-le-bilan) des chiffres Drupal / eZ Publish est complètement biaisée. Comparer des installations eZ Publish 3.8 utilisant PHP4 avec des installations de Drupal utilisant probablement PHP5, ce n'est pas très sérieux ! [eZ Publish 4.0 (avec PHP5) est 2 fois plus rapide qu'eZ Publish 3.10](/post/benchmark-between-ez-publish-4-and-ez-publish-3-10-with-or-without-a-php-opcode-cache), alors par rapport à eZ Publish 3.8... Je connais mal Drupal, donc je ne parlerai donc que d'eZ Publish.


Bref, en essayant de démêler tout ça, l'auteur dénonce finalement deux problèmes :

* Une architecture technique complexe en raison des mauvaises performances supposées du CMS
* Des difficultés de développement et d'évolution du/des sites.


## Architecture, performances...


Avec une estimation à la louche, 500 000 pages vues par jour correspond à moins de 30 pages / secondes en pointe, un nombre certes respectable mais qui ne donne jamais que 8 pages / secondes sur chacun des 4 frontaux qui étaient d'après les articles des bi-Xeon quadcore ! Par expérience, la plupart du temps la cause de ce genre de problèmes est souvent une ou des énormités de configuration au niveau système ou au niveau applicatif. D'ailleurs dans ce cas, je me pose la question de la pertinence d'héberger plusieurs sites sur la même grosse plateforme plutôt que de séparer chaque site sur sa propre plateforme plus légère ?


Mais tout n'est pas 100% blanc ou 100% noir ; la version 3.8 d'eZ Publish était la première à implémenter le mode cluster tel qu'on le connait actuellement (tout ce qui est relatif aux contenus est dans une base de données) et il est clair que ce mode souffrait de défauts de jeunesse importants. Ce mode a été grandement amélioré au fil des versions, en version 3.10 et 4.0, il me semble que ça fonctionne bien et la version 4.1 apporte encore [des améliorations importantes avec notamment le Stale cache](http://blog.ankh-morpork.net/2009/03/18/ez-publish-41-stalecache/), [Charles-Christian Croix en parle également](http://www.karlesnine.com/post/2009/03/10/eZPublish-OJD). Il y a aussi [un excellent fil de discussion sur le mode cluster d'eZ Publish](http://ez.no/developer/forum/developer/cluster_performance) et comme suggéré par [Bertrand](http://blog.ankh-morpork.net/) dans ce fil, un article référence sur les architectures de ce type serait le bienvenu ! Donc pour revenir à la question initiale, au niveau des performances, il est clair que la version actuelle d'eZ Publish fonctionne mieux (le contraire serait malheureux).


## Le développement


Le second point soulevé par l'auteur est la difficulté de développement et de maintenance (et [la maintenance je connais](/page/cv-fr) !). Là encore tout n'est pas blanc ou noir. eZ Publish est un outil assez complexe, c'est un fait mais ce n'est pas insurmontable ! Il semble qu'il y ait eu un mélange entre mauvaises pratiques et réels problèmes techniques. Exemple, le fait de mettre des identifiants dans les fichiers de configuration est une pratique à utiliser avec parcimonie. La *sur-utilisation* de ce genre de mécanisme est clairement [une très mauvaise pratique et souvent révélatrice d'une mauvaise conception des contenus](http://www.unelectronlibre.info/journal/post/2009/02/09/Entretenir-des-sites-sous-eZ-Publish). En revanche, le problème de mise à jour d'une classe avec beaucoup d'instances est clairement un vrai problème, [ce point a été amélioré](http://issues.ez.no/14133) mais [il existe encore mais il est néanmoins contournable](http://issues.ez.no/10203). Et puis les problèmes de performances exposés juste au dessus ne sont probablement pas étranger à d'autres mauvaises pratiques ou d'autres manques dans le développement ou la conception.


Et pour finir quand je lis que d'*excellents développeurs PHP* ont du mal à utiliser le langage de template d'eZ Publish, on frise le ridicule.


## Conclusion ?


Il y a probablement une partie de réels problèmes dans les points remontés dans les articles de Pierre Jean Duvivier (eZ Publish n'est pas parfait) mais il est toujours plus facile de démonter une solution dans son ensemble que de se remettre en cause... Le fait est qu'eZ Publish est utilisé sur [une large palette de sites à plus ou moins fort trafic](http://ez.no/customers/references) et les chiffres indiqués ne sont pas non plus exceptionnels !


Et pour revenir au commentaire initial, oui les problèmes imputables à eZ Publish sont réglés petit à petit mais il ne faut pas oublier que la qualité de la mise en oeuvre de l'outil est largement aussi importante que l'outil lui-même !

