---
title: "Optimisation des images générées par eZ Publish"
tags: ez publish, google, performances, photo, yahoo, php
updated: 2009-06-13T23:50:40.000Z
lang: "fr"
node: "67829"
remoteId: "51ceaf32c66cf0a061d55fb2938b5b46"
published: 2009-06-14T01:47:21+02:00
---

[Google Page Speed](http://code.google.com/speed/page-speed/) ([la presque copie conforme de YSlow](http://performance.survol.fr/2009/06/google-page-speed/)) est sorti il y a quelques jours. Ces deux outils permettent de vérifier [différents critères ayant un impact sur le temps de chargement ressenti par l'utilisateur](/post/livre-high-performances-web-sites). En utilisant Google Page Speed sur ma dernière création, [Bioutifoul Photos](http://www.bioutifoul-photos.net), j'ai remarqué que les miniatures des photos générées par [eZ Publish](/tag/ez-publish) *via* [ImageMagick](http://pwet.fr/man/linux/commandes/imagemagick) n'étaient pas optimisées, en effet elles contiennent toutes [les informations <abbr title="Exchangeable image file format">EXIF</abbr>  de l'image](http://fr.wikipedia.org/wiki/EXIF) originale ce qui est rarement utile (*a priori* GD ne sait pas conserver les informations EXIF donc le problème ne se pose pas).


Pour remédier à cela, il est possible de configurer un filtre spécifique (par exemple nommé <code>optimize</code>
) qui va rajouter l'option <code>-strip</code>
 à <code>[convert](http://pwet.fr/man/linux/commandes/convert)</code>
 lors de [la création des
variations](http://ez.no/download/ez_publish/changelogs/ez_publish_3_3/new_image_system)
pour supprimer un maximum de choses dans l'image puis à rajouter ce filtre dans
les filtres utilisés pour créer une variation donnée. Cette opération est
faisable en écrivant les lignes suivantes dans
<code>settings/override/image.ini.append.php</code>&nbsp;:

``` ini
[ImageMagick]
IsEnabled=true
ExecutablePath=/usr/bin
Executable=convert

Filters[]=optimize=-strip

[mini]
Filters[]
Filters[]=geometry/scalewidthdownonly=200
Filters[]=optimize

```


Dans cet exemple, seules les images générées en format <code>mini</code>
 seront optimisées. Une autre solution plus globale consiste à ajouter l'option <code>-strip</code>
 pour toutes les variations en utilisant le paramètre <code>PreParameters</code>
 dans le même fichier de configuration.


Dans les deux cas, pour que les images existantes soient régénérées, il faut lancer la commande suivante :

``` bash
$ php bin/php/ezcache.php --clear-tag=image

```


Attention, sur un site avec beaucoup d'images et un peu d'audience, la régénération des variations peut être extrêmement gourmande en ressources.

