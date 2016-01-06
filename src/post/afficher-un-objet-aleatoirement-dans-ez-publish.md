---
title: "Afficher un objet aléatoirement dans eZ publish"
tags: ez publish, truc, pense bête
updated: 2007-02-06T08:46:10.000Z
lang: "fr"
node: "61549"
remoteId: "a3a1ec26fca7ab8f083165917a87cb49"
published: 2006-09-19T00:10:14+02:00
---
 
Afficher un objet aléatoirement est une question assez fréquente sur les forums eZ publish. Cette opération comporte en fait deux petites difficultés :

* La sélection aléatoire à l'aide [fetch](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content) qui ne propose pas (encore?) de méthode spécifique
* La gestion du cache qu'il faut désactiver ou du moins réduire.
 
 
J'ai d'ailleurs proposé une solution sur le [forum *Questions Techniques* d'eZ publish France](http://www.ezpublish-france.com/index.php/fr/forums/questions_techniques) dans [un sujet de jeudi dernier](http://www.ezpublish-france.com/index.php/fr/forums/questions_techniques/afficher_aleatoirement_les_resultats_d_un_fetch). Au passage [j'ai appris](http://www.ezpublish-france.com/index.php/fr/forums/questions_techniques/afficher_aleatoirement_les_resultats_d_un_fetch/re_afficher_aleatoirement_les_resultats_d_un_fetch__2) l'existence de l'opérateur [rand()](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_operators/mathematics/rand) qui renvoie un nombre aléatoire compris entre ses deux arguments. Je ne sais pas pourquoi, j'étais persuadé qu'il n'y avait pas d'opérateur de ce type, donc à chaque fois que j'avais un nombre aléatoire à génèrer, j'utilisais le *timestamp* courant modulo le nombre de maximal d'objets existants. Pourquoi faire simple quand on peut faire compliqué ? :-)

 
Au final, je me dis que publier un template peut être intéressant pour le débutant et puis ça fait un bon pense bête pour moi :

 ``` smarty
{** désactivation du cache pour avoir  **
 ** un nouvel affichage à chaque appel **}
{set-block scope=root variable=cache_ttl}0{/set-block}
<div class="block">
{** sélection aléatoire **}
  {let c=fetch(content, tree_count,
                hash(parent_node_id, 93,
                     class_filter_type, include,
                     class_filter_array, array('photo')))
       p=fetch(content, tree,
                hash(parent_node_id, 93,
                     class_filter_type, include,
                     class_filter_array, array('photo'),
                     limit, 1,
                     offset, rand(0 $c|sub(1))))
  }
  {** $p[0] contient l'objet choisi **}
    {node_view_gui content_node=$p[0] view=preview}
  {/let}
</div>
```

 
Le [set-block](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_functions/variables/set_block) indique à eZ publish de ne pas mettre en cache le résultat du template, ou plus exactement de le mettre en cache avec une durée de vie de zéro seconde. Sur un site à fort traffic, cela est peut être un peu agressif, il est peut être plus raisonnable de fixer le temps d'expiration du cache à une valeur supérieure mais relativement faible.

Le premier fetch ([tree_count](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/tree_count)) permet de compter le nombre total d'objets (ici [des photos](http://photos.pwet.fr)) alors que le second ([tree](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/modules/content/fetch_functions/tree)) sélectionne effectivement un objet au &quot;hasard&quot; en fixant le paramètre offset.

 
Ce bout de code est à mettre dans un template par exemple dans le fichier **design/votre_design/templates/rand_photo.tpl** est à inclure à l'aide de [include](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_functions/miscellaneous/include) avec quelque chose comme :

 ``` smarty
{include uri="design:rand_photo.tpl"}
```

 
Une solution, peut être plus économe en ressource, pourrait être de compter le nombre d'objets à l'extérieur du template **rand_photo.tpl** et de passer cette valeur en paramètre du *include*, de manière à ce que le résultat soit stocké en cache. L'inconvénient est que les deux *fetch* utilisés pour la même tâche se retrouve à deux endroits distincts ce qui ne facilite pas la maintenance...

 
Une autre solution, [proposée par Xavier Langlois](http://www.ezpublish-france.com/index.php/fr/forums/questions_techniques/afficher_aleatoirement_les_resultats_d_un_fetch/re_afficher_aleatoirement_les_resultats_d_un_fetch__3) est d'utiliser la contribution [Extension shuffle](http://ez.no/community/contribs/template_plugins/extension_shuffle) qui propose un opérateur de template permettant de mélanger un tableau quelconque. Cette solution a le désavantage de nécessiter la création d'un tableau contenant tous les objets possibles (à l'aide du *fetch tree* sans les paramètres limit et offset par exemple) pour ensuite ne prendre que l'un d'entre eux. J'avoue ne pas avoir testé cette solution, mais sur un grand nombre d'objets possibles, c'est une solution probablement gourmande en ressource, d'autant plus si le cache est désactivé.

