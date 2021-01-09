---
title: "AWStats et les recherches \"accentuées\""
tags: hébergement, truc, ubuntu, linux, web
updated: 2009-10-14T20:00:27.000Z
lang: "fr"
node: "65196"
remoteId: "fee7937772240bc9df67653fe801ac79"
published: 2007-05-01T23:31:02+02:00
---

Voici un court complément à mon billet du 23 janvier concernant l'installation d'[AWStats en mode CGI sous Ubuntu](/post/statistiques-web-avec-awstats-sous-ubuntu-en-mode-cgi). Avec la méthode que j'exposais tout fonctionne très bien, la seule chose ennuyeuse concerne les mots clés tapés dans les moteurs de recherche. En effet, de plus en plus de moteurs utilise [UTF-8](http://pwet.fr/man/linux/conventions/utf-8) ce qui fait que l'URL référente envoyée par le navigateur est elle aussi en UTF-8. Or par défaut AWStats semble traiter les URL en ISO-8859-1 ainsi dans les statistiques au chapitre *Phrases clés* on voit apparaître &quot;fond d Ã©cran&quot; au lieu de &quot;fond d'écran&quot; ou bien &quot;parc de la tÃªte d or&quot; au lieu de &quot;parc de la tête d or&quot;. Avec un peu d'entraînement on arrive rapidement à lire l'UTF-8 mais ce n'est pas très pratique et puis j'aime bien sélectionner certaines phrases clés et les rechercher dans Google avec juste un clic droit dans Firefox et là forcément cela fonctionne moins bien.


Il existe une méthode pour contourner ce problème, pour cela, il suffit d'activer le plugin **decodeutfkeys** dans le fichier de configuration d'AWStats en décommentant (enlever le # en début de ligne) la ligne suivante dans le fichier /etc/awstats.votresite.fr.conf

``` perl
LoadPlugin="decodeutfkeys"
```


Comme l'indique le commentaire dans le fichier de configuration, il faut aussi installer les modules [Perl](http://pwet.fr/man/linux/commandes/perl)[Encode](http://pwet.fr/man/linux/fonctions_bibliotheques/perl/encode) et [URI::Escape](http://pwet.fr/man/linux/fonctions_bibliotheques/pm/uri) pour cela, il suffit de taper :

``` bash
sudo apt-get install liburi-perl
```


Il n'est pas nécessaire de regénérer les statistiques, les mots clés présentés par AWStats devraient maintenant être affichés correctement.

