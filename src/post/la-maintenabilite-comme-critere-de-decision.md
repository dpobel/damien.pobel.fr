---
title: "La maintenabilité comme critère de décision"
tags: bonnes pratiques, métier, travail, qualité, code
lang: fr
published: 2024-03-02
photos:
    - images/shrug.png
---

<figure class="object-center bordered">
  <img loading="lazy" src="/images/660x/shrug.png" alt="Image où il est inscrit
  ¯\_(ツ)_/¯ qui signifie shrug ou haussement d'épaule.">
</figure>

En début d'année, j'ai lu [Get Your Hands Dirty on Clean Architecture (Second
Edition)](https://www.packtpub.com/product/get-your-hands-dirty-on-clean-architecture-second-edition/9781805128373)
de [Tom Hombergs](https://reflectoring.io/authors/tom/). Comme son titre
l'indique, ce très bon livre traite de la _Clean Architecture_ et plus
particulièrement de [l'architecture
hexagonale](https://fr.wikipedia.org/wiki/Architecture_hexagonale). Tout au long
des quelques 140 pages, l'auteur aborde ce type d'architecture sous différents
aspects mais il en est un qui revient régulièrement tout en étant le sujet du
premier chapitre : **la maintenabilité**.

Une bonne partie de ce premier chapitre peut se résumer par cette expression
_pseudo-mathématique_ :

```plaintext
maintenabilité >>> tout le reste
```

Dans _tout le reste_ rentrent les qualités qu'on cherche souvent à atteindre
dans la construction d'un logiciel par exemple les performances, la
_scalabilité_, la robustesse, la flexibilité et bien d'autres… Et comme
l'explique très bien l'auteur, la maintenabilité a ceci de spécial qu'elle est
une qualité qui permet d'atteindre toutes les autres. En effet, dès qu'un
logiciel est maintenable, il est facile à faire évoluer pour atteindre certaines
qualités dès que le besoin émerge. Évidemment, l'ajout de
fonctionnalités et la correction des bugs sont également d'autant plus simples que le
code est maintenable. En d'autres termes, la maintenabilité aide à la fois à
atteindre des objectifs fonctionnels et non fonctionnels.

Je formule généralement cette idée de la manière suivante :

> Un bon code est un code facile à changer.

Ni plus, ni moins. Jusque là, rien de très original je crois mais ça va mieux en
le disant 😁

Dans ce chapitre, Tom Hombergs pousse la réflexion un peu plus loin et notamment
en énonçant ce qui m'apparaît maintenant comme un corollaire :

> Whenever we have to decide between multiple options, we can choose the one
> that makes the code easier to change in the future. No more agonizing between
> different options. We just take the one that increases maintainability the
> most.

ce qui peut se traduire par :

> Chaque fois que nous devons choisir entre plusieurs options, nous pouvons
> choisir celle qui rendra le code plus facile à changer dans le futur. Plus
> besoin de se torturer l'esprit entre différentes options. Nous choisissons
> simplement celle qui augmente le plus la maintenabilité.

Quand j'ai lu cette partie, je dois dire qu'une petite lumière s'est allumée
dans ma tête 💡 J'ai beau être convaincu de l'importance de la maintenabilité
depuis de nombreuses années maintenant, je n'avais jamais considéré cette
qualité comme une aide à la décision de manière aussi directe. Et forcément, en
regardant un peu dans le rétroviseur, je me rends compte qu'appliquer ce
principe dans certaines décisions aurait potentiellement mener à de meilleurs
choix.

Comme souvent avec ce genre de principe général, il s'agit d'un élément parmi
beaucoup d'autres et comme l'indique Tom Hombergs, le _bon_ choix n'est parfois
pas celui qui améliore ou conserve la maintenabilité. Néanmoins opter pour ce
principe par défaut me semble être une bonne approche.
