---
title: "La dette technique est comme une partie de Tetris"
tags: traduction, métier, code, qualité
lang: fr
published: 2019-03-15
photos:
    - images/tetris.png
---

<p class="note">
Ce texte est une traduction de [Technical Debt is like Tetris](https://medium.com/@erichiggins/technical-debt-is-like-tetris-168f64d8b700) par
[Eric Higgins](https://twitter.com/rlyerichiggins).
</p>

Vous ne pouvez pas gagner. Vous ne pouvez que retarder la fin de la partie.

Comme beaucoup de gens qui y ont joué, j'adore Tetris. Je me souviens de ma
première partie sur la Nintendo Game Boy d'un ami. Peut-être avez-vous encore la
musique en tête. Tetris est non seulement l'un des meilleurs jeux de tous les
temps, mais c'est aussi une excellente analogie de la dette technique. Le but de
cette analogie est comprendre la dette technique et ses conséquences.

Je vais en plus partager une histoire sur comment mon équipe a réduit la dette
technique dans du code lié à la facturation et comment nous avons **corrigé un
bug coûtant 1 million de dollars par an**.

<figure class="object-center bordered">
    <a href="/images/tetris-beginning.png"><img src="/images/660x/tetris-beginning.png" alt="Début d'une partie de Tétris"></a>
    <figcaption>
    Les tâches sont plus faciles au départ quand la complexité est basse
    </figcaption>
</figure>

Chez les éditeurs de logiciels, les chef·fes de produit ou les chef·fes de projet
travaillent avec les développeur·ses pour prioriser les fonctionnalités qui
seront développées et livrées aux clients. **Terminer une ligne à Tetris est
comme livrer une fonctionnalité**.

<figure class="object-center bordered">
    <a href="/images/tetris-complex.png"><img src="/images/660x/tetris-complex.png" alt="Partie de Tetris où plusieurs lignes sont sur le point de disparaître"></a>
    <figcaption>
    Les fonctionnalités complexes sont faciles à obtenir avec une dette
    technique réduite
    </figcaption>
</figure>

Développer et livrer une fonctionnalité **complexes** nécessite **plus de
lignes**.

Souvent, des fonctionnalités nécessitent des compromis dans le code (des *hacks*
ou des raccourcis) pour être livrées à temps. Parfois, les changements de
stratégie produit sont incompatibles avec des choix techniques précédents ce qui
implique un effort supplémentaire pour soit migrer les clients existants soit
être capable de gérer à la fois la "nouvelle" et "l'ancienne" logique.

<figure class="object-center bordered">
    <a href="/images/tetris-small-technical-debt.png"><img src="/images/660x/tetris-small-technical-debt.png" alt="Une partie de Tetris avec quelques trous"></a>
    <figcaption>
    Une petite quantité de dette technique est normale et gérable
    </figcaption>
</figure>

Ce genre de scénario crée de [la dette
technique](https://fr.wikipedia.org/wiki/Dette_technique) dans le code. **Un
trou enterré dans une partie de Tetris représente de la dette technique**.

Tout code possède de la dette technique. C'est parfaitement normal. Vous pouvez
continuer à jouer à Tetris même avec quelques trous.

<figure class="object-center bordered">
    <a href="/images/tetris-burried-technical-debt.png"><img src="/images/660x/tetris-burried-technical-debt.png" alt="Une partie de Tetris avec beaucoup de trous"></a>
    <figcaption>
    Submergé par la dette technique
    </figcaption>
</figure>

Trop de dette technique ralentira la correction des dysfonctionnements et le développement de nouvelles fonctionnalités.

Il ne s'agit pas d'un problème qui peut être résolu en ajoutant plus de
développeur·ses ou en remplaçant celles et ceux déjà en poste. Dans _dette
technique_, il y a _dette_, à un moment ou un autre, elle devra être remboursée.

**Payer la dette technique permet de rester compétitif et concurrentiel**

<figure class="object-center bordered">
    <a href="/images/tetris-game-over.png"><img src="/images/660x/tetris-game-over.png" alt="Une partie de Tetris perdue"></a>
    <figcaption>
    Fin de la partie
    </figcaption>
</figure>

Une partie de Tetris est semblable à la gestion d'une entreprise, plus la partie
dure, plus c'est difficile. Les pièces bougent plus vite et il est de plus en
plus difficile de suivre.

Une partie de Tetris est semblable à la gestion d'une entreprise, il n'y a pas de
vraie ligne d'arrivée. Vous ne pouvez que retarder la fin de la partie.

Une partie de Tetris est semblable à la gestion d'une entreprise, laisser trop de
trous dans la construction causera la perte de la partie.

## La dysfonctionnement à 1 million de dollars

Il n'y a pas très longtemps, mon équipe devait mettre à jour la logique de
facturation dans le code de notre produit pour mettre en place un nouveau plan de
tarification, une nouvelle gestion de paiement et pour améliorer les étapes de
facturation. Pendant que l'équipe produit terminait de définir les détails, nous
avons commencé à nous plonger dans le code existant pour améliorer notre
compréhension de cette partie et être capable de fournir de meilleures
estimations pour les changements à venir.

Le but principal de ce code était pour chaque client de calculer leur facture et
de l'envoyer à une API. Ce code avait été écrit relativement proprement même si
il manquait de flexibilité. Il s'agissait d'un fonction d'un seul bloc sans test,
quasiment sans journaux et sans documentation. Il semblait responsable de rares
problèmes apparaissant de manière aléatoire.  Ce morceau de code avait été écrit
5 ans plus tôt par l'un des cofondateurs et n'avait été changé que rarement par un
des premiers employés qui a depuis quitté la société.

Était-ce _réellement_ un problème&nbsp;? Les factures partaient. La société
gagnait de l'argent. Il n'y avait a priori aucun problème. Tout cela, aurait pu
nous dissuader de toucher à cette partie, mais en même temps nous savions que de
gros changements étaient en préparation et qu'en simplifiant cette fonction,
nous allions gagner du temps.

Nous avons refactorisé cette fonction pendant une unique itération et nous avons
ajouté les journaux manquants. C'est à ce moment là que nous avons découvert ce
que nous avions _vraiment_ corrigé. Une personne de la compatibilité est venu
nous voir en demandant pourquoi le nombre de factures émises avait augmenté
dernièrement. Il s'avère que l'ancien code échouait silencieusement et par
conséquent certaines actions de nos clients n'étaient pas facturées. Les rares
problèmes évoqués plus haut cachaient en réalité un problème plus important de
non facturation qui aurait du nous alerter. Il semble que le manque à gagner
s'élève à un peu plus de 1 million de dollars par an.

## Rembourser la dette technique ne paie pas toujours

Même si cette histoire est totalement vraie, rembourser la dette technique n'a
pas toujours un effet aussi considérable.

<figure class="object-center bordered">
    <a href="/images/tetris-balanced-technical-debt.png"><img src="/images/660x/tetris-balanced-technical-debt.png" alt="Une partie de Tetris avec quelques trous"></a>
    <figcaption>
    Trouver le bon niveau de dette technique
    </figcaption>
</figure>

J'aimerais pouvoir donner un conseil avisé sur quand il faut rembourser de la
dette technique. Malheureusement, la réponse est&nbsp;: c'est compliqué et **il
s'agit toujours de trouver un compromis**. Vous pouvez avoir le code le plus
propre et le mieux testé du monde sans aucun client prêt à payer pour. À
l'inverse, votre entreprise peut ravir ses clients et avoir des affaires
fleurissantes en mettant en œuvre du code de mauvaise qualité.

En guise de conseil, il me semble que les chef·fes de produit et les développeur·ses
devraient connaître et comprendre ce qu'est la dette technique et le fait qu'on
ne peut l'éviter pour toujours. Après tout, comme dans une partie de Tetris, on
ne peut jamais gagner dans le logiciel.
