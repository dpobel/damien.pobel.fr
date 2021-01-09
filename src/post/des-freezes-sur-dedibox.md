---
title: "Des freezes sur Dedibox ?"
tags: hébergement, mysql, dedibox
lang: "fr"
node: "65448"
remoteId: "8d567ecda4ebe8e7ae67a9cd6ce94c87"
published: 2007-05-12T17:37:18+02:00
updated: 2016-02-08 21:37
---

Je n'avais eu aucun problème jusqu'à récemment, mais depuis début mai, [mon
serveur Dedibox](/post/migration-sur-dedipwet) *freeze* de temps en temps (3 fois
en 12 jours). Il est vrai que j'ai fait pas mal d'opérations *lourdes* sur MySQL
pour faire un peu de ménage ([en faisant mon boulet](/post/boulet) au passage)
mais rien qui devrait faire planter une machine.

Les symptômes sont les suivants : arrêt net de la machine, rien dans
les logs, pas forcément de charge importante sur la machine et hard reboot… Bref
pas facile d'y voir clair. J'hésite un peu à demander le changement de la
machine, car d'après le fil de discussion cité ci-dessus, je ne suis pas sûr
d'avoir mieux ensuite. En plus la réinstallation de tous les sites est une
opération longue et fastidieuse : l'archive
[tar](http://pwet.fr/man/linux/commandes/tar) non-compressé des sites (sans les
différents caches) fait dans les 2.5 Go plus la base de données, bref
c'est pas simple cette histoire.
