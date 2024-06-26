---
title: "Quelques nouveautés d'eZ Publish 4.1"
tags: ez publish, php, xhtml, extension
lang: "fr"
node: "67744"
remoteId: "dfc5d82b1daefb2035b5e506b7dd737d"
published: 2009-04-08T00:22:38+02:00
updated: 2016-02-10 21:39
---

Il n'y a pas que [des améliorations de performances dans eZ Publish
4.1](/post/comparaison-de-performances-entre-ez-publish-4-0-1-et-4-1).
L'annonce de la sortie de la version
4.1 (ez.no/developer/news/ez_publish_4_1_0_released, page hors ligne depuis…) liste les plus
grosses nouveautés (stale
cache,
object
states,
…) et d'autres améliorations attendues depuis un bon moment. Je pense en
particulier à l'ajout de déclencheurs sur d'autres
opérations que l'affichage d'un objet (<code>content/read</code>), la
publication (<code>content/publish</code>) ou ceux dédiés au module de boutique.
Mais [eZ Publish](/tag/ez-publish) 4.1 apporte aussi d'autres améliorations qui
sont passées pour le moment un peu inaperçues comme l'amélioration des *content
edit handler* ou les extensions de type *output filter*.


## Validation avec un *content edit handler*

Jusqu'à eZ Publish 4.0 un *content edit handler* permettait uniquement de lancer un
bout de PHP au moment de la publication d'un contenu. Il s'agit d'un mécanisme
apparu dans eZ Publish
3.8 qui permet
d'implémenter tout un tas de fonctionnalités comme la mise à jour d'un cache
spécifique, la publication à partir d'une date renseignée dans un
attribut,
la création d'un espace personnel lors de l'ajout d'un
utilisateur (serwatka.net/index.php/blog/ez_publish_3_8_new_custom_edit_handler, page hors ligne depuis…),
… J'ai toujours vu ce mécanisme comme une sorte d'évènement de *workflow post
publish* en beaucoup plus simple (pas de code de retour, pas de syntaxe
alambiquée, pas de possibilité de laisser le travail à un script *cron*…).


Dans eZ Publish 4.1, il est maintenant possible d'implémenter une méthode de
validation dans un *content edit
handler*(https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/features/4.1/enhanced_custom_edit_handler.txt),
en fonction du retour de celle-ci, l'objet part en publication, sinon le
formulaire affiche le/les messages comme lorsqu'on oublie de remplir un champ
obligatoire par exemple. Dans certains cas, ce nouveau mécanisme peut largement
simplifier les choses notamment en permettant la vérification de règles
syntaxiques supplémentaires sans nécessiter le développement d'un datatype
spécifique ce qui est parfois un peu lourd pour juste ajouter une validation
simple (validation d'un code postal, d'une longueur minimale d'une ligne de
texte, d'un domaine particulier pour un email,…)


## Extension *output filter*


Il s'agit d'un nouveau type d'extension qui permet d'ajouter un traitement sur
le code de la page entière. [La documentation dans les sources](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/features/4.1/output_filter.txt) de
cette nouvelle fonctionnalité donne comme exemple la réécriture des URL des
composants de la page en fonction de la position géographique. Pour les
*validatorophiles*, on peut aussi imaginer corriger les éventuels problèmes de
validation (X)HTML grâce à un filtre utilisant [l'extension
php-tidy](http://fr2.php.net/tidy) ou encore remplacer des tags prédéfinis par
des éléments générés par un autre système (une version PHP des <abbr
title="Server Side Include">SSI</abbr> ou [d'<abbr title="Edge Side
Include">ESI</abbr>
simpliste](http://en.wikipedia.org/wiki/Edge_Side_Includes)). Bien évidemment
comme cette fonctionnalité permet de traiter l'ensemble du code de la page, il
faut se méfier des effets néfastes sur le temps de génération des pages.
