---
title: "Un script shell pour trouver les dossiers volumineux"
tags: geek, truc, bash, ubuntu, linux, shell
updated: 2007-02-08T22:31:12.000Z
lang: "fr"
node: "63953"
remoteId: "c6d8d294c93f263522e18e689bf1f3f8"
published: 2007-01-07T15:51:49+01:00
---
 
Dernièrement, j'arrivais à court de place sur ma partition /home il me semblait pourtant que je n'avais pas grand chose de volumineux et comme trouver ce qui occupe beaucoup d'espace est long et fastidieux, j'ai écrit un petit script pour se faciliter la tâche. Ce script liste les dossiers contenus dans un répertoire donné à un niveau donné faisant plus de 1,10,100,1000…unité. Voici donc wimfs.sh (Where is my free space :) :

 ``` bash
#! /bin/sh
# Trouve les dossiers les plus volumineux
# à un niveau donné en indiquant la longueur de la taille minimale
# par exemple 3 pour avoir tout ce qui est gros que 100 UNITE

# Valeurs par défaut
LEVEL=1    # -l
DIR=`pwd`  # -d
SIZEU="m"  # -u
MIN_SIZE=2 # -s

# affiche une chaine et termine le script
function print_exit
{
    echo "$1"
    exit $2
}

# affiche l'aide
function print_usage
{
    echo "$1 [-l NIVEAU] [-d DOSSIER] [-u UNITE] [-s TAILLE_MINIMALE]"
    echo "  NIVEAU : entier indiquant le nombre de niveau de l'arborescence à descendre, défaut: 1"
    echo "  DOSSIER : dossier racine, défaut répertoire courant"
    echo "  UNITE : m pour Mo, k pour Ko, b pour octet, défaut m"
    echo "  TAILLE_MINIMALE : longueur minimale de la taille, par défaut 2, pour afficher ce qui fait plus de 10 UNITE"
}

# options
while getopts "hl:d:u:s:" opt ; do
    case $opt in
        u ) SIZEU=$OPTARG ;;
        l ) LEVEL=$OPTARG ;;
        s ) MIN_SIZE=$OPTARG;;
        d ) DIR=$OPTARG;;
        h ) print_usage $0
            exit 0 ;;
        * ) echo "Mauvais paramètre $opt"
            print_usage "$0"
            exit 1 ;;
    esac
done

# Vérifications
[ ! -d "$DIR" ] && print_exit "Le dossier $DIR n'existe pas" 1
[ "$SIZEU" != "b" ] && [ "$SIZEU" != "k" ] && [ "$SIZEU" != "m" ] && print_exit "L'unité ne peut être que b, k, u" 2
[ -z $(echo $LEVEL | egrep '^[0-9]+$') ] && print_exit "Le niveau doit être un entier" 3
[ -z $(echo $MIN_SIZE | egrep '^[0-9]+$') ] && print_exit "La taille minimale doit être un entier" 4

# le script… :)
find $DIR -maxdepth $LEVEL -mindepth $LEVEL -type d -print0 | xargs -0 du -s$SIZEU 2> /dev/null | egrep "^[0-9]{$MIN_SIZE,}" | sort -n
```

 
Ce script s'utilise assez simplement en indiquant un ou plusieurs paramètres (ils sont tous facultatifs). Il prend aussi en compte les dossiers cachés (ie commençant par un .). Exemples :

 ``` bash
wimfs.sh -d ~ -l 1 -u m -s 3
# permet de trouver les dossiers faisant plus 100Mo dans le répertoire personnel de l'utilisateur
wimfs.sh -d ~ -l 3 -u k -s 2
# permet de trouver les dossiers faisant plus 10ko au niveau 3 à partir du répertoire utilisateur
```

 
Ce script illustre l'utilisation de getopts pour analyser la ligne de commande, ainsi qu'une partie des possibilités de find. Le truc amusant c'est que finalement, le script proprement dit tient en une ligne, le reste est surtout du confort pour la vérification des options avec test.

 
*Edit : correction d'erreurs dans la vérification des entiers, merci byzmut.*

