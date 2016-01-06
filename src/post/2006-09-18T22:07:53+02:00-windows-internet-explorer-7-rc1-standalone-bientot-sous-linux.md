---
title: "Windows Internet Explorer 7 RC1 \"standalone\" bientôt sous Linux"
tags:
    - standards
    - css
    - ubuntu
    - linux
    - internet explorer
    - web
updated: 2007-02-01T18:00:46+01:00
lang: fr
node: 61542
remoteId: 54d2231ec3b72ace0947d74a95743693
---
 
Il est possible depuis quelques temps déjà [d'installer une version *standalone* de Windows Internet Explorer 7](http://tredosoft.com/IE7_standalone), IE7 pour les intimes sous Windows XP SP2. Je viens d'essayer les 2 méthodes d'installation sous Ubuntu Dapper Drake avec [wine](http://pwet.fr/man/linux/commandes/wine) et en l'état ce n'est pas très probant. [Sérgio Lopez](http://www.tatanka.com.br/ies4linux/forum/viewtopic.php?t=14), le développeur d'[IE4Linux](http://www.tatanka.com.br/ies4linux/), un script qui permet déjà d'installer Internet Explorer 5, 5.5 et 6 sous GNU/Linux, [travaille déjà dessus, il semble qu'il commence à avoir de bon résultats](http://www.tatanka.com.br/ies4linux/news/28) !

 
Mais pourquoi installer ce euh... truc (j'hésite à appeler ça un navigateur) ? Si vous êtes développeur web, vous n'avez pas trop le choix. [IE7 sera proposé comme mise à jour prioritaire de Windows XP SP2](http://blogs.msdn.com/ie/archive/2006/07/26/678149.aspx), on peut donc prévoir que bon nombre de personnes l'installeront sans même le vouloir/savoir (je connais même des personnes non informaticiennes qui l'avaient déjà en bêta1...), ce qui est plutôt bien pour les standards du web. Mais les jours suivant cette mise à jour risquent d'être bien chargés pour beaucoup de Web Agency/Webmasters tant [les bugs d'Internet Explorer 6 et inférieurs sont énormes en matière d'interprètation (x)HTML](http://www.positioniseverything.net/explorer.html) obligeant parfois à utiliser des [Hacks CSS un peu acrobatiques qui ne fonctionneront plus sous cette nouvelle version](http://www.positioniseverything.net/articles/ie7-dehacker.html). Il est bien sûr recommandé d'utiliser [les commentaires conditionnels](http://www.blog-and-blues.org/articles/Les_syntaxes_de_commentaires_conditionnels_pour_IE_Windows) pour contourner les bugs des différentes versions en applicant une feuille de style spécifique à chaque version, mais même dans ce cas, il faudra tout de même analyser la situation pour IE7 ce qui peut représenter un travail long, fastidieux et difficile même sur des sites de taille moyenne.

