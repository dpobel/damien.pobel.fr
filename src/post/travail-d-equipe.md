---
title: "Développer un logiciel, un travail d'équipe"
tags: agile, métier, bonnes pratiques, citation
published: 2019-01-14 21:01
photos:
    - images/cuisinier.jpg
---

Comme je l'écrivais dans [ma rétrospective 2018](/post/retrospective-2018/), je
crois qu'avoir changé de travail m'a fait progresser sur pas mal d'aspects et
pas seulement techniques. Je n'ai pas attendu d'être sur le point de terminer ma
quatorzième année d'expérience et d'avoir le titre (un peu ronflant) de *lead
developer* pour découvrir que développer un logiciel est un travail d'équipe
mais je crois en avoir saisi quelques subtilités qui m'échappaient auparavant.

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/cuisinier.jpg" alt="Deux bras de cuisinier en train
    de complèter des assiettes">
</figure>

## C'est quoi une équipe&nbsp;?

Cette question peut paraître anodine mais elle est en fait bien plus subtile
qu'il n'y paraît. Pendant [ma veille technologique](/tag/veille/) (pas si
technologique que ça pour le coup), j'étais tombé sur [The First Question To Ask
When Building Teams – Is This Really A
Team?](https://www.viktorcessan.com/the-first-question-to-ask-when-building-teams-is-this-really-a-team/).
Cet article reste l'une de mes meilleures lectures de 2018. L'auteur y décrit
les différents types de groupes et finalement qu'une équipe est un groupe de
personnes qui partagent un but et ont besoin des autres pour
l'atteindre. Rapporter à mon expérience personnelle, j'ai compris (au moins en
partie) pourquoi certaines collaborations n'ont pas donné tous les fruits
espérés.

## Agilité

Il y a quelques jours je relisais
[le manifeste pour le développement Agile de
logiciels](http://agilemanifesto.org/iso/fr/manifesto.html) et [les 12 principes
sous-jacents](http://agilemanifesto.org/iso/fr/principles.html) où on peut
notamment lire (le gras est de moi)&nbsp;:

> La méthode la plus simple et la plus efficace pour transmettre de
> **l’information à l'équipe de développement et à l’intérieur de celle-ci** est
> le dialogue en face à face.
>
> […]
>
> Les meilleures architectures, spécifications et conceptions émergent **d'équipes
> autoorganisées**.
>
> À intervalles réguliers, **l'équipe réfléchit aux moyens de devenir plus
> efficace, puis règle et modifie son comportement** en conséquence.

Le concept d'équipe est au cœur de l'agilité et même mieux, l'agilité met l'équipe au
centre en la reconnaissant comme une entité à part entière (en anglais on dirait
*a first class citizen*). L'équipe *s'auto-organise*, *réfléchit*,
*modifie son comportement*, *s'améliore* et *développe un logiciel pour résoudre
un problème*… Je ne vois ça pas seulement comme un élément d'une méthode agile ou
d'une autre mais comme un vrai état d'esprit à acquérir et à cultiver.

## Travailler en équipe

En effet, il ne suffit pas de mettre des personnes *sur* un projet pour travailler
efficacement en équipe. À vrai dire, en fonction des personnes, travailler
efficacement en équipe n'est pas forcément simple et c'est rarement une
évidence. J'écrivais il y a quelques temps que je regrettais [ne pas avoir au
moins été initié à cette pratique à l'école](/post/apprendre-a-l-ecole/), je le
pense d'autant plus maintenant.

Je n'ai pas de recette magique pour bien travailler en équipe, mais j'ai pu
remarquer qu'une bonne dose de capacité à communiquer (clairement), pas mal
d'humilité, un peu d'empathie et une pointe de discipline aident beaucoup. En
fait, toutes ces qualités (ce qu'on appelle parfois des *soft skills*) se
traduisent par une large gamme de comportements qui font partie du développement
en équipe&nbsp;:

* accepter les remarques par exemple [dans une revue de code](/post/vertus-revue-de-code/) et les discussions qui en découlent
* faire l'effort d'écouter les autres membres
* arriver à l'heure aux réunions
* définir une procédure collectivement pour le bien de tous et s'astreindre à la suivre
* savoir donner un coup de main [sans infliger de
    l'aide](https://mixitconf.org/2018/vous-arrive-t-il-d-infliger-de-l-aide-)
* faire confiance aux autres membres
* …
* et se parler tout simplement ;-)

## Avantages à travailler en équipe

Lorsqu'on parle de travail en équipe, j'aime beaucoup ce proverbe
africain&nbsp;:

> Tout seul on va plus vite, ensemble on va plus loin

À elle seule, cette petite phrase résume plutôt bien l'intérêt à travailler en
équipe. Au delà des aspects purement humains, si on rentre un peu dans le détail
du développement logiciel et qu'on parle d'un logiciel destiné à durer, le
travail en équipe apporte ou améliore au moins deux aspects essentiels&nbsp;:

1. un meilleur partage des connaissances
1. un résultat de meilleure qualité

Une bonne répartition des connaissances permet notamment d'[augmenter le *bus
factor*](https://en.wikipedia.org/wiki/Bus_factor#Increasing_the_bus_factor).
Sans même parler de catastrophe, cette répartition rend l'équipe plus résiliente
à toute sorte de changements ou d'imprévus et facilitera d'autant les évolutions
et la maintenance. En quelque sorte, travailler en équipe est un investissement
pour l'avenir.

Le travail en équipe favorise la qualité du résultat (au sens général du terme,
pas seulement la qualité logiciel) car il est probable que les problèmes à
résoudre ne soient pas triviaux et dans ce cas là, plusieurs cerveaux et
plusieurs points de vue amènent à les envisager sous différents angles là où un
cerveau unique aura [tendance à s'arrêter à la première
solution](https://fr.wikipedia.org/wiki/Biais_cognitif#Biais_de_raisonnement).
Au passage, cet effet positif sera d'autant plus amplifié que l'équipe sera
composée de personnes diverses (à tout point de vue).

## Performance d'une équipe

L'évaluation des performances est déjà [une matière difficile lorsqu'on parle d'une
seule personne](https://anaulin.org/blog/on-software-engineer-performance/),
alors pour une équipe…

Plutôt que de vouloir mesurer à tout prix la performance, il est peut-être plus
simple de se poser uniquement la question de comment l'améliorer. À ce niveau,
que l'on parle de vitesse de réalisation, de qualité, de quantité de bugs ou de
n'importe quelle autre métrique, j'ai souvent remarqué que la performance d'une
équipe était en bonne partie calquée sur celle de ces membres les moins…
performants. En d'autre terme, pour progresser collectivement il faut
s'intéresser en premier lieu à ces membres pour les faire progresser
individuellement. Cette progression individuelle aura des effets positifs
multiples qui amélioreront d'autant les performances de l'équipe dans son
ensemble. Ensuite, comme tout problème non trivial, l'équipe peut se prendre en
main, et même si elle peut parfois manquer de recul sur elle-même, là encore
l'intelligence collective d'une équipe auto-organisée et la liberté d'une équipe
autonome permet d'envisager différentes solutions.

---

Après presque 1000 mots, il me reste à conclure en disant que travailler en
équipe pour développer un logiciel, c'est non seulement quasi inévitable mais en
plus c'est à la fois enrichissant sur le plan humain et potentiellement très
efficient.
