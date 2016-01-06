---
title: Script de sauvegarde de bases de données sur un FTP
tags: hébergement, mysql, bash, dedibox, ubuntu, linux, shell, sécurité
updated: 2007-03-06T17:11:34.000Z
lang: fr
node: 64259
remoteId: 0bd8403899132bf4bd493e1405b18431
published: 2007-02-04T19:00:58+01:00
---
 
Je continue tranquillement l'installation / la configuration de ma Dedibox sous Ubuntu hébergeant [ce site](http://pwet.fr/). Après avoir fait [cohabiter PHP4 et PHP5](/post/php4-mod-php-et-php5-fastcgi-avec-apache-sous-ubuntu), [migrer son site](/post/migration-sur-dedipwet) utilisant [eZ publish](), [configurer mes statistiques web avec AWStats](/post/statistiques-web-avec-awstats-sous-ubuntu-en-mode-cgi) et [m'être battu avec PDO_MySQL](/post/pdo-mysql-sous-ubuntu-au-bord-de-la-crise-nerfs) (rien que ça :)), j'en viens aux backups. On ne le répètera jamais assez, il est important de faire des backups réguliers et systèmatiques comme il est important de savoir restaurer ses sauvegardes...

 
En plus, le service Dedibox [propose un accès FTP avec un quota de 5Go](http://www.dedibox.fr/services/sauvegarde_gratuite.html#backup) inclu dans l'offre, il serait dommage de ne pas en profiter. Il est également possible d'augmenter ce quota, moyennant finances. Pour mon serveur, j'ai choisi d'utiliser cet espace pour sauvegarder les bases de données. C'est la partie la plus volumineuse et dans beaucoup de cas, c'est le seul élément à récupèrer. De toute manière, l'ensemble des données est aussi sauvegardé à intervalle régulier sur mon PC de bureau. Bien sûr les informations indiquées dans ce billet fonctionnent également avec n'importe quel autre accès FTP.

  
## Configuration de MySQL

 
Il faut tout d'abord créer [un utilisateur dans MySQL](http://dev.mysql.com/doc/refman/4.1/en/grant.html) qui aura le droit en lecture sur toutes les bases pour faire un dump. Cela peut se faire via un assistant comme PHPMyAdmin ou bien avec 2 requêtes SQL exécutées en tant que root (de MySQL évidemment) :

 ``` sql
GRANT SELECT, LOCK TABLES, SHOW DATABASES
  ON * TO 'backup'@'localhost' 
  IDENTIFIED BY 'pass_backup';
FLUSH PRIVILEGES;
```

 
L'utilisateur backup de MySQL a maintenant les droits en lecture sur toutes bases (il est conseillé de mettre un mot de passe fort...). Pour qu'un script puisse se connecter sans avoir à taper le mot de passe, il faut créer un fichier nommé .my.cnf dans le répertoire personnel de l'utilisateur qui exécutera le script. Ce fichier doit ressembler à :

``` ini
[client]
 port      = 3306
 user      = backup
 password  = pass_backup
```


Attention à bien restreindre les permission sur ce fichier pour que personne ne puisse le lire, sauf l'utilisateur en question avec la commande suivante :

 ``` bash
> tigrou@dedipwet[88.191.30.29]:~$ chmod 600 .my.cnf
```

   
## Configuration de l'accès FTP

 
Une fois l'option FTP activée dans la rubrique *Sauvegarde* de la console Dedibox, comme pour MySQL il faut faire en sorte que l'accès FTP se fasse sans demander de mot de passe. Il faut créer un fichier [.netrc](http://pwet.fr/man/linux/formats/netrc) toujours à la racine du dossier personnel de l'utilisateur qui fera tourner le script :

 ``` 
machine dedibackup.dedibox.fr
login login_ftp_sauvegarde
password mot_de_passe_ftp_sauvegarde
```

 
Avec ce fichier, les connections FTP sur dedibackup.dedibox.fr se feront avec le login et le mot de passe indiqués avec les clients FTP suivant ce fichier ([ftp](http://pwet.fr/man/linux/commandes/ftp), [lftp](http://pwet.fr/man/linux/commandes/lftp), [ncftp](http://pwet.fr/man/linux/commandes/ncftp), ...) sans rien demander. De la même manière que le fichier .my.cnf, il faut faire attention aux permissions sur ce fichier.

   
## Le script

 ``` bash
#! /bin/bash
# Script de sauvegarde de toutes les bases sur FTP

FTP='dedibackup.dedibox.fr'
MYSQL_DIR='/var/lib/mysql'
TMP="/tmp/backup_site"

# fenêtre de backup en semaine
ROTATION_WEEK=3 
PREFIX_DATE=`date '+%U'`
PREFIX_DATE_DELETE=`date '+%U' -d "-${ROTATION_WEEK}weeks"`

[ ! -d "$MYSQL_DIR" ] && exit 2
[ ! -d "$TMP" ] && mkdir -p "$TMP"

cd "$MYSQL_DIR"
for base in `find . -maxdepth 1 -name [a-zA-Z]\* -type d` ; do
    base=`echo $base | sed 's#\./##g'`
    mysqldump --single-transaction "$base" | bzip2 -9 - > "$TMP/$PREFIX_DATE.$base.sql.bz2"
done
cd -
lftp -e "mrm $PREFIX_DATE_DELETE* ; mput $TMP/* ; exit"  "$FTP"
rm -rf "$TMP"
```

 
Ce script est prévu pour être lancé une fois par semaine avec [crontab](http://pwet.fr/man/linux/commandes/crontab__1). Il va faire un *dump* de toutes les bases, effacer les *dumps* de plus $ROTATION_WEEK semaines sur le serveur distant et uploader les nouveaux ensuite. Le nombre de semaines sur lequel se fait la rotation peut être modifié via la variable ROTATION_WEEK.

 
