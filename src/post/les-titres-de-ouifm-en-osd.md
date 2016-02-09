---
title: "Les titres de OuiFM en OSD"
tags: musique, openbox, bash, ubuntu, linux, php, debian, shell, ouïfm
lang: "fr"
node: "65454"
remoteId: "80a245475f8533256bbc56b01fc4d08d"
published: 2007-05-13T16:56:11+02:00
updated: 2016-02-09 08:30
---

J'aime beaucoup écouter [la radio parisienne OuiFM](http://www.ouifm.fr/). Pour
les provinciaux, il est possible de l'écouter directement sur le site *via* une
animation flash qui affiche le titre en cours ou avec son lecteur préféré
*via* le flux MP3 qui est
probablement capable d'en faire de même, mais il n'est pas très pratique devoir
remettre au premier plan le lecteur (et/ou de changer de bureau virtuel). Je
trouve aussi pénible que le lecteur affiche systématiquement le titre comme le
font certains, je préfère avoir le titre *à la demande*. J'ai donc écrit un
petit script shell qui va récupèrer le titre sur le site de OuiFM comme le fait
l'animation flash et l'affiche en <abbr title="On Screen Display">OSD</abbr> .
Pour l'utiliser sous Ubuntu (et probablement Debian), il faut installer le
paquet xosd-bin et php (4 ou 5) en mode ligne de commande avec la commande
suivante :

``` bash
$ sudo apt-get install xosd-bin php5-cli
```


Le paquet xosd-bin fournit le programme
[osd_cat](http://pwet.fr/man/linux/commandes/osd_cat) qui permet de lire un
fichier à la manière de [cat](http://pwet.fr/man/linux/commandes/cat) en
affichant le résultat en OSD selon différents paramètres (couleur, police,
position, ...). J'ai associé l'exécution de ce script à la touche F9 dans
[Openbox](http://pwet.fr/man/linux/commandes/openbox), ainsi si un titre passe
et je ne connais pas l'artiste, je peux connaître rapidement le titre en
pressant cette touche.

``` bash
#! /bin/sh

URL_DATA="http://www.ouirock.com/data1.php"

TMP_FILE="/tmp/ouifm_data"$$".txt"
DATA_OSD=""

OSD_FONT='-bitstream-dejavu sans-bold-r-*-*-17-*-*-*-*-*-*-*'
OSD_VER_POS="bottom"
OSD_HOR_POS="right"
OSD_COLOR="#95b9c8"
OSD_DELAY=30
OSD_LINE_FROM_BOTTOM=2

get_infos ()
{
    DATA_SHELL=`wget "$1" -q -O - | sed 's/&/ /g'`
    eval $DATA_SHELL
    DATA_OSD=`echo '<?php echo utf8_decode(urldecode("'$artiste' - '$titre'"))."\n"; ?>' | php`
}

display_infos ()
{
    get_infos $URL_DATA
    echo "$DATA_OSD" > $TMP_FILE
    osd_cat -l $OSD_LINE_FROM_BOTTOM  -f "$OSD_FONT" -p "$OSD_VER_POS" -A "$OSD_HOR_POS" -c "$OSD_COLOR" -d "$OSD_DELAY" $TMP_FILE
}

touch $TMP_FILE
display_infos $URL_DATA
rm -f $TMP_FILE
```


Le seul point particulier concerne la fonction get_infos qui récupère les données sur le site de OuiFM puis crée les variables avec *eval* et les décode avec un tout petit morceau de PHP passé directement à l'interprèteur.


*Billet rédigé en écoutant entre autres &quot;Hey Gravity - Risen (She Said)&quot;, &quot;Rinocerose - Cubicle&quot;, &quot;Green Day - Basket Case&quot;, ... :-)*

