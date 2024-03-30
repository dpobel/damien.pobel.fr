---
title: "Solaris et les Outils GNU"
tags: hébergement, ez publish, linux, shell, unix
updated: 2008-08-12T15:52:44.000Z
lang: "fr"
node: "61155"
remoteId: "2b730debb67d104693f8c3e75aad6483"
published: 2006-09-08T23:08:41+02:00
---

Aujourd'hui j'ai eu l'occasion de me connecter en [SSH](http://pwet.fr/man/linux/commandes/ssh) sur une machine tournant sous [Solaris](http://fr.wikipedia.org/wiki/Solaris_%28informatique%29) (SunOS 5.10) apparement un Sparc quadri-processeur équipé de pas moins de 8 Go de RAM, une belle bête en somme. Le but de la manoeuvre était de tester la configuration de l'hébergement pour un site utilisant [eZ publish](/tag/ez-publish). Sur cette machine deux choses m'ont particulièrement frappées.


La première est le relatif &quot;bordel&quot; dans le système de fichiers. Habitué depuis quelques années aux systèmes bien rangés et proche [du standard LSB](http://fr.wikipedia.org/wiki/Linux_Standard_Base) de mes machines ou des serveurs que j'administre, j'ai été un peu dérouté. Ce n'est pas pratique du tout quand on découvre la machine et qu'on cherche juste le fichier de configuration d'[Apache](http://pwet.fr/man/linux/administration_systeme/apache) ou le répertoire de base des sites web. Ça m'a rappelé l'organisation des fichiers sur les serveurs Tru64 que j'utilisais quand j'étais [étudiant à l'ENSSAT](/page/cv-fr). C'est vrai qu'en y réfléchissant bien, une machine utilisée par beaucoup d'utilisateurs avec des besoins très différents, se transforme inexorablement en joyeux foutoir au grès des installations, migrations, mises à jour et l'adaptation de l'existant.


La seconde est la prauvreté du [shell](http://pwet.fr/man/linux/commandes/posix/sh) ([tcsh](http://pwet.fr/man/linux/commandes/tcsh) pour ne pas le nommer) et des applications par défaut installés sur la machine. Par exemple le prompt du shell est un spartiate &quot;login@machine repertoire_courant :&quot;, un [ls](http://pwet.fr/man/linux/commandes/ls) n'affiche aucune couleur améliorant la lisibilité, ou [tar](http://pwet.fr/man/linux/commandes/tar) ne permet pas le désarchivage de tarball compressé avec [bzip2](http://pwet.fr/man/linux/commandes/bzip2) ou [gzip](http://pwet.fr/man/linux/commandes/bzip2) en une ligne sans pipe. Bref, toutes ces petits plus offerts par [les outils GNU](http://directory.fsf.org/) en shell sont absents par défaut.


Cette petite expérience m'a fait prendre (ou plutôt reprendre) conscience du confort apporté par les outils GNU et l'avance de ce point de vue de l'environnement généralement disponible par défaut sous n'importe qu'elle distribution GNU/Linux par rapport aux Unix propriétaires n'offrant pas ces outils.

