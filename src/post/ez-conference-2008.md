---
title: "eZ Conference 2008"
tags: ez publish, openoffice, ez components, cms, travail, online editor, ez find, linux, logiciels libres, standards, php
lang: "fr"
node: "66892"
remoteId: "5e8ad8667e1377486bbc8651d5558ac2"
published: 2008-06-29T18:53:13+02:00
updated: 2016-02-10 22:55
---
<figure class="object-center"><a href="/images/skien.jpg"><img loading="lazy" src="/images/660x/skien.jpg" alt="Skien">
</a></figure>


La semaine dernière se déroulait l'[eZ Conference 2008](http://conference.ez.no)
à [Skien en
Norvège](http://maps.google.fr/maps?f=q&amp;hl=fr&amp;geocode=&amp;q=skien,+norway&amp;ie=UTF8&amp;t=h&amp;z=9)
autour du [CMS](/tag/cms) Open source [eZ Publish](/tag/ez-publish). Cette
année, la conférence se déroulait en même temps que l'Open Nordic.

Beaucoup de nouveautés et pas mal de retours intéressants sur de gros projets
ont été présentés cette année à l'eZ Conférence 2008. D'un point de vue
*produit*, eZ Systems dirige ses développements sur 2 axes :

* amélioration de ce qu'on peut appeler le *socle eZ Publish* (correction des
  bugs, amélioration des performances,…)
* amélioration de l'expérience utilisateurs avec des nouveaux produits autour
  d'eZ Publish (eZ Flow, nouvel Online Editor,…)

La grosse nouvelle est la mise à jour majeure de la roadmap d'eZ Publish par
rapport [au dernier developer day](/post/ez-developer-day-a-paris-le-17-04-2008)
et les décalages de planning qui vont avec ;-)

## La roadmap eZ Publish

La grosse nouveauté concerne le développement des nouvelles versions d'eZ
Publish. En effet celui ci va se poursuivre sur 2 branches distinctes :

* la branche 4.x
* le projet V (la branche 5.x)

La branche 4.x se focalisera en plus des corrections de bug, sur des
améliorations de performances avec la base de code actuelle. Cette version
conservera en particulier le moteur de *template* actuel. Le but de cette
branche est de conserver la compatibilité ascendante. Il semble que le principal
soucis au niveau de l'intégration du [composant Template des eZ
Components](http://ezcomponents.org/docs/tutorials/Template) soit [le système
d'override](http://ez.no/doc/ez_publish/technical_manual/4_0/templates/the_template_override_system).

La branche 5.x (project V) vise à réécrire quasi complètement le noyau sous
forme de micro kernel avec un maximum de fonctionnalité sous forme d'extensions.
Il sera par exemple possible d'écrire son propre moteur de stockage pour par
exemple se passer du *versionning* ou pour gérer de manière fine les données
stockées dans eZ Publish.

À plus court terme, la sortie de la 4.1 est *une question de semaines*, elle
comprendra&nbsp;:

* [le nouvel Online Editor](/post/the-new-online-editor-for-ez-publish-beta)
* le multi file upload via un flash (alternative très intéressante au [WebDav](http://ez.no/doc/ez_publish/technical_manual/4_0/features/webdav))
* [l'extension Oracle](http://projects.ez.no/ezoracle) pour Oracle 10 ou 11 supportant aussi [le mode cluster d'eZ Publish](http://ez.no/doc/ez_publish/technical_manual/4_0/features/clustering)
* Le support de Solaris 10
* L'expiration des mots de passe
* la correction de + de 300 bugs dont [les bugs des URL Aliases](http://issues.ez.no/12785)

Pour ces derniers bugs, le dernier obstacle est l'écriture d'un script pour tenter de récupérer un maximum de données.

Les versions 4.2 et suivantes vont voir apparaître les fonctionnalités
suivantes&nbsp;:

* Les *object states* permettant de faire des processus complexes de publication
  plus facilement.
* Support de IIS et MS SQL pour l'hébergement avec PHP en fastcgi avec comme but
  80 à 90% des performances d'un serveur Linux
* Des plugins OpenOffice et MS Word permettant d'éditer des objets directement
  depuis ces traitements de texte
* L'intégration d'un CSS Editor.

Les démonstrations de ces deux derniers produits étaient assez impressionnantes.
Les plugins des traitements de texte permettent de parcourir et d'éditer
directement depuis le logiciel les objets du site et de les sauvegarder sans
passer par un export puis un réimport dans le backoffice. Le CSS Editor permet
lui d'éditer la feuille de style directement depuis son navigateur. Ce produit
est déjà en fonctionnement sur *une usine à sites* où les administrateurs de
chaque site ont la possibilité de changer légèrement la mise en page (couleurs,
images de fond, police,…)

## Quelques projets intéressants

eZ Publish est de plus en plus employé pour de gros sites que ce soit en terme
d'audience, de volumétrie ou de technicité. Par exemple eZ Publish est utilisé
sur [Sport24.com](http://www.sport24.com) (site que je connais bien :)),
[Europe1.fr](http://www.europe1.fr) ou [Car and
Driver](http://www.caranddriver.com/) sites à fort trafic où sont
utilisées différentes techniques pour tenir la charge comme le mode cluster, de
[la prégénération statiques avec des
SSI](http://blog.smile.fr/ez-publish-a-tres-hautes-performances) ou les
[ESI](http://www.w3.org/TR/esi-lang) avec
[Akamaï](http://www.akamai.com/html/support/esi.html) (ou bientôt
[Varnish](http://varnish.projects.linpro.no/wiki/ESIfeatures)). En terme de
volumétrie, [Première](http://www.premiere.fr) remporte probablement la palme
avec 700 000 objets de contenus. En terme de technicité nous avons pu assister à
la présentation d'un projet de banque d'images avancée pour
[SanomaWSOY](http://www.sanoma.com/) mettant en oeuvre eZ
Publish avec eZ Find pour l'indexation de 400 000 images et de [leurs meta
données XMP](http://fr.wikipedia.org/wiki/Extensible_Metadata_Platform).
