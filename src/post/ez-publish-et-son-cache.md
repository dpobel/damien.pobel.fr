---
title: eZ publish et son cache
tags: pense bête, ez publish, blog, performances
updated: 2009-01-12T17:46:20.000Z
lang: fr
node: 56973
remoteId: 264827f496485cfdb12d1242b19e9f32
published: 2006-08-29T23:09:48+02:00
---

En publiant mon précédent billet [L'électronique et l'environnement](/post/l-electronique-et-l-environnement), je me suis rendu compte que la liste des deniers billets sur [la page d'accueil de ce site]() n'était pas mise à jour. Ce petit problème vient en fait [du cache ou plutôt des caches d'eZ publish](http://ez.no/community/articles/ez_publish_performance_best_practices/specification). Ce cache permet à ce CMS de &quot;distribuer&quot; ces pages très rapidement une fois que ce cache a été généré. eZ publish dispose de plusieurs niveaux de cache et une fois combinés, [les pages s'affichent rapidement sans demander beaucoup de ressources](http://ez.no/community/articles/server_architecture_for_ez_publish_hosting/test_results). En contre partie, par défaut certaines parties du site ne sont pas mises à jour &quot;en temps&quot; réel ce qui est un comble pour un site dynamique.


Heureusement pour remédier à ce problème, il est possible de configurer la manière dont eZ publish vide son cache grâce à la fonctionnalité **SmartCacheClear**. Par défaut lors de la publication ou la modification d'un objet dans eZ publish les caches associés à cet objet et à celui de ses parents directs sont vidés. Mais, si comme sur ce site, une autre page utilise ces nouvelles données il faut en informer le CMS.


Cette opération se fait dans le fichier de configuration **settings/viewcache.ini** et pour plus de facilité il vaut mieux ne modifier (ou créer que les fichiers *.append.php). Voici donc un extrait de mon fichier settings/override/viewcache.ini.append.php :

``` ini
[ViewCacheSettings]
SmartCacheClear=enabled

[weblog]
DependentClassIdentifier[]
DependentClassIdentifier[]=folder
MaxParents=3
ClearCacheMethod[]
ClearCacheMethod[]=object
ClearCacheMethod[]=parent
```


Ces quelques lignes indiquent au moteur d'eZ publish que lorsqu'un objet de la classe *weblog* est publié (ou modifié), il doit vider le cache des objets de classe *folder* en remontant de 3 niveaux maximum en plus des caches de l'objet publié et de celui de ses noeuds parents. Pour plus de détails/options, il faut se reporter aux commentaires du site settings/viewcache.ini en attendant que [ce fichier de configuration soit documenté](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/viewcache_ini) sur le site officiel.


Et voila, ma page d'accueil est enfin mise à jour lors de la publication de ce billet :)

