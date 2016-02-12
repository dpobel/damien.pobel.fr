---
title: "Comparaison de performances entre eZ Publish 4.0.1 et 4.1"
tags: ez publish, php, mysql, ez components, dedibox, performances
lang: "fr"
node: "67727"
remoteId: "3dd253bb6febb9a951ba5661a341829f"
published: 2009-04-01T23:54:37+02:00
updated: 2016-02-12 09:49
photos:
    - images/comparaison-ez-publish-4-0-1-et-ez-publish-4-1.png
---

C'est la saison des benchmarks autour d'[eZ Publish](/tag/ez-publish) :)
Bertrand a fait une intéressante comparaison entre le mode cluster et le mode
*classique* (page disparue...),
suivi de près par [un article sur ez.no mettant en évidence le gain apporté par
le fameux Stale
Cache](http://ez.no/developer/articles/ez_publish_knowledge_series_stale_cache_or_how_caches_in_ez_publish_4_1_are_handled_in_a_smarter_way)
dans la génération du cache de contenu. De mon côté, j'ai adapté les scripts de
[mon benchmark entre eZ Publish 3.10 et eZ Publish
4](/post/benchmark-between-ez-publish-4-and-ez-publish-3-10-with-or-without-a-php-opcode-cache)
pour comparer cette fois uniquement les performances sur une page en cache de ce
site (/blog) avec eZ Publish 4.0.1, eZ Publish 4.1 sans optimisation et eZ
Publish 4.1 avec [un fichier
config.php](https://github.com/ezsystems/ezpublish-legacy/blob/master/config.php-RECOMMENDED) ; le but
étant de déterminer le gain apporté par les différentes améliorations de
performances pour un site sur un seul serveur.


## Informations techniques

* Serveur : une Dedibox v1 ancienne génération (processeur Via C7 à 2Ghz avec 1Go de RAM)
* Logiciels : Apache 2.2.8, PHP 5.2.4 avec le module xcache, MySQL 5.0.51
* Caractéristique de la page&nbsp;: la page fait les 3 requêtes SQL minimum (session, [chargement des langues](http://issues.ez.no/14227) et détermination de la page concernée)
* Test&nbsp;: plusieurs séries de 500 requêtes avec un concurrence de 2 réalisées avec l'utilitaire [ab](http://pwet.fr/man/linux/administration_systeme/ab) sur chacune des installations

Le fichier config.php :

``` php
<?php
define( 'EZP_USE_BUNDLED_COMPONENTS', true );
define( 'EZP_INI_FILEMTIME_CHECK', false );
?>

```

## Résultats

<figure class="object-center"><a href="/images/comparaison-ez-publish-4-0-1-et-ez-publish-4-1.png">![Comparaison eZ Publish 4.0.1 et eZ Publish 4.1](/images//comparaison-ez-publish-4-0-1-et-ez-publish-4-1.png)
</a></figure>


Le résultat est plutôt spectaculaire. La simple mise à jour en 4.1 donne **un
gain de presque 30%** dans la distribution d'une page en cache ! Avec la
configuration ci-dessus dans le fichier config.php le gain est **même de 50%** !
Pendant les phases de tests, j'ai également constaté que [la charge de la
machine](/post/load-average-ou-charge-d-une-machine-unix-linux) est bien plus
faible. Comme d'habitude ces chiffres sont à prendre avec des pincettes, ils
représentent le gain sur un site bien optimisé (enfin j'espère) sur un serveur
bas de gamme. Un test sur un serveur plus haut de gamme serait vraiment
intéressant.
