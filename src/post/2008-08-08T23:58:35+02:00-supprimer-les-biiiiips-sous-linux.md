---
title: "Supprimer les biiiiips sous Linux"
tags:
    - openbox
    - shell
    - bash
    - linux
    - kde
    - x11
    - gnome
updated: 2008-08-09T19:36:16+02:00
lang: fr
node: 66977
remoteId: ac453e7e056d588ae83e205816d0c2aa
---

Si il y'a un truc insupportable sous [Linux](/tag/linux) c'est bien le biiiiip si on a le malheur de se tromper de touche. Le pire est probablement celui du mode console (hors X11) mais celui sous X est pas mal non plus. Heureusement comme d'habitude tout cela est configurable.


## Sous X11


En général avec un Desktop Manager (*environnement de bureau* ?) type KDE ou GNOME, il y a une petite case à cocher bien planquée quelque part. Sans environnement de bureau, une simple ligne de commande avec l'utilitaire [xset](http://pwet.fr/man/linux/commandes/x2/xset) suffit :

``` bash
$ xset b off

```


Dans mon cas avec [Openbox](/tag/openbox), je la met dans mon fichier .xsession qui lance ma session après le login dans GDM. Simple rapide et efficace :)


## En mode console


En mode console deux solutions. il est possible d'utiliser [setterm](http://pwet.fr/man/linux/commandes/setterm) avec la ligne suivante :

``` bash
$ setterm -blength 0

```


Cette ligne peut être insérée dans le .bashrc (si vous utiliser [bash](http://pwet.fr/man/linux/commandes/bash) comme shell évidemment). Il existe cependant une méthode beaucoup plus radicale qui consiste à empêcher le chargement du module pcspkr du noyau qui gère ce fameux bip. Pour cela il suffit de créer un fichier dans /etc/modprob.d, par exemple blacklist-bip avec la ligne suivante à lancer avec [sudo](http://pwet.fr/man/linux/administration_systeme/sudo) (ou en root) :

``` bash
$ sudo echo "blacklist pcspkr" > /etc/modprobe.d/backlist-bip

```


Et pour ne pas attendre le prochain démarrage une dernière ligne de commande avec [modprobe](http://pwet.fr/man/linux/administration_systeme/modprobe) est possible pour supprimer le module directement :

``` bash
$ sudo modprobe -r pcspkr

```


Maintenant, vos lignes de commande seront silencieuses à souhait, reposant et magique !

