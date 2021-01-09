---
title: "Comment créer des objets eZ Publish en PHP"
tags: ez publish, php, pense bête, truc
lang: "fr"
node: "67911"
remoteId: "f1b674d210faeab4a0d75340130a0b84"
published: 2009-08-19T23:03:05+02:00
updated: 2016-02-12 09:29
---

J'ai découvert il n'y a pas très longtemps la fonction
[eZContentFunctions::createAndPublishObject()](http://pubsvn.ez.no/doxygen/trunk/LS/html/classeZContentFunctions.html#a0850acaf97f8360721ede6fea371c642)
de l'API [eZ Publish](/tag/ez-publish/). Cette fonction bien cachée (et enfin
documentée depuis la résolution [de ce bug](http://issues.ez.no/12261)) permet
de créer facilement des objets de contenus. Quand je pense que tout le travail
est mâché par cette fonction, ça en fait des lignes de codes inutiles… Par
exemple, pour créer un objet de la classe de contenu
[File](http://ez.no/doc/ez_publish/technical_manual/4_x/reference/content_classes/media/file),
ces quelques lignes suffisent :

``` php
<?php
$params = array();
$params['parent_node_id'] = 52; // node id of /Media/Files
$params['class_identifier'] = 'file';
$params['creator_id'] = 14; // admin
$params['storage_dir'] = '/tmp/data/'; // don't forget the ended /
$params['section_id'] = 3; // section media

$attributesData = array();
$attributesData['name'] = 'My file';
$attributesData['file'] = 'my_file.txt';

$params['attributes'] = $attributesData;
$contentObject = eZContentFunctions::createAndPublishObject( $params );
?>

```

Chaque élément du tableau <code>$attributesData</code> contient les valeurs des
attributs du futur objet de contenu sous le format attendu par [la méthode
fromString() de chaque
datatype](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/features/3.9/to_from_string_datatype_functionality.txt)
Et voila, ce n'est pas plus compliqué que ça ! Dommage [qu'il n'existe pas
encore l'équivalent pour mettre à jour les objets de contenu
existants](http://issues.ez.no/15330).
