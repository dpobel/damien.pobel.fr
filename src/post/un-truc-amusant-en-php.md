---
title: Un truc amusant en PHP
tags: geek, amusant, php
updated: 2007-07-12T18:42:34.000Z
lang: fr
node: 64724
remoteId: d95a981f3e104e027669a689feb7bc63
published: 2007-03-09T23:33:43+01:00
---
 
Via [Planet PHP](http://www.planet-php.net/) et [le blog de Ivo Jansch](http://www.achievo.org/blog/archives/55-System.out.print-in-PHP.html), j'ai découvert un truc marrant en PHP, on peut écrire des choses du type :

 ``` php
<?php
System.out.print("Je fais du Java en PHP ;-)");
I.need.to.get.some.sleep(1);
?>
```

 
Bon évidemment ça n'est pas recommandé et en plus ça n'a aucun intérêt :-) En fait techniquement ce comportement est normal. Le *parser* fait juste [quelques *notices*](http://fr2.php.net/manual/en/ref.errorfunc.php) car il interprète les instructions inconnues comme des constantes non définies...

