---
title: "Droits nécessaires dans MySQL pour eZ publish"
tags: mysql, ez publish, hébergement, debian, pense bête, sécurité
lang: "fr"
node: "62000"
remoteId: "de7668706fa4c165166e0ee98b30906b"
published: 2006-10-18T00:57:04+02:00
updated: 2016-02-10 21:32
---

Aujourd'hui j'ai commencé la migration d'un site assez touffu (plusieurs
administrations, deux extranets,…) utilisant eZ publish d'un serveur que
j'administre vers un serveur d'un prestataire externe. Contrairement à la
dernière fois où j'ai du m'adapter [à l'environnement un poil spartiate sous
Solaris](/post/solaris-et-les-outils-gnu), cette fois ci je n'ai pas été très
dépaysé en découvrant une Debian Stable tout ce qu'il y a de plus classique sur
laquelle je me suis rapidement senti à l'aise après l'installation et
configuration de [Vim](http://pwet.fr/man/linux/commandes/vim) et l'installation
de la configuration de mon [bash](http://pwet.fr/man/linux/commandes/bash).


La seule mini difficulté a été de retrouver [les droits nécessaires minimaux à
l'utilisateur sous
MySQL](http://dev.mysql.com/doc/refman/5.7/en/privileges-provided.html) pour les
communiquer à l'administrateur du serveur. Je ne m'étais pas posé cette question
depuis un bon moment, car j'ai écrit un petit script shell que me prépare
l'environnement nécessaire à l'utilisation d'eZ publish ou d'autres solutions
sur plateforme [LAMP](http://fr.wikipedia.org/wiki/LAMP). Heureusement, comme
pense bête, Matt Brady a publié cette même
question
dans le forum ez.no à laquelle Kristof Coomans
a, comme à son habitude, apporté une réponse claire et précise.


Pour faire court, les droits nécessaires sont les suivvants :

* CREATE
* DROP
* ALTER
* INDEX
* DELETE
* INSERT
* SELECT
* UPDATE
* CREATE TEMPORARY TABLES
* LOCK TABLES

Ce qui lors de la création de l'utilisateur MySQL donne la requête suivante (à adapter…) :

 ``` sql
GRANT CREATE,DROP,ALTER,INDEX,DELETE,INSERT,SELECT,
      UPDATE,CREATE TEMPORARY TABLES,LOCK TABLES
    ON ma_base_pour_ez.*
    TO 'mon_user_pour_ez'@'localhost'
    IDENTIFIED BY 'mon_super_motdepasse';

FLUSH PRIVILEGES;
```

Les 4 premiers droits de cette liste sont uniquement nécessaires à l'installation ou éventuellement lors de l'éxécution des scripts de mises à jour d'une version à une autre. Comme le souligne Matt Brady, cette information n'est pas dans la documentation officielle.
