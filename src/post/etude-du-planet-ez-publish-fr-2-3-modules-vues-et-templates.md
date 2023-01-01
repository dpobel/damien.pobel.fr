---
title: "Étude du Planet eZ Publish.fr (2/3) : modules/vues et templates"
tags: ez publish, php, rss, performances, template, javascript, xml, xhtml, ez components
lang: "fr"
node: "67475"
remoteId: "f5b48b2d09057ee0298d9b12fde1f475"
published: 2009-01-27T17:59:00+01:00
updated: 2016-02-11 13:45
---

Suite de la série de billets sur la réalisation du Planet eZ
Publish.fr avec dans celui ci quelques notes
sur les modules/vues spécifiques ainsi que sur la réalisation des templates.


1. [Organisation et Import des articles](/post/etude-du-planet-ez-publish-fr-1-3-organisation-et-import-des-articles)
1. [Modules/vues sur mesure et templates](/post/etude-du-planet-ez-publish-fr-2-3-modules-vues-et-templates)
1. [Performances : caches et compagnie](/post/etude-du-planet-ez-publish-fr-3-3-performances-caches-et-compagnie)


## Modules / vues sur mesure


Pour le moment, seuls deux vues spécifiques sont utilisées sur le site.


### feed/planet


Cette vue sert à générer le flux RSS du
Planet. Comme pour [l'import
RSS](/post/etude-du-planet-ez-publish-fr-1-3-organisation-et-import-des-articles),
[le composant Feed des eZ Components est
utilisé](http://ezcomponents.org/docs/api/trunk/classtrees_Feed.html). L'intérêt
principal par rapport à l'export RSS de base est la possibilité d'ajouter la
balise <code>dc:author</code> avec le nom du site (l'objet parent dans le cas du
Planet). Cette vue implémente également un système de cache sur le même principe
que le cache de
vue. Ce
cache est vidé et est re-généré par le script d'import RSS alors que le cache de
l'export RSS par défaut expire au bout d'un temps fixe.


### planet/search

Cette vue reproduit la vue de recherche par défaut en forçant la recherche dans
une sous-arborescence sans avoir besoin de passer le paramètre
<code>SubTreeArray</code> . Contrairement à
content/search, elle permet également l'utilisation
des *persistent variables* comme sur content/view.

## Templates et opérateur


Les templates pour ce site sont assez classiques et plutôt simples compte tenu
de la charte graphique basique. Seule « astuce », chaque vue *full* fixe deux
entrées dans les *persistent variables* ce qui permet de générer un titre et une
description pertinentes sans aucun <code>fetch</code> supplémentaire dans le
<code>pagelayout</code> qui serait synonyme de requêtes SQL et/ou de cache
supplémentaire à gérer (voir [les dernières lignes du template
planet.tpl](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/design/planete/override/templates/full/planet.tpl)
et [les premières du
pagelayout.tpl](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/design/planete/templates/pagelayout.tpl)
par exemple).


Le seul opérateur spécifique est [l'opérateur
<code>clean_rewrite_xhtml</code>](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/autoloads/planeteutils.php)
utilisé à la place de
l'opérateur <code>[wash]</code>
pour afficher les attributs Text
block
contenant le texte issu des flux RSS. Cet opérateur a plusieurs fonctions :

* rendre valide le code XHTML avec [le module PHP Tidy](http://fr.php.net/tidy)
* réécrire les éventuelles URLs relatives au site (images et liens)
* supprimer toute trace de JavaScript grâce à quelques expressions XPath.

