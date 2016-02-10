---
title: "En attendant eZ Publish 4.0.1 (ou 4.1)"
tags: ez publish, php, truc, bug, shell, patch, dedibox
lang: "fr"
node: "66971"
remoteId: "30111511d0fa63ef86e11fb1a850b20e"
published: 2008-08-06T22:46:00+02:00
updated: 2016-02-10 21:53
---

[eZ Publish 4.0 est sorti en décembre 2007](/post/ez-publish-4) et depuis rien,
aucune version stable. 8 mois c'est vraiment très très très long, il y a donc
forcément des bugs gênants dans [eZ Publish](/tag/ez-publish) 4.0 d'autant plus
que cette version est un portage vers PHP5 de la version 3.10 ce qui occasionne
encore quelques bugs supplémentaires. La roadmap du
bugtracker liste les
problèmes résolus et non résolus mais il n'est pas toujours simple de faire le
lien entre un comportement suspect et un bug dans cette liste.

Par exemple en développant la nouvelle version de ce site, je me suis trouvé
face à plusieurs problèmes qui ont nécessité l'inclusion de patchs issus du
SVN.

## Les cache-block qui n'expirent pas


Il s'agit du [bug #12175](http://issues.ez.no/12175) qui empêche l'utilisation [des cache-block expirant avec une sous-arborescence](http://ez.no/doc/ez_publish/technical_manual/4_0/reference/template_functions/miscellaneous/cache_block). Pour règler ce problème sans passer à la version 4.0.1rc1 il faut appliquer [3 patchs](/files/patch_cache_block_12175.tar.gz) successifs sur l'arborescence d'eZ Publish 4.

``` bash
$ cd /tmp
$ wget http://pwet.fr//files/patch_cache_block_12175.tar.gz
$ tar -zxvf patch_cache_block_12175.tar.gz
$ cd /path/to/ez/publish/
$ patch -p0 < /tmp/01_cache-block.patch
$ patch -p0 < /tmp/02_cache-block.patch
$ patch -p0 < /tmp/03_cache-block.patch

```

Les erreurs sur l'application du [patch](http://pwet.fr/man/linux/commandes/posix/patch) sur le change log peuvent être tranquillement ignorées.

## Les variations des images re-dimensionnées en permanence

Celui la, c'est [un bug vicieux](http://issues.ez.no/12386), on s'en rend compte lors de la mise en production quand la machine est à plat par tous les [convert](http://pwet.fr/man/linux/commandes/convert) (ou apache si on utilise GD) en train de générer [les différentes variations](http://ez.no/doc/ez_publish/technical_manual/4_0/reference/datatypes/image) encore et encore. 80 de [load average](/post/load-average-ou-charge-d-une-machine-unix-linux) sur ma pauvre Dedibox, elle a du avoir chaud ;-)

Là [un seul patch](/files/image_variations.patch) est nécessaire et c'est immédiat et magique sur la charge de la machine

``` bash
$ cd /tmp
$ wget http://pwet.fr//files/image_variations.patch
$ cd /path/to/ez/publish
$ patch -p0 < /tmp/image_variations.patch
```

J'ai pas eu d'autres bugs bloquants (enfin je les ai pas encore remarqué :)),
j'en ai d'ailleurs découvert un sur [le SmartCacheClear avec les
keywords](http://issues.ez.no/13449), la correction est dans [le
rapport](http://issues.ez.no/13449) et tient sur une unique ligne.
