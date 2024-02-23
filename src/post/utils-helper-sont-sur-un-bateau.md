---
title: "Utils et helper sont sur un bateau…"
tags: bonnes pratiques, métier, travail, qualité, code
lang: fr
published: 2024-02-23
photos:
    - images/plouf.jpg
---

<figure class="object-center bordered">
  <img loading="lazy" src="/images/660x/plouf.jpg" alt="Petites vaguelettes
  provoquées par un objet tombant à l'eau avec une luminosité évoquant un
  coucher de soleil">
</figure>

Et si on les ~~jetait à l'eau~~ _refactorisait_ ? 😀

Dans [une revue de code](/post/vertus-revue-de-code/) ou en explorant une base
code, ces noms là, tout comme dans une certaine mesure les _handlers_ et autres
_managers_, déclenchent systématiquement dans ma tête une petite alarme 🔔 qui
appelle à aller regarder de plus près ce qui se cache derrière.

Ces termes sont très génériques même si ils sont souvent
accompagnés d'un préfixe, d'un suffixe ou d'un chemin un peu spécifique (encore
qu'on a tous dû tomber au moins une fois sur un `src/utils.js` quand ce n'est
pas `src/tools/utils.js` 😉). Et par
conséquent, la ou les responsabilités de ces composants sont loin d'être
claires. D'ailleurs, ce genre de composant a une sérieuse tendance à être un
fourre-tout avec beaucoup plus qu'une unique responsabilité.

Aussi, quand ce genre de composant occupe une place importante dans le code en
terme de quantité de logique, c'est autant de logique qui n'est pas là où elle
aurait plus de sens. L'utilisation abusive de ce genre de composant va de pair
avec d'autres _code smells_, notamment :

* [des objets
  anémiques](https://martinfowler.com/bliki/AnemicDomainModel.html) : les objets
  métiers se retrouvent dépourvus de comportement puisqu'il est relégué dans ces
  _helpers_ et _utils_ ;
* [un manque
  d'encapsulation](https://fr.wikipedia.org/wiki/Encapsulation_(programmation)) :
  les objets exposent nécessairement plus qu'ils ne devraient pour que ces
  composants puissent faire leur travail ;
* des abstractions manquantes : là encore, une responsibilité qui pourrait être
  proprement isolée dans un composant bien nommé se retrouve diluée.

C'est pourquoi, en ce qui me concerne, chaque mention d'un _utils_ ou d'un
_helper_ me rend plus que méfiant. Quasiment systématiquement il existe une
meilleure solution en terme d'expressivité, de qualité de code et de
maintenabilité.
