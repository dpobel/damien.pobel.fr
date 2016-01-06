---
title: "eZ developer day à Paris le 17/04/2008"
tags: ez publish, ez components, cms, travail, online editor, ez find, linux, logiciels libres, php, web
updated: 2008-08-21T12:44:19.000Z
lang: "fr"
node: "66792"
remoteId: "2718ae8f7ae1cf6fb603fe66d97228b2"
published: 2008-04-26T20:38:59+02:00
---

Voici un compte rendu du eZ developer day du 17/04/2008 qui s'est déroulé dans les locaux de Sun Microsystems réunissant une cinquantaine de développeurs intéressé par le CMS [eZ Publish](/tag/ez+publish). Nous avons tout d'abord eu droit à une première présentation de la stratégie &quot;Open Source&quot; de Sun. Rien de très intéressant techniquement parlant, si ce n'est quelques fonctionnalités avancées d'[Open Solaris](http://opensolaris.org/os/) comme le système de fichiers [ZFS](http://opensolaris.org/os/community/zfs/) ou la solution de virtualisation et une volonté affichée avec l'ouverture de Solaris de concurrencer les distributions Linux autant au niveau professionnel avec des niveaux de support avancés qu'au niveau communautaire.


La suite était heureusement nettement plus intéressante. Comme en [octobre dernier](/post/ez-publish-developer-day-a-paris-le-31-10-2007) Paul Borgermans nous a présenté la roadmap des différents produits eZ (eZ Publish, [eZ Components](/tag/ez+components), eZ Flow, [eZ Find](/tag/ez+find), ...). Le moins qu'on puisse dire est que de grosses évolutions voire des révolutions sont en marche au moins au niveau d'eZ Publish.


## La version 4.1 d'eZ Publish


Cette version devrait voir apparaître le très attendu [Online Editor basé sur TinyMCE](/post/the-new-online-editor-for-ez-publish-beta) bien plus configurable et souple que l'actuel. La compatibilité avec l'existant sera assuré de manière transparente. Cette version verra aussi le retour de la compatibilité avec Oracle, le support de Solaris 10 ou encore une fonctionnalité d'expiration des mots de passe développé par un partenaire.


Une extension fournissant un flash permettant l'upload massif sera également fournie. La démonstration était vraiment bluffante, ce sera une alternative très intéressante au [WebDAV](http://fr.wikipedia.org/wiki/Webdav), protocole qui manque cruellement de client fiable en particulier sous Windows.


## La version 4.5 d'eZ Publish


Cette version verra beaucoup de changements internes selon 2 axes principaux

* L'intégration des eZ Components
* L'amélioration de performances


Le second étant en partie remplie par le premier. en vrac les nouveautés annoncées sont les suivantes :

* allègement du code kernel en déplaçant plusieurs fonctionnalités dans des extensions permettant leur activation/désactivation simplement
* nouveau système de template et donc de surcharge (override) bien plus performant. Paul citait un exemple d'un *template complexe qui s'éxécute 20 fois plus rapidement avec le nouveau système* !
* amélioration du système de cache pour le rendre plus granulaire. Une possible implémentation de la norme [ESI (Edge Side Includes)](http://en.wikipedia.org/wiki/Edge_Side_Includes) a également été évoquée pour être compatible avec [Akamaï](http://www.akamai.com/html/support/esi.html) ou [le reverse proxy Varnish](http://varnish.projects.linpro.no/).
* support de IIS avec PHP en mode FastCGI ainsi que de MS SQL. D'autres SGBD pourrait également être supporté l'écriture de la couche d'interface nécessaire
* introduction des &quot;object states&quot; personnalisables permettant de brancher facilement l'exécution d'un processus de workflow externe
* refonte du fichier [index.php](http://pubsvn.ez.no/websvn2/filedetails.php?repname=nextgen&amp;path=%2Ftrunk%2Findex.php&amp;sc=1) dans le but de l'alléger et de le rendre plus performant mais aussi de pouvoir y brancher l'exécution d'un script sans passer par toute la pile d'eZ Publish lorsque le besoin de performances est important
* réécriture du système multi-lingue et des URL alias car le code est actuel est complexe et [est basé sur des opérations bit à bit en base de données](http://ez.no/doc/ez_publish/technical_manual/4_0/features/multi_language/the_bit_field_algorithm) ce qui compromet la portabilité sur différent SGBD
* &quot;dé-normalisation&quot; de la base de données, en particulier dans un premier temps la gestion des utilisateurs permettant de supporter plus d'utilisateurs. La &quot;dé-normalisation&quot; au niveau des contenus a également été abordée mais reste pour le moment un projet à plus long terme...

ouf ! voila déjà une belle et ambitieuse liste rien que pour eZ Publish ! Cette version devrait paraître avant la fin de l'année.


## eZ Find, eZ Flow, eZ Components


eZ Find 1.1 apportera [la recherche par facets](http://en.wikipedia.org/wiki/Faceted_classification) dans le courant du second trimestre 2008. La version 2.0 sera une réécriture complète via le composant [Search](http://svn.ez.no/svn/ezcomponents/trunk/Search/) des eZ Components de manière à profiter de l'ensemble des fonctionnalités de [Solr](http://lucene.apache.org/solr/).


De nouvelles version d'eZ Flow et d'eZ Components sont annoncées pour la [eZ conférence en Norvège au mois de juin](http://conference.ez.no/). Enfin, eZ Flow 2.0 est également annoncée pour la fin de l'année.


## BarCamp !


L'après midi s'est terminé par un barcamp axé sur les questions apportées par les différents participants. Chacun a pu échanger sur ses &quot;recettes de cuisine&quot; eZ Publish, je retiens plusieurs points très en vrac :

* PHP 5.3 apporte des gains significatifs de consomation mémoire
* Le mode cluster d'eZ Publish pose souvent problème (d'où les améliorations annoncées). Des solutions de contournements ont été mises en place par plusieurs prestataires.
* La gestion des utilisateurs est parfois problématique (volume, synchronisation LDAP, ...), là aussi des améliorations sont en cours.
* Enfin au niveau du volume de contenus possibles dans eZ Publish, Paul explique qu'avec du bon matériel eZ Publish est capable *de gèrer un million de contenus sans vrai problème* même si c'est dépendant de l'organisation de l'aborescence.

Bon au final, mon sentiment sur cette après midi fort instructive est que le développement d'eZ Publish tente de combler les lacunes au niveau des (très) gros sites autant en terme de volume qu'en terme de performances.

