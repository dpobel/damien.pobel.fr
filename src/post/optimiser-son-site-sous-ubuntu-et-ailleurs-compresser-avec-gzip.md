---
title: "Optimiser son site (sous Ubuntu et ailleurs...) : Compresser avec gzip"
tags: ubuntu, linux, apache, performances, yahoo, dedibox, hébergement
updated: 2008-10-31T08:42:41.000Z
lang: "fr"
node: "67022"
remoteId: "8d59490973d4c40ea07e9106492e7d60"
published: 2008-08-18T00:24:48+02:00
---

Après avoir appliqué la règle 3 [en ajoutant et configurant l'entête Expires](/post/optimiser-son-site-sous-ubuntu-configurer-l-en-tete-expires), passons à la règle 4 du [Livre *High Performances Web Sites*](/post/livre-high-performances-web-sites) (ou [des recommandations de performances Yahoo!](http://developer.yahoo.com/performance/rules.html)) en compressant avec gzip les données transmises par le serveur web, ici [Apache2](http://pwet.fr/man/linux/administration_systeme/apache2). Comme son nom le suggère, cette règle vise à limiter au maximum le poids des contenus distribués en réduisant de près de 70% la taille des fichiers textes. Cela permet d'accélérer le premier chargement du site avant la mise en cache par le navigateur. Pour cela, on peut configurer Apache2 pour utiliser le [mod_deflate](http://httpd.apache.org/docs/2.0/mod/mod_deflate.html) qui va se charger de compresser ce qui peut l'être pour un sur coût CPU faible.


La première étape consiste à activer ce module ainsi que [le module headers](http://httpd.apache.org/docs/2.0/mod/mod_headers.html) avec [a2enmod](http://pwet.fr/man/linux/administration_systeme/a2enmod) et à recharger Apache pour prendre en compte ce nouveau module :

``` bash
$ sudo a2enmod deflate
$ sudo a2enmod headers
$ sudo /etc/init.d/apache2 reload

```


Le module headers est nécessaire pour envoyer des entêtes spécifiques aux proxy caches de manière à ne pas envoyer de documents compressés à certains navigateurs buggés mais populaires...


La configuration par défaut, stockée dans le fichier /etc/apache2/mods-available/deflate.conf, fait en sorte de compresser les fichiers texte brut, HTML et XML ce qui est déjà bien, mais on peut aller plus loin en traitant tout ce qui est *texte*. Il est en effet inutile de compresser les images (JPG, PNG, GIF, ...), les PDF et bien d'autres types de fichier qui sont déjà compressés par nature. J'utilise la configuration suivante dans /etc/apache2/conf.d/deflate pour compresser en plus les feuilles de style et les scripts Javascript tout évitant certains bugs connus de quelques navigateurs.

``` apache
 AddOutputFilterByType DEFLATE text/plain text/css application/x-javascript text/xml text/html

# gestion des navigateurs buggés
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4\.0[678] no-gzip
BrowserMatch \bMSIE !no-gzip !gzip-only-text/html

# gestion des proxy caches
Header  append Vary User-Agent

```


Pour faire prendre en compte cette configuration, il ne reste plus qu'à recharger Apache et le tour est joué.

