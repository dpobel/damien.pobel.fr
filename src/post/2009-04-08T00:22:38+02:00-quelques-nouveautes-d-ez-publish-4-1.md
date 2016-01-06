---
title: "Quelques nouveautés d'eZ Publish 4.1"
tags:
    - ez publish
    - php
    - xhtml
    - extension
updated: 2009-04-08T11:10:42+02:00
lang: fr
node: 67744
remoteId: dfc5d82b1daefb2035b5e506b7dd737d
---

Il n'y a pas que [des améliorations de performances dans eZ Publish 4.1](/post/comparaison-de-performances-entre-ez-publish-4-0-1-et-4-1). [L'annonce de la sortie de la version 4.1](http://ez.no/developer/news/ez_publish_4_1_0_released) liste les plus grosses nouveautés ([stale cache](http://ez.no/developer/articles/ez_publish_knowledge_series_stale_cache_or_how_caches_in_ez_publish_4_1_are_handled_in_a_smarter_way), [object states](http://ez.no/developer/articles/ez_publish_knowledge_series_editorial_workflow_with_object_states), ...) et d'autres améliorations attendues depuis un bon moment. Je pense en particulier à [l'ajout de déclencheurs](http://issues.ez.no/10176) sur d'autres opérations que l'affichage d'un objet (<code>content/read</code>
), la publication (<code>content/publish</code>
) ou ceux dédiés au module de boutique. Mais [eZ Publish](/tag/ez+publish) 4.1 apporte aussi d'autres améliorations qui sont passées pour le moment un peu inaperçues comme l'amélioration des *content edit handler* ou les extensions de type *output filter*.


## Validation avec un *content edit handler*


Jusqu'à eZ Publish 4.0 un *content edit handler* permettait uniquement lancer un bout de PHP au moment de la publication d'un contenu. Il s'agit d'un mécanisme apparu dans [eZ Publish 3.8](http://ez.no/developer/news/ez_publish_3_8_0_is_released) qui permet d'implémenter tout un tas de fonctionnalités comme la mise à jour d'un cache spécifique, [la publication à partir d'une date renseignée dans un attribut](http://svn.projects.ez.no/ezcore/trunk/ezcore/doc/hide_unhide.txt), [la création d'un espace personnel lors de l'ajout d'un utilisateur](http://serwatka.net/index.php/blog/ez_publish_3_8_new_custom_edit_handler), ... J'ai toujours vu ce mécanisme comme une sorte d'évènement de *workflow post publish* en beaucoup plus simple (pas de code de retour, pas de syntaxe alambiquée, pas de possibilité de laisser le travail à script *cron*...).


Dans eZ Publish 4.1, il est maintenant possible d'implémenter [une méthode de validation dans un *content edit handler*](http://pubsvn.ez.no/nextgen/trunk/doc/features/4.1/enhanced_custom_edit_handler.txt), en fonction du retour de celle-ci, l'objet part en publication, sinon le formulaire affiche le/les messages comme lorsqu'on oublie de remplir un champ obligatoire par exemple. Dans certains cas, ce nouveau mécanisme peut largement simplifier les choses notamment en permettant la vérification de règles syntaxiques supplémentaires sans nécessiter le développement d'un datatype spécifique ce qui est parfois un peu lourd pour juste ajouter une validation simple (validation d'un code postal, d'une longueur minimale d'une ligne de texte, d'un domaine particulier pour un email, ...)


## Extension *output filter*


Il s'agit d'un nouveau type d'extension qui permet d'ajouter un traitement sur le code de la page entière. [La documentation dans le SVN](http://pubsvn.ez.no/nextgen/trunk/doc/features/4.1/output_filter.txt) de cette nouvelle fonctionnalité donne comme exemple la réécriture des URL des composants de la page en fonction de la position géographique. Pour les *validatorophiles*, on peut aussi imaginer corriger les éventuels problèmes de validation (X)HTML grâce à un filtre utilisant [l'extension php-tidy](http://fr2.php.net/tidy) ou encore remplacer des tags prédéfinis par des éléments générés par un autre système (une version PHP des <abbr title="Server Side Include">SSI</abbr>  ou [d'<abbr title="Edge Side Include">ESI</abbr>  simpliste](http://en.wikipedia.org/wiki/Edge_Side_Includes)). Bien évidemment comme cette fonctionnalité permet de traiter l'ensemble du code de la page, il faut se méfier des effets néfastes sur le temps de génération des pages.

