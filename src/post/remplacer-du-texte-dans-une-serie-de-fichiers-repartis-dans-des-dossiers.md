---
title: "Remplacer du texte dans une série de fichiers répartis dans des dossiers"
tags: bash, ubuntu, linux, shell
lang: "fr"
node: "60930"
remoteId: "b7bb2782edeb2fcbab529aa9ef4286d4"
published: 2006-09-01T20:39:22+02:00
updated: 2016-02-12 12:13
---
 
Le remplacement d'une chaîne par un autre dans une série de fichiers textuels de
manière récursive (dans différents dossiers à différentes profondeurs) est une
question qui revient souvent sur les listes de diffusion comme celle de
Ubuntu-fr ou sur les forums comme par [ce message de Free
Mind](https://lists.ubuntu.com/archives/ubuntu-fr/2006-September/011148.html)
d'il y a à peine 2 heures. Et pourtant la solution est &quot;relativement&quot;
simple et tient en une ligne dans un terminal.

 ``` bash
find /dossier/contenant/fichiers -type f -exec sed -i 's/à remplacer/remplacement/g' {} \;
```

 
Petite explication&nbsp;:

Cette commande indique à find de trouver dans **/dossier/content/fichiers** tous
les fichiers simples (pas les dossiers, ni les liens symboliques, ...) et de
lancer le remplacement avec sed (Stream EDitor). Dans cette expression, **-i**
indique à sed de faire le remplacement directement dans le fichier plutôt que
d'afficher la sortie. **{}** indique à find ou mettre le nom du fichier dans la
commande, enfin le **;** indique à find la fin de la commande à lancer et ce
point virgule doit être précédé d'un \ (anti-slash) pour éviter qu'il ne soit
interprèté par le shell.

 
Cette ligne montre toute la puissance qu'offre la combinaison des utilitaires en
ligne de commandes disponible sous GNU/Linux (et sous la plupart des Unix) et en
particulier de [find](http://pwet.fr/man/linux/commandes/find) et
[sed](http://pwet.fr/man/linux/commandes/find). En particulier la lecture de [la
page du manuel de find](http://pwet.fr/man/linux/commandes/find) est plus que
recommandé pour quelqu'un qui désire écrire des scripts shell de manipulation de
fichiers.
