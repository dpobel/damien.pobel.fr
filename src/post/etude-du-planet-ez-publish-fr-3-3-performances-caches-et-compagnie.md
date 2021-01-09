---
title: "Étude du Planet eZ Publish.fr (3/3) : performances, caches et compagnie"
tags: ez publish, performances, yahoo, dedibox, http, php
updated: 2009-01-27T20:58:34.000Z
lang: "fr"
node: "67476"
remoteId: "c31f9208fde0d24818a826b83d37953e"
published: 2009-01-27T23:09:00+01:00
---

Suite et fin de la série d'articles sur la réalisation du Planet eZ Publish.fr avec les questions de performances et de caches.


I. [Organisation et Import des articles](/post/etude-du-planet-ez-publish-fr-1-3-organisation-et-import-des-articles)

II. [Modules/vues sur mesure et templates](/post/etude-du-planet-ez-publish-fr-2-3-modules-vues-et-templates)

III. [Performances : caches et compagnie](/post/etude-du-planet-ez-publish-fr-3-3-performances-caches-et-compagnie)


## Performances


### Cache de vue et cache-block

<figure class="object-center"><a href="/images/schema-cache-planet-ez-publish-fr.png"><img loading="lazy" src="/images/660x/schema-cache-planet-ez-publish-fr.png" alt="Schéma cache Planet eZ Publish.fr">
</a></figure>


La gestion des caches «&nbsp;standards&nbsp;» est un point important pour les
performances. La vue *full* (zone entourée de jaune dans la capture d'écran
ci-dessus) est assez logiquement l'affichage de la liste des articles, elle est
automatiquement mise en cache ([cache de
vue](http://ez.no/doc/ez_publish/technical_manual/4_0/features/view_caching) ou
cache de contenu). Pour que la page d'accueil et les pages Blogs et Planétarium
soient à jour sans opération manuelle, il m'a fallu ajouter [deux règles dans
une surcharge du fichier
<code>viewcache.ini</code>](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/settings/override/viewcache.ini.append.php)
pour que le cache de vue soit vidé lors de l'ajout d'un objet de la classe
*Post* ou de la classe *Site*.


Les menus (menu horizontal, liste des blogs, liste des planets) sont chacun
entourés d'[une instruction
<code>cache-block</code>](http://ez.no/doc/ez_publish/technical_manual/4_0/reference/template_functions/miscellaneous/cache_block)
(cadres rouge) expirant avec la partie de l'arborescence qu'ils affichent. Et
pour aller encore un peu plus loin, chaque article est lui-même individuellement
mis en cache par un <code>cache-block</code> . Cela permet de limiter le nombre
de requêtes SQL nécessaires à la re-génération de la vue *full* lors de l'ajout
ou de la mise à jour d'un article ainsi que sur l'affichage des résultats de
recherche.


### Cache statique


Compte tenu du faible nombre de pages, j'ai choisi d'ajouter [du cache
statique](http://ez.no/developer/articles/ez_publish_performance_optimization_part_3_of_3_practical_cache_and_template_solutions/static_cache)
en plus des caches classiques sur l'ensemble du site. Une des limitations du cache statique est l'impossibilité de pré-générer les
pages avec paramètres (par exemple <code>/page/(offset)/10</code>), pour éviter
ce problème, j'ai ajouté les pages principales (avec ou sans paramètres) dans
les URLs à générer systématiquement. Ainsi à la moindre modification de contenu,
le script de cronjob <code>staticcache_cleanup.php</code> génère la quinzaine de
pages du site. Ce qui a aussi l'avantage de pré-générer les zones en cache
détaillées précédemment pour les résultats de recherche par exemple.


### Optimisations côté navigateur

Le temps de génération (ou de distribution) des pages n'est qu'une petite partie
du temps total d'affichage de la page. Les [Yahoo! Performances
Rules](http://developer.yahoo.com/performance/rules.html) ou [le livre High
Performances Web Sites](/post/livre-high-performances-web-sites) listent les
principales recommandations pour améliorer ce point.


Planet eZ Publish.fr est hébergé sur [ma Dédibox](/post/ez-publish-sur-dedibox),
[la configuration des entêtes
d'expiration](/post/optimiser-son-site-sous-ubuntu-configurer-l-en-tete-expires)
et [de la compression GZip des éléments
textuels](/post/optimiser-son-site-sous-ubuntu-et-ailleurs-compresser-avec-gzip)
sont effectifs. La charte graphique simple a également simplifiée la mise en
place de [la technique CSS Sprites pour limiter le nombre de requêtes
HTTP](/post/optimiser-son-site-limiter-le-nombre-de-requetes-http) nécessaire à
l'affichage d'une page. Tout ceci donne un beau *Performance Grade A(97) dans
YSlow*.

