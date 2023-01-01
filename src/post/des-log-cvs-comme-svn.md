---
title: "Des logs CVS comme SVN"
tags: cvs, svn, shell, linux, travail
updated: 2008-10-29T08:27:46.000Z
lang: "fr"
node: "67112"
remoteId: "058cf03f2dce1cd131fbedfdbcc86b16"
published: 2008-09-12T12:10:49+02:00
---

Le choix d'un gestionnaire de source est souvent l'occasion de grandes réflexions ou de grands débats entre partisans des nombreuses solutions disponibles. Personnellement, je connais et j'apprécie Subversion surtout grâce [au client svn ligne de commande](http://pwet.fr/man/linux/commandes/svn) que je trouve plutôt bien fait et très pratique pour [mon usage quotidien professionnel](/page/cv) (de la maintenance habituellement). En revanche, avec [le client CVS](http://pwet.fr/man/linux/commandes//page/cvs) l'impossibilité d'obtenir la liste des derniers <code>commit</code>
 avec le message et la liste des fichiers modifiés est un vrai problème (qui est plutôt d'ordre conceptuel qu'autre chose d'ailleurs). J'ai découvert récemment [cvs2cl](http://pwet.fr/man/linux/commandes/cvs2cl) qui permet de générer plus ou moins ça avec bon nombre d'options et en passant des options au client /page/cvs avec une syntaxe assez pénible. J'ai donc écrit le petit script suivant pour simplifier les options pour pouvoir spécifier une date de début et/ou de fin :

``` bash
#! /bin/bash
# Génère une log des commit sur le modèle de "svn log"
# Nécessite cvs2cl, package du même nom sous Debian/Ubuntu

START=""
END=""
OPT='-g -Q --stdout -S --no-wrap --no-common-dir'
CMD=/usr/bin/cvs2cl
LOGARGS=""

print_usage()
{
    echo "$1 [-h] [-s YYYY-MM-DD] [-e YYYY-MM-DD]"
}

while getopts "hs:e:" opt ; do
    case $opt in
        s ) START=$OPTARG ;;
        e ) END=$OPTARG ;;
        h ) print_usage "$0"
            exit 0 ;;
        * ) print_usage "$0"
            exit 1 ;;
    esac
done

[ ! -z "$START" ] && [ ! -z "$END" ] &&  LOGARGS="${LOGARGS}-d$START<$END"
[ ! -z "$START" ] && [ -z "$END" ]   &&  LOGARGS="${LOGARGS}-d>$START"
[ -z "$START" ] && [ ! -z "$END" ]   &&  LOGARGS="${LOGARGS}-d<$END"

[ ! -z "$LOGARGS" ] && OPT="${OPT} -l $LOGARGS"

$CMD $OPT
```


Rien de bien méchant (juste une bête utilisation de [getopts](http://pwet.fr/man/linux/commandes/posix/getopts)), mais le script me réconcilie presque avec CVS :-) Dans la log générée, il manque juste l'opération qui a été effectuée sur le fichier et c'est un peu lent mais c'est toujours mieux que rien.

