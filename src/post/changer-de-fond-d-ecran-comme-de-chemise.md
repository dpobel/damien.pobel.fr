---
title: "Changer de fond d'écran comme de chemise"
tags: photo, gnome, openbox, ubuntu, linux, shell
lang: "fr"
node: "64691"
remoteId: "c769d493cebf159088b1bf2073d40581"
published: 2007-03-02T20:37:06+01:00
updated: 2016-02-08 22:48
---
 
J'aime bien changer de fond d'écran régulièrement, seulement il n'est pas
toujours facile de trouver de jolies photos. Via le Planet Ubuntu
Users et [un billet sur Motho ke motho ka
botho](http://kmandla.wordpress.com/2007/02/26/using-wikipedias-picture-of-the-day-as-wallpaper/),
j'ai découvert qu'on pouvait télécharger automatiquement [l'image du jour de
Wikimedia Commons](http://commons.wikimedia.org/wiki/Commons:Picture_of_the_day)
et [des Wikipedias Anglais](http://en.wikipedia.org/wiki/Picture_of_the_day) et
Allemand dans la résolution souhaitée (ou au plus proche).

 
J'ai écrit le petit script suivant permettant de mettre en fond d'écran l'un de
ces clichés, rien de bien compliqué. Si aucun fond disponible ne vous convient,
il est possible de définir un fond par défaut sur le disque.

 ``` bash
#! /bin/sh
 # usage: dlbg.sh [default|commons|enwiki|dewiki-bdk] [scale|tile|center|seamless]

POTD="Documents/Wallpapers/potd-1280x1024.jpg"
# image par défaut
DEFAULT="Documents/Wallpapers/galaxie.png"
wiki="${1:-default}"
type="${2:-scale}"


if [ "$wiki" = "default" ] ; then
    feh --bg-$type "$DEFAULT" &
else
    [ -f "$POTD" ] && rm -f "$POTD"
    wget "http://tools.wikimedia.de/~daniel/potd/potd.php/$wiki/1280x1024" -O "$POTD"
    feh --bg-$type "$POTD" &
fi
```
 
Il utilise [feh](http://pwet.fr/man/linux/commandes/feh), un petit programme
permettant d'afficher et de mettre en fond une image. Il a un petite
fonctionnalité intéressante lorsqu'on utilise pas GNOME ou KDE : lorsqu'il met
une image en fond d'écran, il écrit la ligne de commande nécessaire dans le
fichier .fehbg. Ainsi, pour lancer un windows manager alternatif comme
[openbox](http://pwet.fr/man/linux/commandes/openbox) avec le même fond d'écran,
il suffit d'insèrer la ligne suivante dans le fichier
[.xsession](http://pwet.fr/man/linux/formats/xsession) servant à lancer sa
session :

 ``` bash
openbox & wmpid=$!
eval `cat $HOME/.fehbg` &
# éventuellement, divers autres trucs lancés au démarrage
wait $wmpid
```
 
Aujourd'hui en tapant **bin/dbbg.sh commons scale** ça donnait un drôle d'effet avec [cette chenille](http://fr.wikipedia.org/wiki/Image:Chenille_chevrefeuille.jpg) :-)

<figure class="object-center"><a href="/images/fond-d-ecran-chenille.png"><img loading="lazy" src="/images/660x/fond-d-ecran-chenille.png" alt="Fond d'écran chenille">
</a></figure>
