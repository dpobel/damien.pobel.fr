---
title: "Convertir les fichiers d'un GPS en KML lisible sur Google Map et Google Earth"
tags: xml, formats, montpellier, vtt, philovelo, ubuntu, linux
updated: 2011-04-02T19:06:00.000Z
lang: "fr"
node: "66296"
remoteId: "baae9eabe0a60ed905a488bdc6cb3b41"
published: 2007-09-25T00:03:18+02:00
---

Un tout petit billet rapide en guise de pense bête pour ceux (comme moi) qui
voudraient convertir des fichiers issus d'un GPS (par exemple au format GDB,
Garmin MapSource) en [KML](http://fr.wikipedia.org/wiki/KML) (Keyhole Markup
Langage) pour pouvoir visualiser une trace sur [Google
Maps](http://maps.google.fr/) (ou [Google Earth](http://earth.google.fr)). J'ai
d'abord utilisé [GPSVisualizer en
ligne](http://www.gpsvisualizer.com/gpsbabel/?lang=en) (attention [la version
française](http://www.gpsvisualizer.com/gpsbabel/?lang=fr) ne propose pas la
conversion en KML) avant de comprendre que ce site utilisait en fait le logiciel
[gpsbabel](http://www.gpsbabel.org/) disponible sous Ubuntu [dans les dépôts
Universe](http://doc.ubuntu-fr.org/depots#universe_et_multiverse). Une fois ces
dépôts configurés, pour l'installer vous pouvez utiliser
[synaptic](http://pwet.fr/man/linux/administration_systeme/synaptic) ou taper la
ligne suivante :

``` bash
$ sudo apt-get install gpsbabel
```


Ensuite pour convertir les fichiers GDB de l'association de VTT Philovelo, j'ai utilisé la ligne de commande suivante :

``` bash
gpsbabel -i gdb -f gdb/50km\ -\ Teyran.gdb -o kml,points=0,line_width=4,line_color=ff000099,units=m -F kml/50km_-_Teyran.kml
```


Et hop voila le tracé de la dernière balade au nord de Montpellier [directement
visible sur Google
Maps](https://www.google.com/maps/d/viewer?mid=zq7SCh0XZYfY.k_gT1FYYWvY0)
efficace et facilement automatisable, du coup j'ai converti [l'ensemble des
traces](http://philovelo.free.fr/forum/read.php?6,623) ! J'ai pas mal cherché
avant de comprendre comment appliquer [les différentes options spécifiques au
format KML](http://www.gpsbabel.org/htmldoc-1.3.2/fmt_kml.html) alors qu'il
suffit de les ajouter après le format de sortie séparées par une virgule.


En plus, les fichiers KML sont en fait de simples fichiers XML assez faciles à
lire, voila qui donne plein d'idées d'exploitation mais c'est une autre
histoire…
