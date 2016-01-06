---
title: "Load Average ou charge d'une machine Unix/Linux"
tags:
    - linux
    - shell
updated: 2007-08-03T09:41:29+02:00
lang: fr
node: 65141
remoteId: f6daeb504144a86723fa254704508502
---
 
Qu'est ce que le *Load Average* ou la charge d'une machine ? C'est une question qui revient fréquemment après quelques temps d'utilisation d'un système Unix comme Linux. Il est vrai que sous Windows ce concept est *caché*, on parle plutôt d'utilisation CPU et on l'exprime en pourcentage, alors que la charge s'exprime habituellement sans unité apparente. Pour faire simple, c'est le nombre de processus en train d'utiliser le(s) processeur(s) ou en train d'attendre de pouvoir les utiliser. On obtient la charge grâce à différents programmes comme [uptime](http://pwet.fr/man/linux/commandes/uptime) ou [top](http://pwet.fr/man/linux/commandes/top) ou en lisant le fichier virtuel /proc/loadavg sous Linux. Ces deux utilitaires renvoient 3 nombres, par exemple :

 ``` bash
> tigrou@dedipwet[88.191.30.29]:~$ uptime
 00:08:35 up 1 day, 14:45,  1 user,  load average: 0.19, 0.18, 0.16
```

 
0.19 est la charge moyenne au cours de la dernière minute, 0.18 au cours des cinq dernières minutes et 0.16 au cours du dernier quart d'heure. Une machine qui a une charge de plus de 1 par processeur (1 pour mono-processeur, 2 pour un bi-processeur, ...) est considérée comme chargée : [ma Dedibox](/post/migration-sur-dedipwet) se porte donc bien en ce moment :-) La raison d'un *load* élevé n'est pas forcément un manque de puissance de calcul, il peut par exemple y avoir beaucoup de processus en attente d'entrées/sorties (disque dur, CD, réseau, ...) sans que le processeur ne soit réellement sollicité. Pour y voir plus clair, le programme top indique également le taux d'utilisation des CPU sur la troisième ligne de sa sortie ce qui permet de déterminer en partie où se situe le goulot de performances.

