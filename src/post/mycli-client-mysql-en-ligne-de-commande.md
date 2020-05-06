---
title: mycli, un client MySQL (et alternatives compatibles) en ligne de commande
tags: mysql, shell, ssh, linux, macosx
lang: fr
published: 2018-02-17T17:28:26
photos:
    - images/mycli.png
---

*Via* [le Journal du Hacker](https://www.journalduhacker.net/), je suis tombé
sur [Config pour ne plus taper ses mots de passe MySQL et plus encore avec les
Options
file](https://www.mon-code.net/article/100/Config-pour-ne-plus-taper-ses-mots-de-passe-MySQL-et-plus-encore-avec-les-Options-file)
qui rappelle que le client MySQL en ligne de commande propose un fichier de
configuration (`~/.my.cnf`) permettant de se simplifier la vie si on se connecte
toujours aux mêmes machines/bases. Ce billet montre aussi
l'option `pager` de ce fichier de configuration qui, comme son nom l'indique,
permet de configurer un *pager* (`more`, `less`, `neovim`, ... ou ce que vous
voulez) que l'auteur utilise pour [mettre de la couleur dans le client MySQL /
MariaDB](https://www.mon-code.net/article/80/mettre-de-la-couleur-dans-le-client-mysql-mariadb)
avec [Generic Colouriser](https://github.com/garabik/grc). Bref, ce sont deux
très bonnes astuces pour les utilisateurs de `mysql` en ligne de commande dont
je fais partie.

Il se trouve qu'en plus, au travail, j'utilise une machine virtuelle. Et donc,
pour accèder à MySQL, il me faut d'abord faire ouvrir un shell avec ssh pour
ensuite lancer le client. Bien sûr, un bête alias permet de faire tout ça plus
rapidement mais j'aime bien avoir mes outils de développement en local. En
cherchant comment installer le client MySQL (et uniquement celui-ci) sur mon
Mac, je suis tombé sur [mycli](http://www.mycli.net/) et autant de le dire tout
de suite, j'ai abandonné l'idée d'installer le client officiel :) En fait, mycli
est un client MySQL (compatible avec MariaDB ou Percona) qui vient avec tout un
tas de fonctionnalités vraiment pratiques et [bien
documentées](http://www.mycli.net/docs) comme [la coloration syntaxique des
requêtes](http://www.mycli.net/syntax), [l'édition multi-ligne ou
non](http://www.mycli.net/multi-line), [quelques commandes
pratiques](http://www.mycli.net/commands) et **surtout [un complètement
intelligent](http://www.mycli.net/completion)**&nbsp;!

<figure class="object-center">
    <img loading="lazy" src="/images/mycli.png" alt="Capture d'écran de mycli dans un terminal">
</figure>

Il a sa propre configuration dans `~/.myclirc` (qu'il génère au premier
lancement avec les commentaires, encore une bonne idée) mais le plus beau, c'est
qu'il utilise aussi `~/.my.cnf` le fichier de configuration du client officiel
et donc les 2 astuces citées plus haut fonctionnent parfaitement et directement dans
cet outil&nbsp;!

Bref, pour le moment, mon `.myclirc` est celui par défaut (sauf le thème
*fruity*) et mon `.my.cnf`
ressemble à&nbsp;

```ini
[client]
user = MONUSER
password = PASSWORD
host = vm.local

# ~/.grcat/mysql provient de https://github.com/nitso/colour-mysql-console
pager = 'grcat ~/.grcat/mysql|most'
```

J'utilise `most` comme *pager* mais j'hésite encore avec `less`
qui propose une option pour ne pas paginer lorsque les données sont trop courtes
ou [Neovim dont j'ai vraiment l'habitude](/post/vim-neovim/).

Dernier point, vous n'utilisez pas MySQL (ou MariaDB ou Percona)&nbsp;? Pas de
problème, l'auteur a écrit [le même genre de clients pour d'autres serveur de
base de données](http://www.dbcli.com/).
