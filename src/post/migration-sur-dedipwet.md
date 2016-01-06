---
title: Migration sur Dedipwet :)
tags: hébergement, mysql, dedibox, blog
updated: 2007-03-30T21:25:23.000Z
lang: fr
node: 64074
remoteId: 97e3ee714ee8b7d5d3290b3610464fb7
published: 2007-01-21T01:24:16+01:00
---
 
Ouf ! [pwet.fr](/) est maintenant hébergé sur [sa propre Dedibox](/post/une-dedibox-en-moins-de-temps-qu-il-en-faut-pour-le-dire) renommée pour l'occasion *Dedipwet* :-) L'opération a été assez compliquée car le dump SQL de la base est assez volumineux (il fait 2.3 Go...) et je ne pouvais pas me permettre d'arrêter le serveur de base données pour copier directement les fichiers binaires de l'ancien serveur. Puis j'ai découvert [l'option --single-transaction de mysqldump](http://dev.mysql.com/doc/refman/5.0/fr/mysqldump.html) au détour de la documentation de MySQL 5.0. Bien que j'utilise MySQL 4.1 et que cette option ne soit pas indiquée dans [la page du manuel de mysqldump](http://pwet.fr/man/linux/commandes/mysqldump) elle est présente depuis MySQL 4.0.2 ... Cette option permet d'exporter les tables InnoDB sans perturber les transactions des autres applications, la génération du dump s'en trouve largement accélèrée. Finalement, le plus long a été de réimporté l'ensemble du dump...

 
J'en ai profité aussi pour corriger un bug sur l'affichage des archives par jour et sur la génération des URL vers ces archives et enfin j'ai enlevé le &quot;Hosting by Kaliop&quot; en pied de page. Reste plus qu'à configurer la génération des statistiques journalières avec awstats, remettre un accès FTP avec [pure-ftpd](http://pwet.fr/man/linux/administration_systeme/pure_ftpd) pour pouvoir mettre en ligne [mes photos](http://photos.pwet.fr) simplement et le tour sera joué pour l'aspect &quot;système&quot;. Côté [eZ publish](/tag/ez+publish), je voudrais migrer vers la version 3.9 mais ce sera pour un autre jour.

