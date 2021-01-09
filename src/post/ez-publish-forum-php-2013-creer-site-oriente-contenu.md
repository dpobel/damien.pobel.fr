---
title: "Forum PHP 2013: eZ Publish, créer un site orienté contenu en 45 min."
tags: ez publish, forum php, afup, php
lang: "fr"
published: 2013-11-22T12:15:48+01:00
---
*An english version of this post is available [on
share.ez.no](http://share.ez.no/blogs/damien-pobel/conference-at-the-forum-php-2013-create-an-ez-publish-website-in-45-minutes)*

Avec [Patrick Allaert](http://patrickallaert.blogspot.be/), nous avons présenté
une conférence intitulée *eZ Publish : un CMS pour créer un site orienté
contenu en 45 minutes* au [the Forum PHP
2013](http://afup.org/pages/forumphp2013/) à Paris.

[Les slides sont disponibles en
ligne](https://patrickallaert.github.io/create-site-from-scratch.html) avec [le
code associé, le
ForumPhp2013DemoBundle](https://github.com/dpobel/ForumPhp2013DemoBundle) sur Github.
L'idée était de présenter quelques uns des principaux concepts [du CMS
eZ Publish 5](http://ez.no/Products/The-eZ-Publish-Platform) (au passage
[la version 5.2](http://ez.no/5.2) est sortie cette semaine):

* les types de contenu
* eZ Publish 5 est une application Symfony2
* la flexibilité du CMS et la manière de construire un vrai site

Dans la partie pratique, nous avons construit le site d'une conférence PHP comme
le Forum PHP pour montrer les fonctionnalités suivantes: (les liens pointent vers la diff correspondant sur
Github)

1. [Comment écrire une règle d'override pour la vue full pour utilisé un
   template spécifique](https://github.com/dpobel/ForumPhp2013DemoBundle/commit/dd8329485118944514372e91e70973a699f0045c)
2. [Comment en plus utilisé un controller spécifique pour injecter des données
   supplémentaires](https://github.com/dpobel/ForumPhp2013DemoBundle/commit/626d619afe24f14f517e1a8c81623de918db96b5)
3. [Comment organiser les templates en utilisant des *sub-views*](https://github.com/dpobel/ForumPhp2013DemoBundle/commit/f561f7ee2c266f282c28e75fa01327561704d6f7)
4. [Exemple d'utilisation des *sub-views* et de controllers spécifiques](https://github.com/dpobel/ForumPhp2013DemoBundle/commit/4c53df7c238f56332f1e2e4fd27a5f6200b45d3f)


Après ces étapes, nous avons aussi modifié un type de contenu pendant la
conférence et [adapté le template pour prendre en compte le nouvel attribut](https://github.com/dpobel/ForumPhp2013DemoBundle/commit/0342db41f50f7a3885379a8687bd1699266c507c) (Un fichier à télécharger).

Biensûr, ces sujets sont documentés:

* [La configuration des *view provider* (en)](https://confluence.ez.no/display/EZP52/View+provider+configuration) (~override rules)
* [Comment utiliser un controller spécifique pour afficher du contenu (en)](https://confluence.ez.no/display/EZP52/How+to+use+a+custom+controller+to+display+a+content+or+location)
* [Les fonctions Twig (en)](https://confluence.ez.no/display/EZP52/Twig+functions) (`ez_render_field`, `ez_content_name`,…)

Si vous étiez présent, merci [de noter et commenter notre présentation sur
joind.in](https://joind.in/talk/view/9358) et dans le cas contraire, ~~la vidéo
devrait bientôt être disponible en ligne~~ [la vidéo de la conférence est
disponible](/post/video-forum-php-ez-publish-creer-site-oriente-contenu).
