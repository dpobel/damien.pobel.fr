---
title: "Performances, performances, performances !"
tags: postgresql, ez publish, performances, mysql, php, google, windows
lang: "fr"
node: "67857"
remoteId: "e4731e7a53d5387d8eb24b56a1424ec2"
published: 2009-07-04T15:22:44+02:00
updated: 2016-02-09 08:37
---

Performances&nbsp;! c'est le mot qui revient régulièrement dans beaucoup
d'articles que j'ai lus ci et là ces derniers temps. Petite revue de web&nbsp;:


Le plus visible est probablement le fiasco de l'article *PHP Performance
tips* (article disparu depuis…) de Google.
Tellement **de mauvais conseils** que les billets en réponse ont fusé sur le
[Planet PHP](http://www.planet-php.net/) et [Gwynne Raskind a répondu point par
point dans le groupe Make the web
faster](http://groups.google.com/group/make-the-web-faster/browse_thread/thread/ddfbe82dd80408cc).
Étonnant de voir Google malmené comme ça.


Sur un tout autre sujet, [Artisan Numérique publie un benchmark de
PostgreSQL](http://artisan.karma-lab.net/performances-postgresql-83) entre les
versions 8.2 et 8.3 et ensuite avec quelques optimisations. Je suis loin d'être
un spécialiste et un grand utilisateur de PostgreSQL mais c'est toujours
intéressant surtout avec le flou régnant autour de MySQL depuis le rachat de Sun
par Oracle.


La mort de Mickaël Jackson a visiblement donné [un petit coup de chaud aux sites
people comme l'explique Charles-Christian
Croix](https://www.karlesnine.com/2009/07/01/mes-sites-peole-on-survecu-a-la-mort-de-michael-jackson/)
Le trafic a plus que doublé en quelques minutes ! Mais à mon avis le plus
intéressant dans cette page n'est pas vraiment les chiffres [mais plus la
comparaison entre les reverse proxy Varnish et Squid dans un commentaire d'un
point de vue administration
système](https://www.karlesnine.com/2009/07/01/mes-sites-peole-on-survecu-a-la-mort-de-michael-jackson/#comments)


Enfin, ça n'aura échappé à personne s'intéressant un peu à PHP; après une longue
gestation, [PHP 5.3 est
sorti](http://www.php.net/archive/2009.php#id2009-06-30-1). Cette version
apporte son lot de nouveautés au niveau du langage plus ou moins intéressantes
(beurk le goto et le séparateur de namespace) mais aussi des améliorations de
performances. Dans le forum sur eZ.no, [Björn Dieding rapporte un gain de 90%
sur
Windows](http://share.ez.no/forums/developer/performance-php-5.2-vs-php-5.3-huge-gain)
avec [eZ Publish](/tag/ez-publish) + PHP 5.3 par rapport au même site tournant
avec PHP 5.2 ! Łukasz Serwatka a réalisé le même benchmark sous
Linux (article disparu depuis…) observant
un gain de l'ordre de 20% !

