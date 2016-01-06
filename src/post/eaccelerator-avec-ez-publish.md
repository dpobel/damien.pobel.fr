---
title: "eAccelerator avec eZ Publish"
tags: ez publish, hébergement, mysql, cms, dedibox, google, php, performances
updated: 2009-01-12T18:02:37.000Z
lang: "fr"
node: "64645"
remoteId: "26cc3333009ac66bc2ff35c5b7824e9b"
published: 2007-02-24T13:35:02+01:00
---

L'optimisation et les performances d'[eZ Publish](/tag/ez+publish) sont des sujets qui reviennent [assez régulièrement sur les forums](http://ez.no/community/forum/general/ez_publish_performance_optimisation_faq) et pas mal d'articles ont été publiés sur ces sujets dont [une série récemment sur le site ez.no](http://ez.no/community/articles/ez_publish_performance_optimization_part_3_of_3_practical_cache_and_template_solutions) car Il faut avouer qu'eZ Publish est plutôt gourmand en ressources et qu'il faut une (des) machine(s) robustes pour en tirer parti sur des sites à fort trafic.


L'installation d'un cache d'[opcode](http://fr.wikipedia.org/wiki/Opcode) est probablement l'optimisation la plus efficace, la plus simple à mettre en oeuvre et celle qui impactera quasiment tous les secteurs d'utilisation d'eZ Publish puisqu'elle intervient au niveau de l'interprétation du code PHP. Personnellement, j'utilise [eAccelerator](http://www.eaccelerator.net/) qui semble [un peu plus efficace qu'APC](http://www.ipersec.com/index.php?q=en/bench_ea_vs_apc). Il faut veiller à bien le configurer pour qu'il ait suffisamment de mémoire partagée sous peine de voir apparaître des pages blanches sans explication. Ma configuration d'eAccelerator est la suivante :

``` ini
extension=eaccelerator.so
eaccelerator.shm_size="48"
eaccelerator.cache_dir="/var/cache/eaccelerator"
eaccelerator.enable="1"
eaccelerator.optimizer="1"
eaccelerator.check_mtime="1"
eaccelerator.debug="0"
eaccelerator.filter=""
eaccelerator.shm_max="0"
eaccelerator.shm_ttl="0"
eaccelerator.shm_prune_period="0"
eaccelerator.shm_only="0"
eaccelerator.compress="0"
```

<figure class="object-left"><a href="/images/temps-de-reponse-pour-googlebot.png">![Temps de réponse pour Googlebot](/images//temps-de-reponse-pour-googlebot.png)
</a></figure>


Les [outils pour webmaster de Google](http://www.google.com/webmasters/sitemaps/?hl=fr) fournissent quelques graphiques indiquant comment Googlebot indexe un site. Ci-contre voici le graphique remanié par mes soins pour mon site donnant les temps de téléchargement des pages. Ce n'est certe pas très précis et plusieurs facteurs interviennent dans les temps de réponses comme l'horaire et les interventions que je peux réaliser sur le site mais ça donne une bonne idée de la tendance.


Le trait orange correspond au moment ou [mes photos](http://photos.pwet.fr) ont été référencées [dans Google Image](http://images.google.fr/images?hl=fr&amp;q=site:pwet.fr&amp;btnG=Recherche%20d) multipliant le nombre de pages vues sur mon site par 1.5 (6500 le 15 janvier, 10400 le 12 février)! Le trait vert correspond à l'installation d'eAccelerator. Je crois que le graphique parle de lui-même. Je n'ai pas de graphique de la charge de la machine, mais là aussi c'est flagrant lors de l'utilisation du shell...


J'ai récemment, fait quelques autres optimisations dans les *templates* en ajoutant quelques [cache-block](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_functions/miscellaneous/cache_block) pour avoir une gestion plus fine du cache et je compte aussi aussi regarder du côté de [l'optimisation de MySQL en lecture](http://ez.no/community/articles/tuning_mysql_for_ez_publish/optimizing_for_read_performance) pour voir si je peux améliorer encore un peu les performances.

