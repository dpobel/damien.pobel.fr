---
title: "13 jours avec Magento"
tags: php, magento, javascript, performances, template
lang: "fr"
node: "67963"
remoteId: "cce0d052c86fd44166e0de6498d983c4"
published: 2009-09-29T00:47:11+02:00
updated: 2016-02-08 18:24
---

Je travaille depuis très exactement 13 jours sur un projet
[Magento](/tag/magento) histoire de changer un peu d'[eZ
Publish](/tag/ez-publish). Bon, en réalité j'ai fait 2 jours de formation et 11
de développement plus [une petite expérience d'optimisations côté
système](/post/optimisations-magento-et-autres-applications-php-mysql). C'est
certes trop court pour en saisir toutes les subtilités techniques mais c'est
largement suffisant pour y voir de très bonnes choses et de beaucoup moins
bonnes.


Parmi les excellents points :

* la flexibilité et l'extensibilité : grâce à [l'alliance du modèle <abbr
  title="Entity Attribute
  Value">EAV</abbr>](http://en.wikipedia.org/wiki/Entity-attribute-value_model)
  et à la possibilité de surcharger proprement presque tout le *core*.
* le système d'installation et mise à jour des modules qui résout pas mal de
  problèmes liés au développement collaboratif sur plusieurs plateformes
  différentes avec de multiples informations stockées en base de données
* l'ergonomie générale du backoffice mais …

Dans les moins bons points :

* le backoffice est lent, vraiment très lent; il n'y a pas encore d'éditeur
  <abbr title="What You See Is What You Get">WYSIWYG</abbr>  vraiment intégré,
  l'accessibilité est loin d'être parfaite (j'aime naviguer dans les formulaires
  au clavier…), et si une requête AJAX n'aboutit pas pour cause d'expiration
  de la session, rien ne se passe, pas de message d'erreur, juste
  rien…
* Magento utilise directement PHP comme langage de template, je ne suis pas fan
  et quand je vois des templates comme
  [price.phtml](http://svn.magentocommerce.com/source/branches/1.3/app/design/frontend/default/default/template/catalog/product/price.phtml),
  j'ai mal à la tête rien qu'en pensant devoir le modifier un jour…
* [la version Entreprise de
  Magento](http://www.magentocommerce.com/product/enterprise-edition) embarque à
  la fois
  [Prototype](http://www.prototypejs.org/)/[Scriptacoulous](http://script.aculo.us/)
  et [jQuery](http://jquery.com/), je semble être le seul que ça choque pourtant
  quand on connaît l'impact de quelques centaines de millisecondes de latence
  supplémentaire,
  l'optimisation du temps chargement devrait être encore plus prioritaire sur un
  outil de boutique en ligne.
