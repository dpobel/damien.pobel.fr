---
title: "Mettre au premier plan une fenêtre avec un script"
tags: x11, openbox, bash, ubuntu, linux, debian, shell
lang: "fr"
node: "63781"
remoteId: "2a640f01b627729c4a34148771643cde"
published: 2006-12-07T14:25:35+01:00
updated: 2016-02-10 18:17
---
 
Les bureaux virtuels disponibles sur la plupart (tous&nbsp;?) des gestionnaires de
fenêtres modernes permettent d'organiser facilement ses différentes applications
par thème ou action. J'ai par exemple l'habitude de mettre tout ce qui
concerne le web sur le premier bureau
([Firefox](http://pwet.fr/man/linux/commandes/firefox) et
[Liferea](http://pwet.fr/man/linux/commandes/liferea) principalement), les
emails, l'irc sur le deuxième et les deux dderniers ne sont pas dédiés à une
tâche précise. Malgré cette organisation, il m'arrive fréquemment de lancer des
programmes en doubles simplement par oubli. Si pour certains cela ne pose pas de
problème particulier (Firefox ou
les [xterm](http://pwet.fr/man/linux/commandes/xterm) par exemple), pour
d'autres ça n'a pas vraiment de sens
([thunderbird](http://pwet.fr/man/linux/commandes/mozilla_thunderbird) ou
[irssi](http://pwet.fr/man/linux/commandes/irssi)) et pour certains autres ça
n'est tout simplement pas possible ou c'est même dangereux.
 
J'ai donc écrit le petit script ci-dessous qui peut remplacer avantageusement un
lanceur pour une application donnée. À l'origine je l'ai écrit car sous [Breezy
Badger](http://doc.ubuntu-fr.org/breezyr), Thunderbird
m'affichait le gestionnaire de profil si j'avais le malheur de le lancer deux
fois ce qui est assez agaçant à la longue, depuis il semble que ce bug soit
résolu.

 ``` bash
#! /bin/sh
# Script donnant le focus à un programme sous X en recherchant
# dans le titre le motif passé en paramètre,
# sinon lance la commande passée en second paramètre

if [ $# -lt 1 ] ; then
    echo "Usage : $0 motif [commande]"
    exit 1
fi
APP=`wmctrl -l | grep "$1" | head -1 `
# identifiant X du programme
CODE=`echo "$APP" | cut -d ' ' -f 1`
if [ "$CODE" != "" ] ; then
    wmctrl -i -a $CODE
    exit 0
fi
# lancement de la commande si spécifiée
if [ ! -z "$2" ] ; then
    exec $2 &
    exit 0
fi
exit 2
```

 
Pour fonctionner, ce script nécessite l'utilisation du programme
[wmctrl](http://pwet.fr/man/linux/commandes/wmctrl) qui s'installe avec le
paquet du même nom :

 ``` bash
sudo apt-get install wmctrl
```

L'utilisation est très simple, avec un argument, le script recherche une fenêtre
dont le titre comporte cet argument et la met au premier plan si il la trouve.
Si celle-ci se trouve sur un autre bureau, le script change automatiquement de
bureau. Si un deuxième argument est fourni et si le script ne trouve pas de
fenêtre, il essaie d'éxécuter cet argument comme une commande.

 
wmctrl permet de faire beaucoup d'autres choses dans la manipulation des
fenêtres sous X ([la page du manuel de
wmctrl](http://pwet.fr/man/linux/commandes/wmctrl) est très instructive) pourvu
que votre gestionnaire de fenêtre suive [les spécifications
EWMH](http://standards.freedesktop.org/wm-spec/wm-spec-1.3.html) ce qui est le
cas de beaucoup de gestionnaires de fenêtres. En tout cas testé et approuvé sous
[Openbox](http://pwet.fr/man/linux/commandes/openbox) !
