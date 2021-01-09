---
title: "La complexité…"
tags: veille, complexité, métier, qualité, code, bonnes pratiques
lang: fr
published: 2020-05-12 18:16
photos:
    - images/complexite.jpg
---

[La complexité, une histoire de charge
cognitive](https://www.lilobase.me/la-complexite-une-histoire-de-charge-cognitive/)
et sa suite [Savoir faire des choses compliquées ne fait pas de vous un bon
développeur](https://www.lilobase.me/savoir-faire-des-choses-compliquees-ne-fait-pas-de-vous-un-bon-developpeur/)
méritent le détour. J'avoue que deux aspects de ces articles résonnent
particulièrement dans ma tête.

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/complexite.jpg" alt="Cockpit d'un avion volant de nuit">
</figure>

## L'abstraction comme outil de diminution de la charge cognitive

Cet énoncé peut sembler contre-intuitif et pourtant l'abstraction peut être un
outil au service d'une certaine simplification :

> Une bonne abstraction, en éliminant le besoin de connaitre les détails
> d’implémentation, est un outil particulièrement puissant pour diminuer la
> charge cognitive. Attention à ne pas créer des abstractions inutiles, ou
> d'abstraire trop tôt certains concepts : l’over-ingénierie n’est jamais très
> loin. Et vous vous retrouvez avec la situation inverse de celle que vous
> espériez.

Comme toujours dans le monde du développement, tout est question de dosage et
surtout de compromis dont les termes doivent être compris et choisis au lieu
d'être subis.

## Combattre la complexité au lieu de la célébrer

Ce point est pour une bonne part une question d'état d'esprit.

> […] des intervenants qui se vantent d’avoir réussi à
> construire des systèmes aussi compliqués […]
>
> Malheureusement, ce que ces gens prouvent, c’est qu’ils sont capables de
> travailler dans un contexte de très forte charge cognitive.
>
> Et ce faisant, ils compliquent d’autant plus le travail de leurs futurs
> collègues en les obligeant à devoir absorber une plus grande charge cognitive
> pour pouvoir intervenir sur le projet.

Tout le problème réside dans le fait que la complexité est à la fois très
attrayante intellectuellement et particulièrement gênante sur le longtemps terme
dès qu'il s'agira de maintenir et de faire évoluer un bout de code trop
complexe.

Cette partie me rappelle [une citation assez
célèbre](https://www.azquotes.com/quote/669106) de [Brian
Kernighan](https://fr.wikipedia.org/wiki/Brian_Kernighan). Je ne sais pas si il
faut vraiment être deux fois plus intelligent·e pour débugguer un bout de code
que pour l'écrire initialement, en revanche, je suis certain que la corrélation est forte
entre l'intelligence mise dans l'écriture initiale et celle nécessaire à la sur
la maintenance.
