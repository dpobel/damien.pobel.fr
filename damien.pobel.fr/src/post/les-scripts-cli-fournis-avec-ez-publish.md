---
title: "Les scripts CLI fournis avec eZ Publish"
tags: ez publish, truc, blog, php, shell
updated: 2007-03-30T21:23:59.000Z
lang: "fr"
node: "64654"
remoteId: "6db672149dd84077bed9557d5fa8c242"
published: 2007-02-25T14:04:41+01:00
---

eZ Publish est fourni avec un certain nombres de scripts à lancer en ligne de commandes. À ma connaissance, il n'y a aucune documentation sur ces outils pourtant très utiles et qui peuvent faciliter la vie du développeur que ce soit en phase de développement ou en maintenance. Tous ces scripts sont à lancer à partir de la racine du site eZ Publish. Pour connaitre les options disponibles de chacun de ces script, il suffit de les lancer avec l'option --help. Les scripts détaillés ici sont dans le répertoire bin/php sauf clearcache.sh et cleanup.php.

## Vider les caches : bin/shell/clearcache.sh


clearcache.sh est un script shell qui permet de vider les différents cache. Il est utile lorsque PHP4 version CLI n'est pas installé, puisqu'il utilise uniquement des commandes shell pour effectuer les différentes tâches. Pour la même raison, il est très rapide. Je l'utilise principalement lors du développement pour supprimer tous les caches d'un site en utilisant [un alias bash](/post/etre-a-l-aise-avec-bash-2) correspondant à :

 ``` bash
$ bin/shell/clearcache.sh --clear-all
$ bin/shell/clearcache.sh --clear-all --var-subdir=XXX
```


où XXX est le répertoire du cache pour le *siteaccess* visé, par exemple *plain*.

## Vider le cache de contenu d'un noeud ou d'une arborescence : ezcontentcache.php


ezcontentcache.php permet de vider le cache de contenu d'un noeud ou d'une sous arborescence. Il peut être utile par exemple, si dans un site vous n'avez pas configuré [les options SmartCacheClear permettant de vider les caches](/post/ez-publish-et-son-cache) des noeuds dépendants de ceux qui ont été mis à jour.


## Vider des caches de manière *fine* : ezcache.php


ezcache.php permet de vider certains caches assez finement en spécifiant uniquement un cache particulier pour un *siteaccess* donné. Par exemple, si vous ajouter [un Custom tag comme comme dans mon billet sur l'inclusion de vidéos](/post/inclure-une-video-de-dailymotion-youtube-ou-autre-dans-ez-publish), il est possible de vider uniquement le cache *template-override*. Pratique sur un site en production, surtout si le site est très visité et si le(s) serveur(s) sont un peu justes…


## Manipuler les données : ezsubtreeremove.php et ezsubtreecopy.php


Comme leur nom l'indique, ces scripts permettent de supprimer ou copier (donc déplacer…) des données dans l'arborescence. Ils sont utiles pour manipuler de gros volumes de données, là où l'interface web est limitée par le timeout PHP.


## Compiler les templates : eztc.php


La compilation des *templates* est probablement l'opération la plus gourmande lors de la regénération des caches après un vidage complet. Une utilisation typique de ce script est lors de la mise en production d'un site. On vide tous les caches, mais avant d'activer le site, on compile l'ensemble des *templates* pour éviter une trop forte montée en charge. Une autre utilisation est la mise à jour des templates, on force la compilation des templates et ensuite, il suffit de vider les caches de contenu pour avoir la nouvelle version sans avoir vider complètement les caches.


## Vérifier syntaxiquement les templates : eztemplatecheck.php


Utile lors du développement, celui-ci permet de vérifier simplement la syntaxe des templates sans avoir à parcourir l'ensemble du site avec les options de debug.


## Faire le ménage dans la base de données : flatten.php et update/common/scripts/cleanup.php


Ces scripts permettent de faire le ménage dans la base de données en supprimant les données temporaires ou plus utilisées. flatten.php permet de supprimer par exemple toutes les versions non publiées d'objet. À manipuler avec précautions donc. cleanup.php permet de supprimer des données inutilisées. Je l'utilise par exemple pour supprimer les données des sessions expirées qui encombrent la table ezsessions.


