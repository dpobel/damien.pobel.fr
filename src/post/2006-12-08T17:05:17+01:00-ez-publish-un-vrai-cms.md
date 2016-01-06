---
title: "eZ publish, un vrai CMS ?"
tags:
    - cms
    - spip
    - joomla!
    - humeurs
    - ez publish
    - web
updated: 2007-06-24T11:16:31+02:00
lang: fr
node: 63798
remoteId: 28553d66e9f3139966b779a0b79691af
---
 
J'ai déjà écrit [une quinzaine de billets autour d'eZ publish](/tag/ez+publish), mais je me rend compte que je n'en ai jamais vraiment parlé par rapport au petit monde des CMS. Pourtant, je parcours assez souvent des forums pour webmasters sur divers sujets (Développement, Astuces, Standards, Référencement, ...) et il y a une question qui revient souvent : *quel CMS choisir pour ci ou pour ça ?* Et la réponse est quasiment invariablement [SPIP](http://www.spip.net) ou [Joomla!](http://www.joomla.org/) alors que je répondrai bien souvent (mais pas toujours) **eZ publish** !

 
SPIP est historiquement l'un des plus anciens de ce qu'on appelle couramment un CMS et est réputé pour sa simplicité et sa facilié à être hackée ([au sens d'origine du terme](http://fr.wikipedia.org/wiki/Hacker)) pour ses besoins, alors que Joomla! plus récent ([issu d'un fork de Mambo](http://forum.joomlafacile.com/showthread.php?t=1894) lui-même plus récent que SPIP) est connu pour sa richesse fonctionnelle de base et sa facilité d'utilisation. Pourtant pour moi aucun de ces deux outils n'est véritablement un CMS ou plutôt ce sont des **CMS spécialisés**.

 
Ceci n'est **PAS** un troll et ça n'enlève rien aux qualités de ces deux outils dans leurs spécialités ; je m'explique : CMS signifie Content Management System ou en français SGC, Système de Gestion de Contenu. Ces sigles veulent juste dire qu'un CMS est un outil permettant de gèrer et de structurer son contenu et de le publier. Comme l'indique [l'introduction de l'article Système de Gestion de Contenu sur Wikipedia](http://fr.wikipedia.org/wiki/Syst%C3%83%C2%A8me_de_gestion_de_contenu), à cela on peut éventuellement rajouter des fonctionnalités comme l'édition multi-utilisateurs, une chaîne de validation ( *workflow*) voire une gestion des versions et certainement beaucoup d'autres choses encore...

 
En tout cas, le Contenu désigné par le C de SGC ou CMS ne se résume pas à une suite d'articles, d'actualités et de rubriques (SPIP...) ou à des sujets de forums (pour ceux qui croiraient que [phpBB](http://www.phpbb.com/) est un CMS...) ou à des articles dans une boutique ou encore à des photos ou des billets d'un blog... Le contenu peut être beaucoup plus spécifique ( *métier* si on parle de professionnels). Bien sûr il est toujours possible de se dire que ce contenu pourra très bien être présenté dans une simple page de texte (un article) ce que tous les Systèmes de Gestion de Contenu savent faire, mais sans structuration on écarte toute possibilité d'utilisation avancée du contenu (recherches avancées, exports particuliers, ...). Et c'est justement là une des grandes forces d'eZ publish, la structuration qui permet à l'outil de s'adapter au contenu et non l'inverse puisque chaque objet dans l'arborescence est [une instance d'une classe](http://ez.no/doc/ez_publish/technical_manual/3_8/concepts_and_basics/content_management/the_content_class) dont on a défini [les différents membres](http://ez.no/doc/ez_publish/technical_manual/3_8/concepts_and_basics/content_management/datatypes) (Ligne de texte, texte formaté ou non, sélection, date, adresse web, ...) et dont on définit la manière dont il s'affichera sur le site ou ailleurs par des *templates* (export PDF, ODF ...)

 
Ce mode de conception n'a pas que des avantages, parmis les inconvénients on peut citer les deux principaux à mon sens :

  * la relative complexité de l'outil, il est clair que pour être à l'aise avec eZ publish, cela demande un peu de temps et d'investissement mais en contre partie on maîtrise un outil au champs fonctionnel extrêment large ;
 * les ressources, il faut avouer qu'eZ publish est gourmand et qu'un hébergement de qualité est nécessaire, mais avec [quelques optimisations](http://ezpedia.org/wiki/en/ez/performance) ([caches](/post/ez-publish-et-son-cache), bonne pratiques, bonnes configurations...), cet outil se révèle tout de même très performant au regard des fonctionnalités apportées.
 
 
Pour conclure, eZ publish se positionne plus comme une (grosse!) boîte à outils *à tout faire* alors que SPIP et Joomla! ont un champ d'actions plus restreints et je le répète je n'ai rien contre SPIP ou Joomla! qui ont tout deux leurs qualités et leurs défauts.

