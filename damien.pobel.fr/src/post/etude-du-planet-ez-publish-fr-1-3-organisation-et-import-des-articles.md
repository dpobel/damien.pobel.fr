---
title: "Étude du Planet eZ Publish.fr (1/3) : organisation et import des articles"
tags: ez publish, php, rss, cms, ez components
updated: 2009-01-28T09:58:46.000Z
lang: "fr"
node: "67462"
remoteId: "abbb81fea764983a17e9db6fed2d7307"
published: 2009-01-27T13:55:00+01:00
---

Cette série de 3 billets présente les principaux points de la conception et de la réalisation du Planet eZ Publish.fr avec [eZ Publish](/tag/ez-publish).Il s'agit d'un site simple à tous les niveaux, mais il concentre tout de même quelques astuces que j'espère intéressantes !


1. [Organisation et Import des articles](/post/etude-du-planet-ez-publish-fr-1-3-organisation-et-import-des-articles)
1. [Modules/vues sur mesure et templates](/post/etude-du-planet-ez-publish-fr-2-3-modules-vues-et-templates)
1. [Performances : caches et compagnie](/post/etude-du-planet-ez-publish-fr-3-3-performances-caches-et-compagnie)


## Organisation


### Classes de contenu

<figure class="object-left"><a href="/images/arborescence-planet-ez-publish-fr.png"><img loading="lazy" src="/images//arborescence-planet-ez-publish-fr.png" alt="Arborescence Planet eZ Publish.fr">
</a></figure>


Pour tout site réalisé avec le CMS eZ Publish, la détermination de l'arborescence ainsi que la définition des classes de contenus est l'étape préliminaire nécessaire. Dans le cas du Planet, le cahier des charges est assez simple, il s'agit d'importer des billets (classe *Post*) de divers blogs (classe *Site*) francophones consacrés à eZ Publish. Je souhaitais aussi pouvoir gérer une liste de Planets, le Planétarium, (classe *Site* également) avec pourquoi pas l'affichage des derniers billets de chaque Planet.


J'ai aussi créé une classe *Planete* qui sert de page d'accueil au Planet actuel. Le but de la création de cette classe est multiple :

* elle permet d'avoir un affichage spécifique sans faire une surcharge sur le node id de la page d'accueil qui peut changer aux grès des évolutions du site
* si un jour je souhaite que la même instance eZ Publish héberge d'autres Planets, le travail sera restreint à la duplication de l'arborescence
* La définition d'une classe spécifique permet également de faciliter l'écriture des règles de vidage de cache dans le fichier <code>viewcache.ini</code>
.

À cela, il faut ajouter les inévitables pages À propos (classe *Page*) et formulaire de contact (classe *Formulaire de contact*) ainsi que la classe *Folder* existante pour des questions d'organisation du contenu et de gestion de cache.


### Arborescence


À partir de cette liste de classes, l'arborescence est assez « évidente ». Le découpage se fait naturellement et en plus il permet de gérer facilement les caches template (<code>cache-block</code>
) en évitant que tous les *blocks* n'expirent avec la racine. Elle est aussi prévue pour faciliter la construction du menu horizontal.


## Import des articles et nettoyage


Contrairement à un site classique, le contenu sur un Planet provient d'autres sites via leur flux RSS. Ma première idée était d'utiliser le mécanisme d'import RSS d'eZ Publish. J'avais commencé par écrire un Content Edit Handler qui, pour chaque objet Site, créait un import RSS utilisé ensuite par le script de cronjob rssimport.php. Mais la fonctionnalité d'import RSS souffre de plusieurs limitations / bugs gênants :

* mauvaise utilisation du guid/link pour générer le remote id
* le script rssimport.php ne met pas à jour les articles importés
* le format Atom n'est pas supporté
* les modules courants du format RSS ne sont pas non plus pris en compte (Dublin Core, Content,…)

Le script rssimport.php me semble par ailleurs assez mal écrit, du coup, j'ai choisi d'en écrire [un autre](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/cronjobs/rssimport_planete.php) quasiment *from scratch* basé sur [le composant Feed des eZ Components](http://ezcomponents.org/docs/api/trunk/classtrees_Feed.html) et le *mapping* entre champs du flux et champs des objets *Post* est fait dans [un simple fichier de configuration](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/settings/planete.ini.append.php).


Parallèlement au script d'import RSS, j'ai aussi écrit [un script de nettoyage des articles](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/cronjobs/cleanup_planetarium.php) issus des Planets puisque seuls les 5 derniers de chaque source sont liés sur la page Planétarium, autant ne pas encombrer la base pour rien.

