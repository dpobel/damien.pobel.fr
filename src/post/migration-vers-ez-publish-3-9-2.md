---
title: "Migration vers eZ Publish 3.9.2"
tags: ez publish, interface, travail, blog
updated: 2007-07-13T07:50:00.000Z
lang: "fr"
node: "65471"
remoteId: "62305a81b8f6e95c42413af0c3b623a9"
published: 2007-05-14T00:52:57+02:00
---
 
Je viens de migrer [ce blog](/) de la version 3.8.3 d'[eZ Publish](/tag/ez+publish) vers [la toute fraîche version 3.9.2 sortie il y'a une dizaine de jours](/post/ez-publish-3-9-2-et-3-8-8-et-quelques-reflexions-sur-ez-publish-juste-apres-l-installation). Rien de très compliqué, il suffit de suivre [la documentation de mise à jour](http://ez.no/doc/ez_publish/upgrading). C'est juste un peu long vu que le site comporte quelque chose comme 65000 objets... Le seul point (à peine) délicat est l'éxécution du script SQL dbupdate-3.8.0-to-3.9.0.sql où il a fallu que je commente les requêtes concernant les versions inférieures à la 3.8.3.

 
L'interface d'administration est maintenant quasiment complètement en français, ça perturbe un peu mes habitudes mais je m'en remettrai :-). Autre changement, je viens de voir en sauvegardant mon brouillon, les &quot;Objets associés&quot; créés automatiquement à partir des liens internes, c'est intéressant comme fonctionnalités. Je vois aussi que les *customs tags* ont maintenant leurs attributs créés et éventuellement pré-remplis, voila un ajout qui améliore nettement l'utilisabilité de cette fonctionnalité que je décrivais dans le cadre de [l'inclusion de vidéo à partir de Dailymotion](/post/inclure-une-video-de-dailymotion-youtube-ou-autre-dans-ez-publish).

 
Pour le reste, c'est une demie découverte, je suis de près le développement d'eZ Publish et j'ai déjà eu l'occasion d'utiliser des version 3.9.x sur divers projets professionnels. Mais je suis sur que je vais voir d'autres petits trucs qui améliorent l'ensemble. Et puis, j'ai envie de m'intéresser de plus près à l'extension ezodf sur l'import/export au format OpenDocument avant éventuellement de faire des changements plus profonds dans le site mais c'est une autre histoire.

