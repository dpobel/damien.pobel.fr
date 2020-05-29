---
title: Des revues de code de qualité ?
# TODO rename file
tags: bonnes pratiques, métier, outil, code, git, qualité
published: 2020-05-20 23:21
photos:
    - images/revue-de-code.jpg
---

La revue de code est un outil fantastique. J'en ai déjà parlé dans [Les vertus
de la revue de code](/post/vertus-revue-de-code/), il s'agit d'une pratique qui
peut apporter beaucoup en particulier [lorsqu'on travaille en
équipe](/post/travail-d-equipe/). Pour moi c'est un outil indispensable, encore
faut il s'en servir correctement et pour faire et obtenir des _revues de qualité_.

## Une revue de qualité ?

Le but principal d'une revue consiste à déterminer si les changements sont
_suffisamment bons_ pour être intégrés. En fonction des contextes, _suffisamment
bons_ peut prendre des sens différents mais en général, en faisant une revue on
cherche à trouver, avant l'intégration des changements, d'éventuels défauts comme
des bugs mais aussi des problèmes d'architecture, d'évolutivité, de qualités, de
lisibilités… enfin bref tout ce qu'il vaudrait mieux corriger rapidement pour
[tenter de contrôler la dette technique](/post/dette-technique-partie-tetris/).

À côté de ça, une revue est aussi un formidable outil de communication pour
suivre les évolutions ou découvrir les arcanes d'un logiciel et mieux comprendre
le problème qu'il cherche à résoudre et comment il le résoud. Une revue est un
support du discussion, il est normal de poser des questions, de discuter et de
rentrer dans certains détails. L'idée est aussi d'avoir l'opportunité de
s'approprier les changements, c'est une question de _ownership_.

En bref, une revue qui a évité l'intégration de défauts et/ou qui a permis la
communication et l'appropriation est sans aucun doute une revue de qualité.

## Comment obtenir des revues de qualité ?

Une revue fait systématiquement intervenir 2 groupes, d'un côté un groupe de
contributeur·rices et de l'autre les réviseur·ses. Comme souvent dans ce genre
de cas, si chacun·e adopte quelques bonnes pratiques pour faciliter la tâche des
autres, la qualité augmente et la pratique prend tout son sens.

### Côté contributeur·rices

La bonne pratique principale est sans doute d'apporter une attention
particulière à la quantité de changements à réviser. [Ce tweet de I Am
Devloper](https://twitter.com/iamdevloper/status/397664295875805184) résume
parfaitement la situation :

> 10 lines of code = 10 issues.
>
> 500 lines of code = "looks fine."
>
> Code reviews.

Et encore 500 lignes, ce n'est pas tant que ça. J'ai déjà vu des demandes de
revue sur des _pull requests_ qui changent plusieurs dizaines de milliers
lignes. Il est pas difficile d'imaginer ce qu'il ressort d'une telle revue… pas
grand chose.

Il y a plusieurs méthodes pour diminuer la taille d'une revue. Sur un plan
purement technique, [Sergey Zhuk dans How To Speed Up The Code
Review](https://sergeyzhuk.me/2018/12/29/code_review/) suggère d'éviter de
mélanger _refactoring_, correction(s) de bug et ajout de nouvelle(s)
fonctionnalité(s) au sein d'une _pull request_ (ou équivalent). Ce conseil est
finalement assez simple à appliquer et plutôt efficace. Biensûr, tout est
question de mesure, mais dès qu'un _diff_ enfle démesurément, c'est une bonne
tactique. Appliquer cette stratégie peut ne pas suffire notamment lorsqu'on
ajoute une nouvelle fonctionnalité. Là encore, tout est une question de contexte
mais on peut essayer de penser la fonctionnalité de manière itérative soit au
moment de sa définition soit pendant sa réalisation avec par exemple un mode un
peu dégradé mais fonctionnel dans un premier temps qu'on va rapidement venir
améliorer progressivement de manière à travailler par petites touches pour
arriver au résultat attendu.

Au delà de la taille du _diff_, les contributeur·rices peuvent agir sur d'autres
paramètres. Si on parle de _pull request_ ou équivalent, le titre et surtout la
description (voire les labels) sont bien trop souvent négligés. Pourtant une
bonne description, en apportant le contexte nécessaire, peut faire la différence
entre une bonne revue et un perte de temps ponctuée de WTF 😀. Il peut aussi
être intéressant de faire son auto-revue, autant pour détecter des problèmes que
pour placer quelques commentaires qui viendront complèter la description.

### Côté réviseur·ses

La première chose à faire est d'automatiser tout ce qui peut l'être. Si
l'essentiel des commentaires concerne des aspects automatisables, il est
plus probable que les réviseur·ses passent à côté du reste.

Ensuite, faire une revue nécessite de littéralement se plonger dans le code.

=> automatiser
=> littéralement se plonger
=> se concentrer sur l'essentiel, poser des questions ou proposer des solutions


https://engineering.linkedin.com/blog/2018/06/scaling-collective-code-ownership-with-code-reviews
https://watirmelon.blog/2018/07/11/avoiding-lgtm-pr-cultures/
https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/
