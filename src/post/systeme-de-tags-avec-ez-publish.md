---
title: "Système de \"tags\" avec eZ publish"
tags: ez publish, truc, blog
lang: "fr"
node: "61571"
remoteId: "6e2c5f82e7fa315cd36844f5375e2414"
published: 2006-09-23T23:42:19+02:00
updated: 2016-02-10 09:37
---

J'ai reçu cet après midi un mail d'une personne me demandant comment fonctionne
le système de *tags* sur mon blog et plus généralement comment mettre en place
un tel système avec eZ publish. Comme elle me le suggère, c'est effectivement un
sujet pouvant faire l'objet d'un billet, alors c'est parti…


Pour faire court, un système de *tags* est un système de mots clefs ; à chaque
fois que j'écris un billet, je l'associe à un ou plusieurs mots clefs. Comme mon
blog tourne souvent autour [des mêmes sujets](/post/ouverture) ([Web](/tag/web),
[Linux](/tag/linux), [Ubuntu](/tag/ubuntu) et biensûr [eZ
publish](/tag/ez-publish)), le nombre de *tags* est assez restreint. Pour le
moment, j'en ai une cinquantaine mais j'en utilise qu'une quarantaine. Un
représentation de l'utilisation des *tags* est [l'affichage en nuage](/tags),
c'est à dire que la taille du mot est différente en fonction de son utilisation.


*A priori* pour réaliser un tel système avec eZ publish, je vois 4 possibilités
:

* Utiliser le datatype Keywords
* Utiliser le datatype Object relations
* Utiliser la fonctionnalité Related Objects
* Utiliser plusieurs emplacement (*location*) pour les billets


## Utilisation du datatype Keywords


À l'époque où j'ai commencé à développer ce blog, j'avoue que je ne connaissais
pas [le datatype
Keywords](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/datatypes/keywords)
(c'est l'un des charmes d'eZ publish, on en apprend tous les jours…). Ce type
de donnée permet de stocker pour un objet un ensemble de mots clefs séparés par
des virgules. L'administration d'eZ publish propose pour remplir ce champs un
simple champs *input text*. On peut alors récupèrer la liste des objets
correspondant à un ou plusieurs mots à l'aide de [la fonction keyword de
fetch](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/keyword).
[La fonction keyword_count de
fetch](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/keyword_count)
permet comme son nom l'indique de compter les objets correspondant à un ou
plusieurs mots.


Cette technique semble donc bien adapté mais il y a trois principaux
inconvénients à l'utiliser :

* je n'ai pas trouvé le moyen de faire la liste complète des mots utilisés, donc
  générer le nuage de mots clefs (*tags cloud*) paraît difficile.
* comme les mots sont tappés directement dans un champs texte, il risque d'y
  avoir des incohérences (pluriel, majuscule, orthographe,…)
* il ne semble pas possible de faire un export RSS avec le mécanisme par défaut
  pour un mot donné.


## Utilisation du datatype Object relations


Ce type permet [d'associer l'objet en cours d'édition à un ou des objets
existants](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/datatypes/object_relations).
On peut donc imaginer associer un billet à des objets *tags* créés par ailleurs.
Le problème de l'utilisation de cette technique est l'affichage du nuage de
*tags*. En effet, il est simple d'afficher la liste des objets de type tags mais
pour chacun il faut faire un [fetch
reverse_related_objects_count](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/reverse_related_objects_count)
pour obtenir le nombre de billets associer à un mot. Par ailleurs, il n'est pas
possible avec ce mécanisme d'utiliser l'export RSS.


## Utilisation de la fonctionnalité Related Objects


Ce mécanisme est très proche de l'utilisation du datatype Object relations, la
principale différence est que cette relation s'exprime au niveau de l'objet
plutôt que des attributs. Comme l'indiquent [plusieurs commentaires sur la
documentation
officielle](http://ez.no/doc/ez_publish/technical_manual/3_8/concepts_and_basics/content_management/object_relations#comments),
la différence avec les datatype Object relations n'est pas très claire. [Une
utilisation mentionnée dans les forums
d'ez.no](http://share.ez.no/forums/install-configuration/viewcache.ini-settings)
est de permettre la remise à zéro du cache d'un noeud lorsqu'un autre est
modifié en le mettant en objet lié dans certains cas bien particuliers où
[l'utilisation de la fonctionnalités SmartCache](/post/ez-publish-et-son-cache)
ne suffit pas. Mais pour l'implémentation d'un système de *tags*, cette
technique a les mêmes inconvénients que la précédente.


## Utilisation de plusieurs emplacement ( *locations*) pour les billets


J'ai mis en place cette technique sur ce blog. Mon dossier *tags* (qui sert à
afficher le nuage) contient l'ensemble des objets de classe *Tags*. Chaque
billet est créé dans le dossier racine du blog, ensuite j'ajoute un ou des
emplacements à mon billet pour le *tagguer*. Au final cette technique est la
plus simple :

* l'affichage du nuage est un simple [fetch
  list](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/list)
  puisque chaque
  [ezcontentobjecttreenode](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/objects/ezcontentobjecttreenode)
  a un attribut **children_count** permettant de déterminer le poids du mot ;
* pour chaque billet, l'affichage des *tags* correspondant est une simple boucle
  sur l'attribute **parent_nodes** de l'objet
  [ezcontentobject](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/objects/ezcontentobject)
  ;
* générer un flux RSS des billets pour un tag donné est très simple, et
  moyennant un mini hack de 3 lignes dans le script d'export on peut même
  générer le flux RSS avec les adresses principales des billets ;
* [en activant la fonctionnalités emplacement du mode
  edition](http://ez.no/doc/ez_publish/user_manual/3_8/daily_tasks/publishing_at_multiple_locations),
  il est possible de décider lors de l'édition des *tags* associés à un billet.

Finalement, le seul mini inconvénient de cette technique est que les billets se
trouvent accessibles à la fois par l'URL de leur noeud principal mais aussi par
les URLs des noeuds fils des *tags* ce qui pour un référencement correct peut
être gênant. Il faut donc faire attention à la génération des adresses (cf. hack
pour le RSS juste au dessus). J'ai d'ailleurs fait [une suggestion dans ce
sens](http://share.ez.no/forums/suggestions/redirect-to-main_node-settings/)
dans le forum *adhoc*.
