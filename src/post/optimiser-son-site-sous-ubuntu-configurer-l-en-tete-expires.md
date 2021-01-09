---
title: "Optimiser son site sous Ubuntu : Configurer l'en-tête Expires"
tags: ubuntu, linux, dedibox, php, apache, hébergement, performances
updated: 2008-08-18T11:57:26.000Z
lang: "fr"
node: "66992"
remoteId: "00be671d9d2e17ab8fa99923b2bb55da"
published: 2008-08-11T23:49:41+02:00
---

Lire [un livre sur comment optimiser son site web](/post/livre-high-performances-web-sites) c'est bien, appliquer les conseils qui s'y trouvent c'est encore mieux. Parmi les 14 bonnes pratiques, 3 peuvent être appliquées très rapidement au niveau système en quelques lignes de commande et de configuration du serveur web pour un résultat quasi immédiat :

* Règle 3 : [Ajoutez et configurez l'en-tête *Expires*](http://developer.yahoo.com/performance/rules.html#expires)
* Règle 4 : [Compressez avec *gzip*](http://developer.yahoo.com/performance/rules.html#gzip)
* Règle 13*:*[Configurez l'entête *ETags*](http://developer.yahoo.com/performance/rules.html#etags)

Dans un premier temps, je vais m'intéresser à la règle 3, je suppose que vous avez déjà un serveur web [Apache2](http://pwet.fr/man/linux/administration_systeme/apache2) actif servant des fichiers (peu importe la technologie autour). La configuration suivante est utilisée sur [ma Dedibox sous Ubuntu](/post/une-dedibox-en-moins-de-temps-qu-il-en-faut-pour-le-dire) avec Apache2 mais doit pouvoir s'appliquer à peu près partout.


## Ajoutez et configurez l'en-tête *Expires*


L'en-tête *Expires* indique quand un élément devra expirer du cache du navigateur; mettre une date d'expiration dans un futur lointain permet de maximiser l'utilisation du cache navigateur et donc d'éviter les téléchargements inutiles, ce qui est particulièrement utile pour les éléments statiques (images, feuilles de style, …) qui ont tendances à changer … peu fréquemment mais à ralentir l'affichage de la page si ils ne sont pas en cache. Pour ces éléments, il est possible de configurer l'expiration dans Apache avec [le module expires](http://httpd.apache.org/docs/2.0/mod/mod_expires.html). Pour les pages dynamiques ou éléments générés dynamiquement, c'est au script d'envoyer l'en-tête et sa valeur adéquate par exemple avec la fonction [header() en PHP](http://fr.php.net/header).


L'activation du module pour Apache2, il faut utiliser [a2enmod](http://pwet.fr/man/linux/administration_systeme/a2enmod) avec la ligne suivante et ensuite recharger apache :

``` bash
$ sudo a2enmod expires
$ sudo /etc/init.d/apache2 reload

```


Il reste alors à configurer ce module. Je stocke la configuration de ce module dans le fichier /etc/apache2/conf.d/expires dont voici le détail :

``` 
ExpiresActive On
ExpiresByType image/gif "access plus 30 days"
ExpiresByType image/jpg "access plus 30 days"
ExpiresByType image/jpeg "access plus 30 days"
ExpiresByType image/png "access plus 30 days"
ExpiresByType image/x-icon "access plus 30 days"
ExpiresByType text/css "access plus 30 days"
ExpiresByType application/x-javascript "access plus 30 days"

```


Tous les éléments statiques des types listés expirent 30 jours après leur premier téléchargement. Après un nouveau reload d'Apache, vous devriez voir apparaître l'en-tête Expires par exemple avec l'extension Firebug de Firefox au premier chargement des éléments de la page. Ensuite le navigateur utilisera son cache ce qui devrait accélérer l'affichage des pages suivantes utilisant les mêmes éléments.

