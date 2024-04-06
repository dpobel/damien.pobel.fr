---
title: "« Clean Code » résumé en quelques lignes"
tags: complexité, métier, qualité, code, bonnes pratiques, traduction, clean code, unit test, ingénierie logicielle
lang: fr
published: 2020-06-16 23:28
top-priority: 50
photos:
    - images/water-drop.jpg
---
<p class="note">
Ce texte est une traduction et une adaptation de <a
href="https://gist.github.com/cedrickchee/55ecfbaac643bf0c24da6874bf4feb08">Summary
of 'Clean code' by Robert C. Martin</a>.
</p>

Voici un résumé des principales idées du livre « [Clean Code: A Handbook of Agile
Software
Craftsmanship](https://www.decitre.fr/livres/clean-code-9780132350884.html) » de
Robert C. Martin (Uncle Bob).

Du code est propre (_clean_) si il peut être compris facilement - par chaque
personne de l'équipe. Un code propre (_Clean code_) peut être lu et amélioré par
un·e développeur·se autre que la personne qui l'a écrit. Avec la
compréhensibilité vient la lisibilité, la facilité à changer, l'extensibilité et
[la maintenabilité](/post/la-maintenabilite-comme-critere-de-decision/).

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/water-drop.jpg" alt="Une goutte d'eau">
</figure>

## Règles générales

1. Suivez **des conventions reconnues**.
1. _Keep it **simple** stupid_. Plus simple est toujours mieux. [Réduisez la
   complexité](/post/complexite-charge-cognitive/) autant que possible.
1. **Règle du boy scout** : laissez le camp plus propre que l'état dans lequel
   vous l'avez trouvé.
1. Lors de résolution d'un problème, toujours chercher et trouver **la cause
   racine**.
1. Suivez [**le principe de moindre
   surprise**](https://fr.wikipedia.org/wiki/Principe_de_moindre_surprise).
1. <abbr title="Don't Repeat Youself">DRY</abbr> : ne vous répétez pas, et [mais
   attention à l'interprétation de ce
   principe](https://medium.com/@nicolopigna/this-is-not-the-dry-you-are-looking-for-a316ed3f445f).

## Règles de design

1. Gardez les données configurables (par exemple les constantes) à hauts
   niveaux. Elles devraient être **faciles à changer**.
1. Préférez le polymorphisme aux `if`/`else` ou `switch`/`case`.
1. Évitez la sur-configurabilité et [tout ce qui n'a pas prouvé sa
   nécessité](/post/au-cas-ou/).
1. Utilisez **l'injection de dépendances**.
1. Suivez [**la loi de
   Déméter**](https://fr.wikipedia.org/wiki/Loi_de_D%C3%A9m%C3%A9ter) : une
   classe ne devrait connaître que ses dépendances directes.

## Astuces pour la compréhensibilité

1. Soyez **cohérent**. Si vous faites quelque chose d'une certaine manière,
   toutes les choses similaires devraient être faites de la même manière.
1. Utilisez **des noms de variables explicites**.
1. **Encapsulez les conditions limites** : elles sont compliquées à suivre. Il
   vaut mieux les isoler à un endroit.
1. Préférez [des **_value objects_
   spécifiques**](https://patricklouys.com/2017/06/04/value-objects-explained/)
   plutôt que des types primitifs
1. **Évitez les dépendances logiques** : n'écrivez pas de méthodes qui dépendent
   d'autre chose dans la même classe.
1. **Évitez les conditions négatives**.

## Règles de nommages

1. Choisissez **des noms descriptifs et sans ambiguïté**.
1. Faites **des distinctions qui ont du sens**.
1. Utilisez **des noms prononçables**.
1. Utilisez **des noms cherchables**.
1. Remplacez les nombres magiques par **des constantes bien nommées**.
1. Évitez d'ajouter des préfixes ou des informations sur les types.

## Règles relatives aux fonctions

1. **Courtes**.
1. **Ne fait qu'une chose** et la fait bien.
1. Utilisez **des noms descriptifs**.
1. Préférez les avec **le moins d'arguments possibles**, idéalement pas plus de 3.
1. **Sans effet de bord**.
1. [N'utilisez pas de
   _flag_](https://ariya.io/2011/08/hall-of-api-shame-boolean-trap) : écrivez
   plutôt plusieurs méthodes sans ce type d'argument.

## Règles relatives aux commentaires

1. Essayez d'écrire [**du code expressif** ne nécessitant pas de
   commentaire](/post/juste-dose-commentaires-dans-le-code/). Si c'est
   impossible, prenez le temps d'écrire un bon commentaire.
1. Ne soyez pas redondant (par exemple : `i++; // increment i`).
1. N'ajoutez pas de bruit évident.
1. N'utilisez pas les commentaires de fermeture de bloc (par exemple : `} // end
   of function`).
1. **Ne commentez pas de code**. Supprimez ce code.
1. Utilisez des commentaires **pour expliquer l'intention**.
1. Utilisez des commentaires **pour avertir des conséquences**.

## Structure du code source

1. **Séparez les concepts verticalement**.
1. **Le code lié** devrait apparaître **dense verticalement**.
1. Déclarez les **variables à proximité de leurs usages**.
1. **Les fonctions dépendantes les unes des autres** devraient être **à
   proximité**.
1. **Les fonctions similaires** devraient être **à proximité les unes des
   autres**.
1. Placez les fonctions dans **la direction descendante**.
1. Gardez les **lignes courtes**.
1. N'alignez rien horizontalement.
1. Utilisez des **espaces pour associer des choses liées** et dissocier des
   choses liées faiblement.
1. **Ne cassez pas l'indentation**.

## Objets et structures de données

1. Cachez les structures internes.
1. Devraient être **petits**.
1. **Ne font qu'une chose**.
1. **Possèdent un petit nombre de variables d'instance**. Si votre classe a trop
   de variables d'instance, il est probable que votre objet fasse plus qu'une
   chose.
1. Une classe de base ne devrait rien connaître de ses classes dérivées.
1. **Il vaut mieux avoir plusieurs fonctions** que de passer du code à une
   fonction pour qu'elle choisisse un comportement.
1. **Préférez des méthodes non statiques**.

## [Tests](/post/bon-test-unitaire-integration-fonctionnel/)

1. **Un concept** par test.
1. **Rapides**.
1. **Indépendants**.
1. **Répétables**.
1. **Auto validants**.
1. **Utiles**.
1. **Lisibles**.
1. **Faciles à lancer**.
1. [Utilisez un **outil de génération de
   couverture de code**](/post/code-coverage-taux-couverture-tests/).

## Indicateurs d'un code pas terrible (_Code smells_)

1. **Rigidité** : le logiciel est difficile à faire évoluer. Une petite
   modification peut causer une cascade de changements.
1. **Fragilité** : le logiciel dysfonctionne en plusieurs endroits en
   réponse à un unique changement.
1. **Immobilité** : vous ne pouvez pas réutiliser une partie du code dans
   d'autres projets car cette opération est risquée ou nécessite un grand
   effort.
1. [**Complexité inutile**](/post/complexite-charge-cognitive/).
1. **Répétition inutile**.
1. **Opacité** : le code est difficile à comprendre.

## Gestion des erreurs

1. **Ne mélangez pas** la gestion des erreurs et le code.
2. Utilisez des **Exceptions** au lieu de renvoyer des codes d'erreurs.
3. **Ne retournez pas `null`**, [n'utilisez pas `null` non
   plus](/post/mauvaises-pratiques-bugs/).
4. Lancer des exceptions **avec du contexte**.
