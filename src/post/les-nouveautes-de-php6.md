---
title: Les nouveautés de PHP6
tags: xml, php, web
updated: 2008-11-01T12:38:22.000Z
lang: fr
node: 66846
remoteId: 4186ca60385a96ba0d684aefcd796d3e
published: 2008-05-10T22:27:41+02:00
---

Vu sur l'IBM Developer Works un court et synthétique article sur [les nouveautés attendues dans PHP6](http://www.ibm.com/developerworks/library/os-php-future/index.html), encore plus en bref :

* Support de l'[Unicode](http://fr.wikipedia.org/wiki/Unicode)
* Ajout des [Namespaces](http://fr.wikipedia.org/wiki/Namespace)
* Activation des modules [SOAP](http://fr.php.net/manual/fr/book.soap.php), [XMLWriter](http://fr.php.net/manual/fr/book.xmlwriter.php), [XMLReader](http://fr.php.net/manual/fr/book.xmlreader.php) par défaut
* Suppression des options de configuration [magic_quotes](http://fr.php.net/manual/fr/info.configuration.php#ini.magic-quotes-gpc), [register_globals](http://fr.php.net/manual/fr/security.globals.php), [register_long_array](http://fr.php.net/manual/fr/ini.core.php#ini.register-long-arrays), [safe_mode](http://fr.php.net/manual/fr/features.safe-mode.php)
* Suppression du support de Freetype1, GD1 et [des fonctions liées aux expressions rationnelles POSIX](http://fr.php.net/manual/fr/book.regex.php)

Il est dommage que ce passage ne soit pas l'occasion de refondre l'API pour y apporter [une cohérence regrettée](http://www.phpindex.com/index.php/2007/02/28/3067-et-si-php-etait-audite-demain)...

