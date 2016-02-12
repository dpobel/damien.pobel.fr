---
title: "Le bug d'Internet Explorer sur le téléchargement de fichier en PHP (et autres ...)"
tags: http, microsofterie, stupides, truc, travail, php, internet explorer
lang: "fr"
node: "66486"
remoteId: "2c938aad736556e05b5ff6afd70c25b5"
published: 2007-11-19T23:25:37+01:00
updated: 2016-02-12 13:39
---
 
Via
[PHPIndex](http://www.phpindex.com/index.php/2007/11/15/3935-sitepoint-utilisation-du-cache-pour-resoudre-des-problemes-de-performance-php),
j'ai lu aujourd'hui [un article très intéressant sur la mise en cache côté
serveur et la manipulation du cache côté
client](http://www.sitepoint.com/article/caching-php-performance) en PHP plus
une introduction [au package PEAR
Cache_Lite](http://pear.php.net/package/Cache_Lite). Hormis ce dernier chapitre,
la majeure partie de l'article est applicable avec d'autres langages pour peu
que ceux-ci soient capable d'envoyer des en-têtes HTTP au navigateur via un
équivalent de la [fonction header](http://php.net/header).

 
Mais au détour de cet article, l'auteur explique un des bugs d'Internet Explorer
intervenant lorsqu'on force le téléchargement d'un fichier via un script côté
serveur en employant un code du type suivant (souvent employé lors de la
génération de d'exports en tout genre)&nbsp;:

 ``` php
<?php
// différentes opérations
header( 'Content-Disposition: attachment, filename=fichier.ext' );
// ici je génère mon fichier
// ...
?>
```

 
L'envoi d'un en-tête de ce type provoque sous IE un comportement complètement
aberrant. En fait, ce navigateur (si on peut appeler cela comme ça) fait une
première requête pour télécharger le fichier puis en exécute une seconde avant
de proposer effectivement à l'utilisateur d'ouvrir le fichier et donc si vous
envoyez d'autres en-têtes pour éviter la mise en cache côté client du fichier et
bien IE efface le fichier qu'il vient de télécharger lors de la seconde requête
[HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616.html) !

 
La solution est donc d'envoyer des en-têtes HTTP indiquant la mise en cache du
fichier généré soit de manière permanente si celui-ci ne change pas (via les
en-têtes Pragma et Cache-Control) ou sur une durée plus moins longue (via
l'en-tête Last-Modified)... Voila une belle *Microsofterie* à classer dans un
coin de la tête sous peine d'y perdre encore 2 bonnes heures la prochaine
fois...
