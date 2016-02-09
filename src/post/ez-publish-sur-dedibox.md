---
title: "eZ Publish sur Dedibox"
tags: ez publish, hébergement, dedibox
lang: "fr"
node: "65479"
remoteId: "94827446bcc4cb1b41df6d25f01f51d8"
published: 2007-05-14T22:46:58+02:00
updated: 2016-02-09 13:15
---
 
La question du nombre de site *hébergeables* sur une Dedibox et des performances
de ces serveurs revient assez régulièrement. Je me posais le même genre de
questions quand j'ai [migré ce site sur ma
Dedibox](/post/migration-sur-dedipwet). Voici, ce que je constate sur mon
serveur dans le cadre de sites utilisant [eZ Publish](/tag/ez-publish) qui il
faut bien l'admettre demande pas mal de ressources.

 
Mon serveur héberge trois sites utilisant eZ Publish ([pwet.fr](http://pwet.fr),
[t-ka.net](http://t-ka.net) et frefred.fr (site mort depuis...) où pwet.fr sert
98% des pages) ~~et j'espère bientôt un quatrième
si je trouve le temps de le terminer~~. Si j'en crois
[AWStats](/post/statistiques-web-avec-awstats-sous-ubuntu-en-mode-cgi), l'heure
de pointe se situe aux alentours de 16h où le serveur distribue presque 1200
pages dans l'heure soit en gros une page toutes les 3 secondes. À cet horaire,
je n'ai jamais constaté de véritable pic au niveau de la charge ou de
l'utilisation CPU ce qui laisse à penser qu'il y a encore pas mal de marge. À
mon avis, il est possible de monter à 2 voire 3 pages par seconde (en pointe)
tout en conservant une qualité de service correct en considèrant des pages avec
[le cache de
vue](http://share.ez.no/learn/ez-publish/ez-publish-performance-optimization-part-3-of-3-practical-cache-and-template-solutions/%28page%29/2)
correctement configuré et [les directives cache-block
nécessaires](http://share.ez.no/learn/ez-publish/ez-publish-performance-optimization-part-3-of-3-practical-cache-and-template-solutions/%28page%29/9)
Au delà, ça me paraît difficile à supporter sans employer [le cache
statique](http://share.ez.no/learn/ez-publish/ez-publish-performance-optimization-part-3-of-3-practical-cache-and-template-solutions/%28page%29/3)
ou [un reverse
proxy](http://ez.no/community/articles/using_the_squid_reverse_proxy_to_improve_ez_publish_performance).
Il faut aussi oublier le vider tous les caches d'un coup :-)

 
Biensûr tout ces chiffres sont à modérer en fonction du site et de sa
réalisation qui d'ailleurs sur pwet.fr est loin d'être parfaite, mais j'y
travaille...

