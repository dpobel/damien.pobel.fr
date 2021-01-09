---
title: "Migration de sites chez Free.fr"
tags: free, hébergement, php, référencement, shell
updated: 2010-07-16T08:02:47.000Z
lang: "fr"
node: "61435"
remoteId: "3720492bc261f7b65145acca8387233e"
published: 2006-09-10T19:57:20+02:00
---

Aujourd'hui j'ai terminé de ré-intégrer la majeure partie des photos de [http://zeimg.free.fr](http://zeimg.free.fr) ici même et j'ai donc décidé de rediriger toutes les requêtes vers [les photos sur ce site](http://photos.pwet.fr) et si possible sur une page la plus pertinente possible pour l'internaute en attendant que le site soit complètement désindexer des moteurs de recherche et [pour les éventuels liens trainant un peu partout sur le web](http://www.google.fr/search?hl=fr&amp;). Il serait dommage de perdre des visiteurs ou du gâcher les efforts consentis pour une référencement correct !


La particularité de mon ancien site était de génèrer des pages HTML statiques uniquement. Du coup pour faire une redirection permanente spécifique selon la page appelée sans langage de script côté serveur et sans [Rewriting](http://apachefrance.com/Manuels/Apache_1.3/mod/mod_rewrite.html) côté serveur est impossible. Une solution longue aurait été de générer un .htaccess contenant un [RedirectPermanent](http://apachefrance.com/Manuels/Apache_1.3_VF/mod/mod_alias.html#redirectperm) par page à rediriger. Heureusement, les serveurs de pages persos chez Free sont configurés avec l'option [Multiview](http://apachefrance.com/Manuels/Apache_1.3/content-negotiation.html) d'Apache. Cette option permet d'appeler un fichier par le web sans son extension. Par exemple avec cette option se rendre à l'URL http://zeimg.free.fr/index revient à appeler http://zeimg.free.fr/index.php. Mieux encore, appeler dans son navigateur préféré http://zeimg.free.fr/dossier/sous-dossier/fichier.php revient en fait à appeler http://zeimg.free.fr/dossier.php/sous-dossier/fichier.php si le &quot;dossier&quot; n'existe pas.


Il est donc assez simple prendre tous les fichiers ou dossiers à la racine d'un site et de créer pour chacun un script PHP. Cette opération peut se faire avec le script suivant après avoir téléchargé l'ensemble du site :

``` bash
#! /bin/sh

# répertoire contenant le site original
SITE=~/tmp/site
# répertoire contenant les scripts PHP de redirection
SITE_REDIR=~/tmp/site_redir
# script faisant effectivement la redirection
PHP_REDIR="redirect.php"

# séparateur pour for est uniquement le retour à la ligne
IFS=`echo ""`
[ ! -d "$SITE_REDIR" ] && mkdir -p "$SITE_REDIR"

for f in `find $SITE -maxdepth 1` ; do
  n=`basename $f` ;
  echo "<?php include('$PHP_REDIR'); ?>" > "$SITE_REDIR/$n.php"
done

touch "$SITE_REDIR/$PHP_REDIR.php"
```


Ce script prend tous les fichiers et dossiers à la racine du site créer pour chacun un fichier PHP portant son nom suivi de l'extension PHP. Ces fichiers PHP contiennent tous uniquement le code suivant :

``` php
<?php include('redirect.php'); ?>
```


Il reste donc uniquement à écrire dans le fichier redirect.php la logique de redirection qui est évidemment propre à chaque site. Par exemple, pour ZeImg, mon fichier redirect.php (écourté) est le suivant :

``` php
<?php
$REDIRECTS['bretagne']='http://photos.pwet.fr/galeries/la-cote-de-granit-rose-lannion-et-ses-environs/';
$REDIRECTS['chateau-aumelas']='http://photos.pwet.fr/galeries/le-chateau-d-aumelas/';
/** … **/

define('FINAL_REDIRECT', 'http://photos.pwet.fr');
$file = $_SERVER['REQUEST_URI'];
function redirect_301($url)
{
    header("Status: 301 Moved Permanently", true, 301);
    header("Location: ".$url);
    exit();
}

foreach($REDIRECTS as $reg => $redir)
{
    if ( ereg(".*$reg.*", $file))
        redirect_301($redir);
}
redirect_301(FINAL_REDIRECT);
?>
```

