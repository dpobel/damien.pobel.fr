---
title: "Mise à jour de pwet.fr et planet-ezpublish.fr vers eZ Publish 4.4"
tags: ez publish, blog, apache, svn
lang: "fr"
node: "68744"
remoteId: "ed5399cdded8fffc676b40774f88b763"
published: 2010-10-12T00:22:28+02:00
---

[pwet.fr](http://pwet.fr) et Planet eZ Publish fr sont maintenant propulsés par [eZ Publish](/tag/ez-publish) 4.4. Deux migrations eZ Publish 4.2 vers 4.4 en deux jours, c'est un bon rythme même si le plus long a finalement été de *commiter* dans mon SVN ! Seule petite subtilité dans la mise à jour, j'ai eu à modifier légérèment les *rewrite rules* Apache pour autoriser la distribution directe des fichiers dans les répertoires du type&nbsp;<code>extension/extname/design/designname/lib</code>
 :

``` apache
RewriteRule ^/extension/[^/]+/design/[^/]+/(lib|flash|stylesheets|images|javascripts?)/.* - [L]
```


Sans cette adaptation, la nouvelle interface pour afficher les sous-éléments d'un nœud restait vide car un des fichiers JavaScript nécessaire à l'affichage ne peut être chargé.


[Au niveau des nouvelles fonctionnalités](http://github.com/ezsystems/ezpublish-legacy/tree/master/doc/features/4.4/), le système de session bien plus léger par défaut (plus d'écriture/lecture en base de données, plus de session pour les utilisateurs anonymes par défaut) me ravit et améliore sans aucun doute les performances. La nouvelle interface pour afficher les sous-éléments est intéressante également même si il y a des choses à dire (j'y reviendrai probablement dans un prochain billet dédié).

