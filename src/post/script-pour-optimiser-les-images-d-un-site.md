---
title: "Script pour optimiser les images d'un site"
tags: performances, shell, linux, web, online editor, ez publish
lang: "fr"
node: "67159"
remoteId: "2a9805115bb7c4282da6446b9d63722f"
published: 2008-10-15T22:02:38+02:00
updated: 2016-02-08 18:16
---

L'optimisation des images est une manière simple et peu coûteuse [d'améliorer
les performances d'affichage d'un site](/post/livre-high-performances-web-sites)
au premier chargement (avec le cache navigateur vide) sans trop de problèmes.
Smush it! (service hébergé qui semble mort maintenant) a remis ce sujet à la
mode et permet de voir facilement les images à optimiser pour une page donnée.
Le problème est qu'avec ce service, on peut récupérer une archive zip avec les
images optimisées mais en perdant l'arborescence des images ce qui peut être un
peu fastidieux, il est aussi fastidieux d'utiliser l'extension Firefox sur
toutes les pages d'une application web pour passer en revue toutes les images et
si en plus les images ne sont pas publiquement accessibles son utilisation ne
sera tout simplement pas possible.


Pour pallier à cela, j'ai écrit le script shell suivant pour l'optimisation des
fichiers GIF et PNG qui :

* optimise tous les fichiers PNG avec
  [pngcrush](http://pwet.fr/man/linux/commandes/pngcrush)
* identifie les PNG 24 bits avec
  [identify](http://pwet.fr/man/linux/commandes/identify) (qu'il est peut être
  possible de transformer en PNG 8 bits mais cela nécessite une vérification
  visuelle)
* convertit les fichiers GIF en PNG 8 bits avec
  [convert](http://pwet.fr/man/linux/commandes/convert) si le fichier résultant
  est plus petit.


Il s'agit juste d'automatiser ces opérations. Selon les applications, le gain
peut être sensible. La semaine dernière quand j'étais en
déplacement avec
une connectivité aléatoire j'aurai bien aimé que tous les sites aient fait cette
opération…
Je l'ai d'ailleurs lancé sur [le nouvel Online
Editor](/post/the-new-online-editor-for-ez-publish-beta) de [eZ
Publish](/tag/ez-publish) pour optimiser au maximum le futur éditeur <abbr
title="What You See Is What You Get">WYSIWYG</abbr>  de ce <abbr title="Content
Management System">CMS</abbr>.

``` bash
#! /bin/bash
# Give hints and optimize images
#
# Try to convert GIF in PNG if the resulted PNG is smaller
# Optimize PNG with pngcrush
# Display PNG24
#
# Need imagemagick and pngcrush

print_usage()
{
    echo "$1 [-w] [-d] -f dossier"
    echo "-w : optimise et modifie les fichiers"
    echo "-d : supprime les fichiers GIF transformés en PNG"
    echo "-f dossier : dossier où chercher des images"
}

# Display size in bytes
size()
{
    du -sb "$1" | sed "s/\t.*//g"
}

TMP=/tmp/optimize_img
DEBUG=1
DELETE_GIF=0
DIRECTORY=""

while getopts "dwf:" opt ; do
    case $opt in
        w ) DEBUG=0 ;;
        d ) DELETE_GIF=1 ;;
        f ) DIRECTORY=$OPTARG ;;
        h ) print_usage "$0"
            exit 0 ;;
        * ) print_usage "$0"
            exit 1 ;;
    esac
done

[ -z "$DIRECTORY" ] && print_usage "$0" && exit 1
[ ! -d "$DIRECTORY" ] && echo "$DIRECTORY n'existe pas" && exit 2
IMAGES_COUNT=`find "$DIRECTORY" -name \*.gif -o -name \*.png | wc -l`
[ $IMAGES_COUNT -eq 0 ] && echo "Aucune image à traiter" && exit 0
[ ! -d $TMP ] && mkdir $TMP

IFS=$'\n'

echo "### Optimisation des PNG :"
PNG_LIST=`find "$DIRECTORY" -iname \*.png`
for p in $PNG_LIST ; do
    PNG=`basename $p`
    pngcrush -rem alla -reduce -brute "$p" "$TMP/$PNG" > /dev/null
    ORI_SIZE=`size "$p"`
    OPT_SIZE=`size "$TMP/$PNG"`
    if [ $OPT_SIZE -lt $ORI_SIZE ] ; then
        echo ">> $p pngcrush optimise ce fichier (${OPT_SIZE}o < ${ORI_SIZE}o)"
        [ $DEBUG -eq 0 ] && cp "$TMP/$PNG" "$p"
    fi
    rm -f "$TMP/$PNG"
done

echo ""
echo "### PNG24 :"
for p in $PNG_LIST ; do
    TYPE=`identify -verbose "$p" | grep 'Type: TrueColor'`
    [ ! -z "$TYPE" ] && echo "$p"
done

echo ""
echo "### Optimisation des GIF en PNG :"
GIF_LIST=`find "$DIRECTORY" -iname \*.gif`
for g in $GIF_LIST ; do
    GIF=`basename $g`
    PNG=`echo $GIF | sed 's/.gif$/_not_opt.png/'`
    PNG_OPT=`echo $GIF | sed 's/.gif$/.png/'`
    convert "$g" "$TMP/$PNG"
    pngcrush -rem alla -reduce -brute "$TMP/$PNG" "$TMP/$PNG_OPT" > /dev/null
    if [ ! -f "$TMP/$PNG_OPT" ] ; then
        rm -f $TMP/*
        continue
    fi
    GIF_SIZE=`size "$g"`
    PNG_SIZE=`size "$TMP/$PNG_OPT"`
    if [ $PNG_SIZE -lt $GIF_SIZE ] ; then
        echo ">> $g : PNG plus petit (${PNG_SIZE}o < ${GIF_SIZE}o)"
        FINAL_PNG=`echo $g | sed 's/.gif$/.png/'`
        [ $DEBUG -eq 0 ] && cp "$TMP/$PNG_OPT" "$FINAL_PNG"
        [ $DELETE_GIF -eq 1 ] && rm "$g"
    fi
    rm -f "$TMP/$PNG" "$TMP/$PNG_OPT"
done

rm -rf "$TMP"

```

