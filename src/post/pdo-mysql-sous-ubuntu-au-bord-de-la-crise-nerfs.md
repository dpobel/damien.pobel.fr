---
title: "PDO_MySQL sous Ubuntu, au bord de la crise nerfs..."
tags: ez components, ubuntu, linux, php
lang: "fr"
node: "64163"
remoteId: "5ed43df9d92ce454c9823d18e60928a7"
published: 2007-01-30T00:39:27+01:00
updated: 2016-02-08 22:34
---
 
Voila presque une semaine que je me bats avec
PDO_MySQL
pour arriver à enfin tester le composant
[PersistentObject](http://ezcomponents.org/docs/tutorials/PersistentObject)
d'[eZ components](http://ezcomponents.org)... Après pas mal de recherches,
beaucoup de prises de tête, je voyais la défenestration arrivée à grand pas ;-)
en m'apercevant que finalement le problème venait du module
PDO_MySQL
fraîchement compilé sur ma Dapper Drake.
Le problème était identique sur [ma Dedibox](/post/migration-sur-dedipwet) et sa
Edgy Eft toute propre... J'ai aussi posté [un message sur le forum
Ubuntu-fr](http://forum.ubuntu-fr.org/viewtopic.php?id=92079) avec un succès
comment dire... relatif, 17 affichages et aucune réponse au moment où j'écris
ces lignes...

 
Les symptômes étaient simples, les deux bouts code suivants devraient affichés
la même chose, mais celui avec le
[bindValue()](http://fr2.php.net/manual/en/function.pdostatement-bindvalue.php)
échoue et ne renvoie rien :

``` php
<?php
$db = new PDO('mysql:host=localhost;dbname=sew', 'sew', 'sew');
// Code simple de référence
$stmt = $db->prepare('select * from `sew_sites` where `id`=1');
$stmt->execute();
$row = $stmt->fetchAll( PDO::FETCH_ASSOC );
var_dump($row);
$stmt->closeCursor();
// Ne renvoie rien si compilé avec libmysqlclient14 ou 15
$stmt = $db->prepare('select * from `sew_sites` where `id`=:id');
$stmt->bindValue(':id', 1);
$stmt->execute();
$row = $stmt->fetchAll( PDO::FETCH_ASSOC );
var_dump($row);
$stmt->closeCursor();
?>
```

 
En fait, visiblement, la compilation de ce module avec libmysqlclient14 ou
libmysqlclient15 correspondant respectivement à MySQL 4.1 et MySQL 5.0 d'après
[apt-cache](http://pwet.fr/man/linux/administration_systeme/apt_cache), pose
problème. Pour que ça fonctionne chez moi, il a fallu que j'installe
libmysqlclient12 et libmysqlclient12-dev pour compiler PDO_MySQL... Ce qui est
d'autant plus surprenant que libmysqlclient12 correspond à MySQL 4.0 et que [la
deuxième ligne de la documentation sur
PDO_MySQL](http://fr2.php.net/manual/fr/ref.pdo-mysql.php) indique :

 
*PDO_MYSQL prendra avantage des requêtes natives préparées présentes dans MySQL 4.1 et supérieur.*

 
Et là, je me dis, mais bon sang, [pourquoi n'y a t il pas de paquet officiels
php5-pdo-mysql](https://bugs.launchpad.net/ubuntu/+source/php5/+bug/50353)
surtout que la documentation PHP indique que PDO est livré en standard avec PHP
depuis la version 5.1 et qu'il s'agit d'une fonctionnalité majeure de cette
version de PHP.
