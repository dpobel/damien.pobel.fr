---
title: "eZ Publish developer day à Paris le 31/10/2007"
tags: ez publish, iis, ez components, cms, interface, travail, php
lang: "fr"
node: "66433"
remoteId: "89db68f12d680fe8a25651229a886cce"
published: 2007-11-01T19:43:51+01:00
updated: 2016-02-10 22:15
---

Hier s'est déroulé le premier eZ Publish developer day à Paris
(ez.no/fr/developer/news/developer_event_in_paris_on_31st_october_2007, page
hors ligne depuis).  Cet évènement était organisé par eZ Systems France en marge
de la journée partenaires. À l'inverse de la rencontre partenaires, cet
évènement était orienté technique et fut très riche (suffit de voir la longueur
de ce billet :))

La première surprise fut l'audience puisque nous étions une bonne cinquantaine !
Même si comme le dit Roland Benedetti (Managing Director eZ Systems France),
&quot;*il se passe quelque chose au niveau d'eZ Publish en France*&quot; une
telle audience fut une surprise pour tout le monde. Ayant une intervention de
prévue en fin d'après midi, c'était aussi un peu de challenge en plus pour moi
:-) Il est aussi agréable de pouvoir mettre un visage sur différents noms
rencontrés par mail, sur les forums ou via [mon blog](/).


Pendant la première partie de l'après midi, nous avons donc pu écouter [Paul
Borgermans](http://walhalla.wordpress.com/) responsable du eZ Labs (la partie
R&amp;D d'eZ Systems) nous présenter les orientations et les nouveautés
techniques autour d'[eZ Publish 4](/tag/ez-publish) et des extensions.


## eZ Publish 4


Une version beta devrait sortir d'ici quelques jours alors que la version finale
est attendue pour novembre 2007. [Comme prévu, la version
4.0](/post/ez-publish-4-alpha-1-et-beaucoup-d-autres-choses) sera un portage de
la version 3.10 avec la possibilité d'utilisé les [eZ
Components](http://ezcomponents.org) dans les extensions.


Une version 4.x devrait sortir en début d'année 2008 qui devrait, elle, apporter
beaucoup de nouveautés avec l'intégration réelle de certains *Components* comme
[Database](http://ezcomponents.org/docs/tutorials/Database),
[Template](http://ezcomponents.org/docs/tutorials/Template)
et peut être
[Workflow](http://ezcomponents.org/docs/tutorials/Workflow),
[Authentication](http://ezcomponents.org/docs/tutorials/Authentication)
ou [Persistent
Object](http://ezcomponents.org/docs/tutorials/PersistentObject).
Cette version obligera donc à modifier les *templates*. L'ancien système de
*template* sera abandonné mais pour faciliter la transition, un utilitaire
devrait être fournit pour transformer les templates conçus avec l'ancienne
syntaxe vers la nouvelle. Cet utilitaire devrait normalement être capable de
transformer 80 à 90% des *templates* sans problème. Paul assure aussi qu'une
priorité du développement est l'amélioration de performances ! À noter que le x
de 4.x sera fonction du degré de rupture par rapport à la version 4.0.


Une autre priorité sera la sortie de produits mieux testés, pour cela, l'équipe
d'eZ Labs a semble t il mis au point un système de tests poussés basé sur
[Buildbot](http://buildbot.net/trac) et
[Selenium](http://docs.seleniumhq.org/).

Enfin, Paul nous a confié quelques orientations futures sur le développement,
j'ai retenu en vrac :

* l'amélioration [du mode
  Cluster](http://ez.no/doc/ez_publish/technical_manual/3_10/features/clustering)
  pour permettre l'utilisation de plus de SGBD et permettre le stockage de
  données à différents endroits selon leur type (DB, serveur NAS,…)
* le support de plus de système de base de données (MSSQL, Oracle, DB2,…)
  grâce au composant Database. Ce point vient un peu contredire l'article de
  Clever Age que je mentionnais [dans un précédent
  billet](/post/ez-publish-4-alpha-1-et-beaucoup-d-autres-choses) ce qui est une
  bonne chose.
* le support d'autres serveurs HTTP comme IIS/PHP CGI et éventuellement de
  [Lighthttpd](http://www.lighttpd.net/)
* une amélioration du système de droit avec la possibilité de fixer des droits
  aux niveaux des champs&nbsp;!

eZ Publish va donc énormément évolué dans les mois qui viennent, le passage à
PHP5 est à la fois une épreuve et une opportunité pour les développeurs.


## Extensions eZ Find et eZ Flow


Paul nous a aussi présenter les nouveautés à venir d'[eZ
Find](https://doc.ez.no/Extensions/eZ-Publish-extensions/eZ-Find), l'extension de recherche pour eZ Publish basé sur
[le projet Solr](http://lucene.apache.org/solr/). Une nouvelle version stable
(1.1) est attendue pour le mois de novembre avec le support &quot;basique&quot;
des &quot;facets&quot;. Les &quot;facets&quot; sont en fait des propositions
automatiques faites à l'internautes permettant de raffiner sa recherche. La
plupart des sites de e-commerces proposent cette solution (par exemple
[rechercher &quot;nikon&quot; sur la
FNAC](http://www3.fnac.com/search/quick.do?text=nikon&amp;category=all))


Bertrand Maugain nous a aussi fait une démonstration de l'extension eZ Flow, une
nouvelle extension qui devrait sortir dans les semaines qui viennent. Il s'agit
semble t il d'une surcouche du front site editing qui ajoute des fonctionnalités
de paramètrage (ordre, type de template,…) et le tout soupoudré d'AJAX.
Vraiment très impressionnant. J'aurai le temps d'en reparler quand ce sera
sorti.


## Le portage des extensions vers eZ Publish 4


Paul a également fait une courte intervention sur le portage des extensions vers
eZ Publish 4. Dans la plupart des cas, ce sera relativement simple et les points
à surveiller sont les suivants :

* les fonctions sur les chaînes de caractères doivent être compatibles avec
  l'UTF-8 puisque ce sera l'encodage d'eZ Publish
* les objets sont passés par défaut par référence en PHP5, il faudra donc
  éliminer du code les retours par références
* l'ensemble des constantes seront maintenant des constantes de classes de
  manière à utiliser le système d'autoload
* le système d'autoload permettra d'éviter les `require_once` et `include_once`, il
  faudra par contre régénérer un tableau de cache (permettant d'obtenir des
  performances correctes) à chaque ajout d'extension.
* les méthodes ne pourront plus être à la fois appelées de manière static ou
  non.

## Retour d'expériences et solutions pour sites à fort trafic avec eZ Publish


Enfin l'après midi s'est terminé par ma présentation sur quelques expériences et
solutions mises en place dans le cadre de mon travail sur des sites à plus ou
moins fort trafic. J'ai d'abord fait quelques rappels sur les performances *out
of the box* d'eZ Publish avant d'examiner quelques solutions mises en place pour
aller plus loin :

* cache statique
* mode cluster
* génération statique sur mesure récemment mise en place sur un site d'actualités.

Cette journée a vraiment été très instructive et intéressante mais trop courte.
Je regrette d'avoir du partir aussi précipitamment, certaines discussions qui
ont suivi cet après midi avaient l'air très intéressantes, vivement le prochain
évènement de ce type (peut être [un deuxième
eZCamp](/post/de-retour-du-ezcamp-2007) à Lyon ou ailleurs en début d'année
prochaine&nbsp;?).
