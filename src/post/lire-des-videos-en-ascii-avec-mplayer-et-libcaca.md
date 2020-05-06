---
title: "Lire des vidéos en ASCII avec mplayer et libcaca"
tags: amusant, ubuntu, shell
updated: 2007-02-14T14:50:50.000Z
lang: "fr"
node: "61726"
remoteId: "a86c581c4b06349588ea533d9f4c2310"
published: 2006-10-12T00:51:12+02:00
photos:
    - images/video-en-ascii-couleur.png
---
 
En lisant [une question sur le forum Ubuntu-fr à propos de la possibilité de lire des vidéos avec mplayer sans interface graphique](http://forum.ubuntu-fr.org/viewtopic.php?pid=524197), je me suis souvenu qu'il était possible de lire des vidéos avec [mplayer](http://pwet.fr/man/linux/commandes/mplayer) en ASCII à l'aide aalib. et même en ASCII et en couleur à l'aide de la [libcaca](http://pwet.fr/man/linux/fonctions_bibliotheques/caca).

 
Oui c'est complètement, inutile donc c'est indispensable :) En tout cas c'est assez bluffant et marrant à voir, et ça marche plutôt bien avec les films d'animation. C'est très simple à utiliser, il suffit d'indiquer à mplayer le backend de sortie et c'est tout.

 ``` bash
$ mplayer -vo caca Le\ monde\ de\ Nemo.avi
```

 


<figure class="object-left"><a href="/images/video-en-ascii-couleur.png"><img loading="lazy" src="/images/330x/video-en-ascii-couleur.png" alt="Video en ASCII couleur">
</a></figure>




 
Encore une fois ça n'a strictement aucun intérêt à part le fait de montrer la remarquable flexibilité de mplayer en terme de *backend* de sortie et de voir les regards étonnés de vos collègues lors d'une démonstration et encore plus en se connectant à distance en [ssh](http://pwet.fr/man/linux/commandes/ssh).

 
En visitant [le site officiel de libcaca](http://libcaca.zoy.org/), on peut voir différents projets dans la même veine comme [TOIlet](http://libcaca.zoy.org/toilet.html) qui permet d'écrire en grosses lettres à base de symboles ou [cacatris](http://libcaca.zoy.org/cacatris.html) un nième clone de tetris mais basé sur libcaca permettant de jouer à tetris dans un simple terminal.

 
On notera l'humour très *pipi/caca* de [l'auteur français](http://sam.zoy.org/) dans le choix des noms de ses différentes réalisations mêlé à de belles citations, en particulier j'aime beaucoup la citation de [Théophile Gautier](http://fr.wikipedia.org/wiki/Théophile_Gautier) sur la page de libcaca :

> Il n’y a rien de vraiment beau que ce qui ne peut servir à rien ; tout ce qui
> est utile est laid ; car c’est l’expression de quelque besoin ; et ceux de
> l’homme sont ignobles et dégoûtants, comme sa pauvre et infirme nature. -
> L’endroit le plus utile d’une maison, ce sont les latrines.
