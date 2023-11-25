---
title: "« Au cas où »"
tags: bonnes pratiques, métier, code, qualité, citation
lang: fr
published: 2018-10-16 18:22
top-priority: 10
photos:
    - images/psychic-vision.jpg
---

Récemment, je suis (re)tombé sur [le tweet suivant](https://twitter.com/jaredforsyth/status/1017110508611096576)&nbsp;:

> Over the past couple years I've gotten much more sensitive to the cost of
> speculative generality. So many bugs could have been avoided by just solving
> the problem at hand instead of trying to solve a ton of potential future
> problems.

Traduction Française personnelle&nbsp;:

> Au cours des dernières années, je suis devenu très sensible au coût de la
> généralité spéculative. Tant de bugs pourraient être évités en résolvant le
> vrai problème au lieu d'essayer de résoudre de futurs potentiels problèmes.

Au fil des années, j'ai fait le même constat au point que maintenant dès que
j'entends  *j'ai choisi cette approche au cas où…* ou une tournure équivalente
j'ai l'oreille qui se dresse et sans doute une légère augmentation de ma tension
artérielle 😀. À mon avis, *au cas où* est la pire des justifications pour
écrire un bout de code. Le travail de développeur·se est déjà suffisamment
compliqué, je ne crois pas qu'il soit nécessaire de rajouter de l'incertitude ni
la nécessité de prévoir l'avenir pour le réaliser convenablement.

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/psychic-vision.jpg" alt="Panneau avec écrit 'Psychic
    Vision, present, past, future. Tarots Cards">
</figure>

Je parle ici de ce qui est dans les mains des développeur·ses, il arrive aussi
de devoir réaliser des fonctionnalités *au cas où* mais c'est une autre
histoire…

## L'obsession de la généricité&nbsp;?

L'une des formes les plus courantes (celle abordée dans le tweet cité plus haut)
du *au cas où* est sans doute l'obsession de la réutilisabilité et de la
généricité des développeur·ses. Je ne sais pas d'où vient cette obsession, mais
si vous pratiquez [les revues de code](/post/vertus-revue-de-code/), vous avez
forcément déjà subi (voire écrit 😜) un commentaire du type *cette approche rend
le code pas très réutilisable* ou *en faisant ça, on pourrait rendre ce truc
générique* sur l'ajout d'une nouvelle fonctionnalité. Dans ce genre de cas je ne
cherche même pas à débattre de la réutilisabilité ou de la généricité, je fais
simplement observer qu'effectivement le changement vise à résoudre un problème
pas à proposer une solution générique et que, tant que le besoin générique
n'existe pas, essayer d'y répondre n'est qu'une perte de temps et [un nid à bugs
par la complexité que cela implique](/post/complexite-charge-cognitive/).

D'ailleurs le découpage en composants, modules, services, fonctions… ne vise pas
à préparer une éventuelle réutilisation (même si à l'occasion, cela peut se
produire) mais bien à partager les responsabilités et à donner autant que
possible du sens à cet amas d'instructions pour que d'autres humain·es puissent
en comprendre quelque chose. La réutilisation peut éventuellement venir ensuite,
après du *refactoring* tout en gardant à l'esprit qu'il vaut souvent mieux un
composant dupliqué qu'une dépendance à un composant générique par essence
complexe. J'ai lu quelque part (mais j'ai perdu la source…) qu'il faut au moins
3 utilisations similaires pour justifier la création d'un composant
réutilisable, j'aime beaucoup cette suggestion&nbsp;!

## L'optimisation prématurée

Quel·le développeur·se n'a pas déjà entendu parler de *premature
optimization*&nbsp;? Si ce n'était pas le cas, voila qui est fait 😋 La citation
complète (de [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth)) dont
est issue cette formule est la suivante&nbsp;:

> We should forget about small efficiencies, say about 97% of the time:
> premature optimization is the root of all evil. Yet we should not pass up our
> opportunities in that critical 3%.

Ces deux phrases sous-entendent pas mal de choses mais par définition
optimiser prématurément c'est optimiser *au cas où*, avant de savoir si
vraiment c'est nécessaire. Et, comme dans l'obsession de la
généricité, c'est non seulement une perte de temps mais également un poids en
terme de maintenance et d'évolutivité. N'est il pas plus judicieux
d'utiliser le temps de vaine optimisation à améliorer le *design*, la qualité…
du projet&nbsp;?

## Tests, qualité,… du *au cas où* déguisé&nbsp;?

J'ai parfois entendu qu'écrire [des tests
automatisés](/post/bon-test-unitaire-integration-fonctionnel/), essayer
d'architecturer son code et d'une manière générale prendre le temps d'améliorer
la qualité était une façon de faire du *au cas où*. C'est parfois vrai si on
considère que la vie du logiciel s'arrête quasi juste après l'avoir écrit comme
c'est le cas dans l'écriture d'un prototype ou d'un quelconque script *one
shot*. Mais dans tous les autres cas, l'effort de qualité répond à la certitude
de devoir maintenir voire d'avoir à faire évoluer le code. On est loin d'une
spéculation.

Mieux encore, une base de code qualité peut être un remède ou au moins un
atténuateur de décisions hâtives. En effet, en sachant le code facile à faire
évoluer car bien architecturé, on est moins de tenter de prendre des décisions
*au cas où*, on sait que remettre la décision à plus tard sera quasi sans
conséquence autre qu'un choix sans doute plus avisé 😋.

---

D'une manière générale, faire du code *au cas où*, c'est prendre une décision
avec une vision biaisée du problème qu'on croit résoudre. Et puis en principe,
le code n'est pas écrit dans le marbre, alors autant en profiter pour ne pas
répondre à des questions qui ne se posent pas (encore), se laisser le temps de
la réflexion et plutôt se concentrer sur d'autres aspects qui eux serviront plus
tard, *chaque chose en son temps*.
