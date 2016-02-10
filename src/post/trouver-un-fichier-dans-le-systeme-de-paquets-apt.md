---
title: "Trouver un fichier dans le système de paquets APT"
tags: apt, truc, ubuntu, debian, shell
lang: "fr"
node: "61565"
remoteId: "f5cb2638f5edd8a7831dcc81b423f6c8"
published: 2006-09-20T22:57:04+02:00
updated: 2016-02-10 18:05
---
 
[apt-file](http://pwet.fr/man/linux/commandes/apt-file) est une
[commande](http://pwet.fr/man/linux/commandes) assez méconnue du système
[APT](http://pwet.fr/man/linux/administration_systeme/apt) (Advanced Package
Tool), [le système de paquet de
Debian](http://www.debian.org/doc/manuals/apt-howto/index.fr.html) et de [ses
dérivés dont Ubuntu](http://doc.ubuntu-fr.org/apt), Cette commande permet de
rechercher un fichier ou des fichiers dans tous les paquets disponibles (ie pas
seulement les paquets installés). Cette commande s'installe comme suit :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ sudo apt-get install apt-file
```
 
Une fois cette commande installée, il faut mettre à jour la base de données des
fichiers disponibles ce qui s'effectue à l'aide de la fonction **update** comme
pour [apt-get](http://pwet.fr/man/linux/administration_systeme/apt_get). Il est
possible ensuite de rechercher n'importe quel fichier, [sur l'exemple de ce
topic sur le forum Ubuntu-fr](http://forum.ubuntu-fr.org/viewtopic.php?id=63551)
:

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ sudo apt-file update
# .... affichage des informations ...
> tigrou@Lorien[192.168.0.243]:~$ apt-file search bin/ps2
c2050: usr/bin/ps2lexmark
gs-common: usr/bin/ps2ascii
gs-common: usr/bin/ps2epsi
gs-common: usr/bin/ps2pdf
gs-common: usr/bin/ps2pdf12
gs-common: usr/bin/ps2pdf13
gs-common: usr/bin/ps2pdf14
gs-common: usr/bin/ps2pdfwr
gs-common: usr/bin/ps2ps
hylafax-server: var/spool/hylafax/bin/ps2fax.gs
hyperlatex: usr/bin/ps2image
ps2eps: usr/bin/ps2eps
tetex-bin: usr/bin/ps2frag
tetex-bin: usr/bin/ps2pk
tth: usr/bin/ps2gif
tth: usr/bin/ps2png
```

Il est également possible d'utiliser en paramètre [une expression
rationnelle](http://pwet.fr/man/linux/conventions/regex) en ajoutant l'option
**--regex**, par exemple pour lister l'ensemble des binaires disponible
commençant par apt mais n'étant ni apt-get, ni
[apt-cache](http://pwet.fr/man/linux/administration_systeme/apt_cache), ni
apt-file, on peut faire :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ apt-file --regex search 'bin/apt-[^(get|cache|file)]'
apt: usr/bin/apt-key
apt-build: usr/bin/apt-build
apt-move: usr/bin/apt-move
apt-proxy: usr/sbin/apt-proxy
apt-proxy: usr/sbin/apt-proxy-import
apt-proxy: usr/sbin/apt-proxy-v1tov2
apt-rdepends: usr/bin/apt-rdepends
apt-show-source: usr/bin/apt-show-source
apt-show-versions: usr/bin/apt-show-versions
apt-spy: usr/bin/apt-spy
apt-src: usr/bin/apt-src
apt-utils: usr/bin/apt-sortpkgs
apt-zip: usr/sbin/apt-zip-inst
apt-zip: usr/sbin/apt-zip-list
```

