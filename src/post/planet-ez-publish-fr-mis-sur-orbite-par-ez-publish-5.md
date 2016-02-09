---
title: "Planet eZ Publish.fr mis sur orbite par eZ Publish 5!"
tags: symfony 2, ez publish 5, ez publish, php, twig, performances, git
updated: 2012-12-13T11:06:59.000Z
lang: "fr"
node: "69820"
remoteId: "edb15bfe7f97834b76478ab34821c0a9"
published: 2012-12-13T12:05:50+01:00
---

([English version available on share.ez.no](http://share.ez.no/blogs/damien-pobel/planet-ez-publish.fr-orbited-by-ez-publish-5))


Comme annoncé via [Twitter](https://twitter.com/dpobel/status/276627335921414144) et [Google+](https://plus.google.com/102664237253121682993/posts/8hm2tSo9NUC) il y a une semaine, [le Planet eZ Publish.fr](http://www.planet-ezpublish.fr/) est dorénavant mis sur orbite par [eZ Publish 5](http://ez.no/fr/Produits/eZ-Publish-5-Platform) (en réalité des *clones* github du 04/12/2012 soit quelque part entre la version 5.0 et [les futures 2012.11/2012.12](http://share.ez.no/downloads/downloads)). Pour autant que je sache, il s'agit du premier site utilisant eZ Publish 5 ou au moins qui ne se contente pas d'utiliser le *fallback* sur la partie legacy (ie eZ Publish 4.x). En effet, j'ai tenté de ré-implémenter au maximum le site dans la nouvelle pile basée sur Symfony 2. L'ensemble du code source est disponible dans [le dépôt git dpobel/planet-ezpublish.fr](https://github.com/dpobel/planet-ezpublish.fr), pour les curieux les éléments dignes d'intérêt se situent dans le [PlanetBundle](https://github.com/dpobel/planet-ezpublish.fr/tree/master/planet/src/Planet/PlanetBundle) et dans les fichiers de configuration [ezpublish.yml](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/ezpublish/config/ezpublish.yml), [override.yml](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/ezpublish/config/override.yml) et [parameters.yml](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/ezpublish/config/parameters.yml).


## Nouvelle stack vs. legacy


Au final, il reste 3 fonctionnalités basées sur la partie *legacy* :

* Le formulaire de [contact](http://www.planet-ezpublish.fr/contact), les attributs collecteur d'information n'étant pas pris en charge pour le moment
* [Le moteur de recherche](http://www.planet-ezpublish.fr/planet/search), là encore l'intégration de Solr est incomplete
* [Un script de nettoyage](https://github.com/dpobel/planet-ezpublish.fr/blob/master/legacy/extensions/planete/cronjobs/cleanup_planetarium.php) de la partie planétarium, pour ce dernier point, j'avoue que c'est par pure flemme :-)

À l'inverse, le reste du site n'utilise que les nouvelles API et le moteur de template [Twig](http://twig.sensiolabs.org/):

* [Les différentes vues](https://github.com/dpobel/planet-ezpublish.fr/tree/master/planet/src/Planet/PlanetBundle/Resources/views/full)des contenus ([règles d'override](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/ezpublish/config/override.yml))
* Le flux RSS sur mesure est [une simple action d'un contrôleur](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/Controller/PlanetController.php#L283) derrière [la route adhoc](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/Resources/config/routing.yml)
* [Le script d'import](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/Command/ImportCommand.php) utilise l'API publique pour créer et mettre à jour les contenus à partir des flux RSS

## Bugs et difficultés diverses


Sans surprise, il y a quelques bugs dans cette nouvelle version; pour une version majeure en point 0, le contraire aurait été très étonnant, mais il y a aussi des manques plus globaux.


D'une manière générale, [l'API publique](http://apidoc.ez.no/) est très verbeuse. J'ai publié [un gist](https://gist.github.com/3983418) qui compare le code nécessaire pour récupérer une liste de nœuds triée par priorité dans l'ancienne et la nouvelle API. Je crois que le constat est assez clair. Pour éviter de répéter encore et encore, les mêmes bouts de code, j'ai [2 méthodes utilitaires dans une surcharge du Location service](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/Repository/LocationService.php#L36). Avec le recul, ce n'est probablement pas la meilleure manière de faire, mais en tout cas, cette petite addition m'évite de me répéter.

 

Les templates eZ Publish 5 sont radicalement différents des templates eZ Publish 4.x. Et c'est pas uniquement une question de langage. Le point le plus impactant est la disparition de [nos bonnes vieilles fonctions *fetch*](http://doc.ez.no/eZ-Publish/Technical-manual/4.x/Reference/Template-fetch-functions). Il s'agit d'une excellente chose en terme d'architecture technique mais en l'état elle complexifie un peu l'écriture de template. Il est en effet assez rare de pouvoir se contenter du contenu et de l'emplacement de ce contenu pour générer la vue d'objet. Dans ce cas, une solution est d'appeler dans une sous requête une action d'un *controller custom* (voir par exemple [la vue full correspondant à la page d'accueil](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/Resources/views/full/planet.html.twig#L18)). Une autre solution consiste à utiliser [l'évènement <code>ezpublish.pre_content_view</code>](https://confluence.ez.no/display/EZP/Events) mais cet évènement est générique ce qui oblige à détecter d'une manière ou d'une autre dans quel cas l'évènement est lancé ce qui n'est pas forcément évident ([voir par exemple PlanetBundle/EventListener/PreContentViewListener.php](https://github.com/dpobel/planet-ezpublish.fr/blob/master/planet/src/Planet/PlanetBundle/EventListener/PreContentViewListener.php#L28)). Bref, pour moi il manque quelque chose ici qui permette de facilement injecter des paramètres dans les templates de vue.


En tant qu'ancien intégrateur, j'espère qu'on pourra remédier à ces deux points pour rendre le au jour le jour développement un peu plus facile.


## Performances


Qu'en est il des performances ? Contrasté est probablement le terme le plus adapté. En effet, sur un site sans identification et peu d'évolution dans le contenu, il est relativement facile de maximiser l'utilisation du cache HTTP et de finalement atteindre les performances [du reverse proxy Symfony 2](http://symfony.com/fr/doc/master/book/http_cache.html). Dans ce cas eZ Publish 5 est assez nettement supérieur à eZ Publish 4.x qui servirait une page complètement cachée et optimisée (*cache-block + viewcache*)! Si, le reverse proxy de Symfony se révèle trop lent, il est bien sûr possible de le remplacer par un reverse proxy dédié; dans ce domaine [Varnish](https://www.varnish-cache.org/) est un candidat de choix qui apportera de bien meilleures performances encore!


En revanche, lorsque des parties de la page doivent être recalculées, les performances s'effondrent rapidement. [Un chantier est en cours](https://github.com/ezsystems/ezpublish-kernel/pull/191) pour améliorer les performances des API et cela devrait durer quelques temps.


## Conclusion


**ÇA FONCTIONNE!** À vrai dire plutôt mieux que je ne l'aurai cru il y a quelques mois! Bien sûr il reste bien des bugs à corriger et des choses à améliorer, mais clairement eZ Publish 5 est utilisables dans pas mal de cas et pour tout le reste il y a le *legacy fallback* :-)

