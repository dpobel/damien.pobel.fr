---
title: "Mise en ligne d'une capture d'écran plus vite que son ombre"
tags: free, x11, openbox, bash, ubuntu, linux, debian, shell
lang: "fr"
node: "61611"
remoteId: "5ed1be7cf5da93cab16d234711511c41"
published: 2006-09-25T00:37:38+02:00
updated: 2016-02-09 08:49
---
 
Dans la lignée du script de Racoon permettant de prendre une capture d'écran
optimisé pour ImageShack(tm) (site disparu…) j'ai écrit un script permettant
de prendre une capture d'écran et de l'envoyer sur un serveur FTP en une seule
manipulation. Ce script, associé à un raccourcis clavier ou à un lanceur bien
placé, permet :

* de faire une capture d'écran (de l'écran ou d'une fenêtre)
* de l'uploader sur un serveur FTP
* de copier l'adresse HTTP du fichier dans le presse papier de [X](http://pwet.fr/man/linux/commandes/x2/xorg) en une seule manipulation.
 
  
## Mise en place du script
 
Ce script utilise [ImageMagick](http://pwet.fr/man/linux/commandes/imagemagick), [lftp](http://pwet.fr/man/linux/commandes/lftp) et xclip, il faut donc les installer à l'aide du système de paquet de votre distribution, sous Ubuntu la commande est la suivante :

 ``` bash
$ sudo apt-get install imagemagick lftp xclip
```

 
Le script est le suivant :

``` bash
#! /bin/bash
# prend une capture d'écran
# selon les paramètres, prend la capture de la fenêtre cliquée
# et l'upload sur un serveur FTP
# et copie l'adresse dans le presse papier X11
# Dépendences : imagemagick lftp xclip

# paramètres par défaut
FILE="screenshot-ubuntu-`date +%Y-%m-%d_%H-%M`.png"
TMP=~/tmp/screenshots
REMOTE=tmp
SHOTOPTION="-window root"
UPLOAD=0

# Serveur FTP, pour fonctionner, il faut que les paramètres
# d'identification soit remplies dans le fichier ~/.netrc
SERVER="votre-adresse-du-ftp.com"

print_usage ()
{
    echo "Usage : $0 [-w] [-u]"
    echo -e "\t-w : la fenêtre cliquée uniquement"
    echo -e "\t-u : upload sur ftp"
}

# options
while getopts "uw" opt ; do
    case $opt in
        u ) UPLOAD=1 ;;
        w ) SHOTOPTION="" ;;
        * ) echo "Mauvais paramètre $opt"
            print_usage "$0"
            exit 1 ;;
    esac
done

# dossiers ou déposer le screenshot
[ ! -d $TMP ] &&  mkdir -p "$TMP"
cd "$TMP"

# screenshot
import $SHOTOPTION "$FILE"

# upload ftp
if [ $UPLOAD -eq 1 ] ; then
    echo -n "http://$SERVER/$REMOTE/$FILE" | xclip
    lftp -e "cd $REMOTE ;  put $FILE ; quit" "$SERVER"
fi
```

   
## Configuration

 
Pour fonctionner, il faut rendre ce script exécutable à l'aide [chmod](http://pwet.fr/man/linux/commandes/chmod). Il est bien évidemment possible de mettre les captures dans un autre dossier ou de leur donner un autre nom, il suffit de modifier respectivement les variables TMP et FILE. Pour que l'*upload* fonctionne sans demander de mot de passe, il faut modifier l'adresse du serveur FTP et remplir (ou créer) le fichier [~/.netrc](http://pwet.fr/man/linux/formats/netrc) avec les bons paramètres :

 ``` 
machine votre-adresse-du-ftp.com
login votrelogin
password votremotdepasse
```

 
Pour un minimum de sécurité, ce fichier doit être en lecture/écriture uniquement pour votre utilisateur. Si vous avez créé ce fichier, la commande suivante est suffisante :

 ``` bash
$ chmod 600 ~/.netrc
```

 
Tout ceci fonctionne très bien avec les pages perso chez Free d'autant plus [qu'avec 10Go de disponibles](http://www.freenews.fr/index.php?itemid=3533), y'a de quoi faire quelques *screenshots* !

   
## Utilisation

 
Ce script peut prendre deux paramètres facultatifs :

 * `-w` indique au script que l'on ne souhaite une capture que d'une fenêtre, qu'il est nécessaire de choisir.
 * `-u` indique au script d'uploader le fichier et de copier l'adresse finale dans le presse papier de X, que l'on peut coller en cliquant sur le bouton du milieu de la souris.
 
Ce script prend toute sa puissance, si il est associé à des raccourcis clavier. Par exemple, chez moi avec avec [openbox](http://pwet.fr/man/linux/commandes/openbox), la touche &quot;Impr écran&quot; fait une capture d'écran simple, Ctrl+&quot;Impr écran&quot; fait la même chose en uploadant le fichier. En ajoutant Alt à ces raccourcis clavier, seul la fenêtre séléctionnée est capturée.

 
