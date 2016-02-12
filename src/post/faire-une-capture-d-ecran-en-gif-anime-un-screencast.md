---
title: "Faire une capture d'écran en GIF animé (un screencast)"
tags: gnome, x11, truc, ubuntu, blog, debian
lang: "fr"
node: "63855"
remoteId: "2d34b0225d06caaff01a4b4364546608"
published: 2006-12-16T00:56:35+01:00
updated: 2016-02-10 23:36
---
 
En écrivant [mon précédent billet sur le logiciel Apwal](/post/apwal), j'ai
vainement cherché un logiciel permettant de faire une capture d'écran
&quot;animée&quot; que ce soit en vidéo, en flash ou en GIF animé. J'avais bien
trouvé [Xvidcap](http://xvidcap.sourceforge.net/) mais il n'est pas dans [les
dépôts Ubuntu](http://doc.ubuntu-fr.org/depots) et [le paquet non-officiel pour
Debian](http://www.jarre-de-the.net/computing/debian/) ne fonctionne pas
correctement...
 
Je me suis donc rabbattu sur deux captures d'écran consécutives réalisées avec
[mon script de
capture](/post/mise-en-ligne-d-une-capture-d-ecran-plus-vite-que-son-ombre) basé
sur [import](http://pwet.fr/man/linux/commandes/import) (de la suite
[ImageMagick](http://pwet.fr/man/linux/commandes/imagemagick)) montées en GIF
animé avec [The GIMP](http://pwet.fr/man/linux/commandes/gimp_2_2)... Mais
depuis, au détour [d'un
commentaire](http://linuxfr.org/comments/784332,1.html)[d'un journal trollogène
sur LinuxFr](http://linuxfr.org/~gnumdk/23303.html), j'ai découvert que
plusieurs logiciels font cela et qu'ils portent tous le nom d'une ville turque :

* [istanbul](https://wiki.gnome.org/Projects/Istanbul) ([page du manuel de
istanbul](http://pwet.fr/man/linux/commandes/istanbul))
* [cankiri](http://www.tortall.net/mu/wiki/Cankiri)
* [byzanz](https://launchpad.net/~fossfreedom/+archive/ubuntu/byzanz) ([page du manuel de
byzanz-record](http://pwet.fr/man/linux/commandes/byzanz_record))
 
J'ai retenu byzanz car il produit des GIF animés ce qui est quand même le plus
pratique pour publier sur le web et en plus il est disponible dans les dépôts
Universe d'Ubuntu ce qui simplifie grandement son installation avec la ligne de
commande suivante (ou en cherchant dans synaptic ou équivalent) :

 ``` bash
$ sudo apt-get install byzanz
```

Une fois installé, ce logiciel se manipule soit via une applet dans un panneau
GNOME soit via la ligne de commande en lui passant quelques paramètres
détaillés dans sa courte page du manuel, comme je n'utilise pas GNOME, la ligne
de commande ressemble à la suivante&nbsp;:

 ``` bash
$ byzanz-record -l -d 15 -x 249 -y 196 -w 460 -h 300 -c --delay=2 edition_dans_ez_publish.gif
```

Cette ligne va enregistrer deux secondes après son lancement un GIF animé nommé
edition_dans_ez_publish.gif tournant en boucle de 460x300 pixels dont le point
d'origine est 249x196 d'une durée de 15 secondes en incluant le curseur X11, ce
qui donne l'animation suivante :

<figure class="object-center"><a href="/images/exemple-gif-anime-avec-byzanz.gif">![Exemple GIF animé avec byzanz](/images//exemple-gif-anime-avec-byzanz.gif)
</a></figure>

Comme c'est du GIF ça ne peut contenir que 256 couleurs mais c'est très léger
(64Ko pour 15 secondes dans cet exemple) et donc tout à fait publiable sur le
web ou envoyable par mail et peut permettre de facilement montrer une
fonctionnalité voire de rapporter un bug difficile à expliquer.
