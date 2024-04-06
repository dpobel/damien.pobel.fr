---
title: Les vertus de la revue de code
tags: bonnes pratiques, métier, outil, code, git, qualité, ingénierie logicielle
published: 2018-05-06 23:21
top-priority: 10
photos:
    - images/revue-de-code.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/revue-de-code.jpg" alt="Loupe zoomant sur un
    mécanisme">
</figure>

La revue de code (*code review*) est loin d'être une pratique récente,
apparemment elle a été formalisée chez IBM dans les années 70 sous le terme de
[Code
Inspection](https://researcher.watson.ibm.com/researcher/view_page.php?id=6981)
et même [Fagan Inspection](https://en.wikipedia.org/wiki/Fagan_inspection) du
nom de son inventeur. Les revues de code que je pratique ou vues pratiquer sont un
peu moins formellement structurées mais finalement pas tellement éloignées des
inspections de Fagan. Il faut dire que depuis les années 70 les outils ont *un
peu* évolué. Les gestionnaires de versions décentralisés comme git associés à
des plateformes comme Github ou Gitlab rendent la pratique des revues de code
super simple et quasi sans autre contrainte que la nécessité de travailler sur
une branche dédiée et de cliquer sur un bouton pour créer une Pull ou Merge
Request après avoir poussé la branche en question. Il y a d'autres manières de
mettre en place des revues de code mais c'est sans doute la plus
simple. Mais au fait, qu'est ce qu'on gagne à faire des revues de code&nbsp;?

## Détecter les défauts rapidement

Le but d'une revue de code est de **détecter au plus tôt les défauts dans le
code soumis**. En effet, plus un défaut est détecté tôt moins sa correction est
coûteuse. Aussi, le *code* en question n'est pas nécessairement un bout de
programme informatique au sens strict, de la documentation ou n'importe quel
document texte comme un document de conception peuvent parfaitement être revus
de cette manière. Au delà de cet objectif relativement évident, dans la pratique
les revues de code créent une suite d'étapes où chacune est l'occasion
d'améliorer le code, de s'améliorer soi-même et même de faire progresser [toute
une équipe](/post/travail-d-equipe/). Voyons ce qu'il se passe à chaque étape.

## Auto critique

La première étape pour obtenir une revue consiste à décrire le code qui devra
être validé, vous savez dans cette grande zone de texte trop souvent ignorée au
moment de la création d'une pull/merge request 😁 Pourtant écrire une
description assez complète est souvent une bonne occasion de prendre un peu de
recul par rapport à son propre code. Je sais pas pour vous mais il m'arrive
relativement fréquemment de me rendre compte à ce moment là que mon *patch*
n'est pas bon ou pas idéal. Je suppose que ce processus s'apparente à [la
méthode du canard en
plastique](https://fr.wikipedia.org/wiki/M%C3%A9thode_du_canard_en_plastique)
mais l'effet sur le code produit est parfois spectaculaire et pourtant la revue
n'a pas encore vraiment commencée&nbsp;!

## Auto revue

Ensuite, j'ai l'habitude (et je conseille vivement) de faire une auto-revue
juste avant ou juste après la soumission. Le fait de voir les changements dans
un autre contexte permet souvent de détecter des défauts passés inaperçus jusque
là. Le plus souvent ce sont des aspects relativement mineurs comme le nommage
d'une variable, [un commentaire en trop ou au contraire
manquant](/post/juste-dose-commentaires-dans-le-code/), un `console.log` oublié,
quelques fautes d'orthograhe… Là encore avant même la revue, l'amélioration
peut-être significative même si l'idée est surtout de faire place nette pour les
futur·es réviseur·ses (*reviewers*) pour les laisser se concentrer sur
l'essentiel.

## Place aux robots

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/robots.jpg" alt="Personnages ressemblant à des robots">
</figure>

Dans le même esprit, idéalement la plateforme de d'intégration continue (CI)
devrait être la réviseuse suivante, pour faire [tourner les tests
logiciels](/post/bon-test-unitaire-integration-fonctionnel/) avec les
changements mais aussi tout outil automatisable capable de détecter des
problèmes potentiels&nbsp;: *linters* en tout genre, analyseurs statiques, correcteur
orthographique,&nbsp;… Là encore, au delà de la détection de défaut, tout
problème détecté par un robot est une charge cognitive en moins pour les
réviseur·ses humain·es qui pourront se concentrer sur autre chose.

## Communication

Sans avoir réellement commencée, la revue a déjà porté quelques fruits mais le
meilleur est à venir. Évidemment, les réviseur·ses vont trouver des défauts mais
au delà de ça, la revue est aussi un prétexte ou un moyen de communication.  Les
notifications des revues en attente ou validées permettent d'avoir une vision de
ce qu'il se passe. Mais surtout les revues sont un lieu d'échange où chaque
membre de l'équipe a l'opportunité de partager son savoir, ses compétences et
d'apporter sa petite touche qu'on soit l'auteur·e du changement ou réviseur·se.
Certain·es sont plus sensibles à la lisibilité, d'autres aux performances ou
d'autres encore aux tests. Les expérimenté·es apportent leur expérience et les
jeunes les derniers trucs à la mode 😁 ce qui pousse parfois à se poser des
questions intéressantes. Quelque part, c'est une manière de laisser la diversité
de l'équipe et l'intelligence collective s'exprimer avec comme résultat un
meilleur partage de connaissance, une cohérence accrue et une meilleure qualité.

---

En résumé, la revue de code est une pratique relativement facile à mettre en
œuvre qui permet d'améliorer le code produit tout en bénéficiant directement à
l'équipe dans son ensemble. Que demander de plus&nbsp;?
