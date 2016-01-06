---
title: "Roadmap eZ Publish mise à jour"
tags: ez publish, performances, javascript, interface
lang: "fr"
node: "67836"
remoteId: "289bfb5298ce45bfb5c30ebaba2d3992"
published: 2009-06-18T21:35:13+02:00
---

Je viens de voir un peu par hasard *via*[un post sur le forum](http://ez.no/developer/forum/suggestions/ez_components_templating_engine) que [la roadmap d'eZ Publish](http://ez.no/ezpublish/roadmap) a été mise à jour (le 12 juin apparemment) avec les nouveautés pour les deux prochaines versions majeures (4.2 et 4.3). Deux grosses tendances se dessinent dans cette roadmap : [les performances](/post/les-performances-d-ez-publish) (mode classique comme en cluster, ou avec [un nouveau mode cluster mixant base de données et NFS](http://pubsvn.ez.no/websvn2/filedetails.php?repname=nextgen&amp;path=%2Ftrunk%2Fdoc%2Fspecifications%2Ftrunk%2Fdb_nfs_cluster_handler%2Fdbnfsclusterhandler.txt) qui est déjà dans le SVN) et les interfaces utilisateurs avec surtout un *redesign* de l'interface d'administration pour la version 4.3 prévue pour tout début 2010 !


Avec cette dernière nouveauté, Gandbox peut espérer rayer [une partie de sa whishlist](http://www.gandbox.fr/Blogs/Technologies-Web/Ma-Wish-list-pour-eZ-Publish#eztoc17571_3) et demander autre chose pour Noël :p Personnellement, j'aimerais bien que ce soit l'occasion de choisir un framework JavaScript intégré à [eZ Publish](/tag/ez+publish) (<abbr title="Yahoo! User Interface">YUI</abbr>  !) comme cela avait déjà été évoqué lors [du dernier eZ Publish Community Day](http://www.ez-france.org/Actualites/eZ-Publish-Community) ; ce choix permettrait d'éviter que chaque extension embarque une partie du framework favori de son auteur et oblige à télécharger 500ko de javascript par page avec 3 extensions activées ! Dans le même esprit, l'application des [Yahoo! Best Practices](http://developer.yahoo.com/performance/rules.html) dans ce *redesign* permettrait d'améliorer un peu la réactivité du *backoffice* ce qui est un point clef de l'expérience utilisateur de ce type d'interface.

