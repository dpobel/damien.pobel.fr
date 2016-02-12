---
title: "Un (vieux) script shell pour écouter ses messages sur le répondeur de sa Freebox"
tags: geek, free, bash, linux, freebox, shell
lang: "fr"
node: "63834"
remoteId: "10244bd71c535ecd40dd7b9e97a2290d"
published: 2006-12-14T00:12:51+01:00
updated: 2016-02-12 13:33
---
 
En juin 2004, j'avais écrit un script shell qui se connectait au site de Free et
qui vérifiait la présence de message sur le répondeur de sa Freebox et qui
proposait de les écouter directement, le tout agrémentté de quelques messages en
synthèse vocal avec [festival](http://pwet.fr/man/linux/commandes/festival).
J'avais même publié [un journal sur
Linuxfr.org](http://linuxfr.org/~TiGr0u/13808.html) pour partager ce script.
Aujourd'hui, j'ai reçu un mail me demandant si j'avais toujours ce script
quelque part. J'ai fini par remettre la main sur [**freerep.sh version
0.1**](/files/freerep.sh) (avec l'aide *magique* de
[find](http://pwet.fr/man/linux/commandes/find) :).

 
**Attention**&nbsp;: ce script est complètement inopérant car le site de Free a beaucoup changé en plus de 2 ans.

 
Néanmoins, ce script peut constituer un exemple intéressant d'utilisation de
différentes commandes : [curl](http://pwet.fr/man/linux/commandes/curl),
[wget](http://pwet.fr/man/linux/commandes/wget),
[grep](http://pwet.fr/man/linux/commandes/grep),
[sed](http://pwet.fr/man/linux/commandes/sed),
[xargs](http://pwet.fr/man/linux/commandes/xargs),
[zenity](http://pwet.fr/man/linux/commandes/zenity)...
