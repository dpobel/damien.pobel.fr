---
title: "Au fait, c'est quoi un bon test unitaire, d'intégration ou fonctionnel ?"
tags: bonnes pratiques, unit test, travis ci, métier, travail, qualité, ingénierie logicielle
lang: fr
published: 2018-03-27 23:20
updated: 2024-04-09
top-priority: 100
evergreen: true
photos:
    - images/testing.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/testing.jpg" alt="Feuille de papier dans une machine
    à écire où il est écrit 'Testing'">
    <figcaption>
    Testing par Nick Youngson sous licence CC by-sa 3.0
    </figcaption>
</figure>

Dans mon nouveau travail, un de mes sujets du moment concerne l'amélioration de
la stratégie de tests. C'est un sujet qui me tient à cœur, en particulier parce
qu'[avec les années j'ai appris](/post/apprendre-a-l-ecole/) qu'une bonne
stratégie de tests rend le travail plus efficient (à plusieurs niveaux) tout en
apportant une certaine sérénité dans la durée. On s'habitue vite à son petit
confort 😀 mais pour un confort maximal, il faut non seulement écrire des tests
mais aussi écrire de bons de tests. Mais au fait, qu'est ce qui caractérise un
*bon* test ?

## Automatisé

J'ai l'habitude de dire de manière un peu provocatrice qu'un test qui n'est pas
automatisé ne sert à rien. OK, c'est un peu exagéré mais si la ou les suites de
tests ne sont pas lancée(s) automatiquement, arrivera forcément le moment où on
va oublier… Les plateformes d'intégration continue sont là pour ça, alors à vos
[Travis CI](https://travis-ci.com/), [Gitab
CI](https://about.gitlab.com/features/gitlab-ci-cd/),
[Jenkins](https://jenkins.io/), ou que sais je encore.

## Rapide et facile à lancer

Même si les tests sont automatisés sur une plateforme d'intégration continue, il
est toujours intéressant de pouvoir les lancer en local à condition qu'ils
s'exécutent sans avoir besoin de toucher à *n* fichier(s) de configuration, de
maintenir un environnement complexe et dans un temps raisonnable où à défaut de
pouvoir en exécuter qu'une partie. Évidemment, c'est une question de praticité
pour les développeur·ses, attendre plusieurs minutes (et *a fortiori* plusieurs
heures) entre un changement et le résultat des tests est le plus sûr moyen de
perdre sa concentration. J'ajouterais aussi qu'avec des tests faciles à lancer
et rapides, on encourage les expérimentations et les idées *un peu folles* qui
deviennent parfois plus que ça.

## Reproductible et fiable

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/fiable.jpg" alt="Grosse corde qui passe dans une
    ancre en bois">
</figure>

Je crois qu'il n'y a rien de pire qu'un test qui échoue *de temps en temps*. Comme
tout bug aléatoire (au moins en apparence) c'est pénible à corriger mais en
plus, ce type de problème diminue (à raison) la confiance accordée aux tests et
à terme le soin qu'on y apporte et donc leur valeur.

En dehors de bugs, les échecs en apparence aléatoires sont souvent dûs à une
mauvaise gestion des dates ou à l'utilisation de ressources externes. En
principe, sur un test unitaire, il n'y a pas vraiment de ressources externes,
elles sont simulées avec des bouchons (*mocks*, *stubs*, …), sinon ce n'est pas
un test unitaire. En revanche, l'utilisation de ressources externes est le
principe même des tests d'intégration ou fonctionnels mais même là, pour des
questions de fiabilité (et de temps d'exécution), il vaut mieux que le serveur
de base de données ou d'indexation par exemple soit le plus local possible.

## Facile à interpréter quand il échoue

On perd souvent de vue qu'on écrit des tests non pas pour qu'ils passent mais au
contraire dans le but qu'ils échouent. Un test peut échouer de beaucoup de
manières, mais je suis sûr qu'en tant que développeur·se vous préférez avoir un
peu de contexte, plutôt qu'un lancinant et un peu énigmatique:

```
1) test\MagicResponseTest::testCreate
Failed asserting that 43 matches expected 42.
```

Que signifie `42` ? Quel rapport avec la classe `MagicResponse` ? En
premier lieu, le nommage des tests est important. Dans un test unitaire, une
convention pratique et facile à mettre en place consiste à nommer les méthodes
de test d'après les méthodes publiques ou les fonctions testées, en suffixant
éventuellement ces méthodes pour les différents cas traités. Sur un test de plus
haut niveau, le nom devra plutôt refléter la fonctionnalité testée. Certains
préconisent même d'[utiliser des espaces insécables pour obtenir un nom
lisible](http://mnapoli.fr/using-non-breakable-spaces-in-test-method-names/).
Dans l'exemple ci-dessus, le nommage paraît correct si on considère que c'est un
test unitaire et que la classe `MagicResponse` a une méthode `create`. En
revanche, le message d'échec est tout sauf informatif.

Pour éviter cela, en premier lieu, la plupart des méthodes/fonctions
d'assertions acceptent un message optionnel utilisé lorsque une assertion échoue
(par exemple avec
[PHPUnit](https://phpunit.readthedocs.io/en/latest/assertions.html#assertequals)
ou [Node.js
Assert](https://docs.phpunit.de/en/11.1/assertions.html#assertequals)
ou [Chai.js](http://www.chaijs.com/guide/styles/#assert) ou…). Ça n'a l'air de
rien mais préciser ce message peut totalement transformer l'effort
d'interprétation d'un test qui échoue surtout lorsque celui-ci procède à
plusieurs assertions. En plus de cette fonctionnalité, il est aussi possible
d'implémenter des assertions de plus haut niveau, plus *métiers* qui en plus de
rendre plus abordables les échecs, peuvent également rendre le code des tests
plus expressifs. Tous les tests ne se résument à de bêtes comparaisons de
chaînes ou de nombres.

L'interdépendance entre tests est une autre cause d'échecs difficiles à
interpréter. Si un test A a besoin que l'exécution de B soit un succès et B a
lui aussi besoin qu'un test C passe, le moindre problème faisant échouer C fera
échouer les 2 autres. En multipliant ce type de dépendance, on obtient
rapidement un joyeux bazar coloré au moindre bug et surtout des échecs très
vaguement liés au bug en question, au lieu d'être une aide, les tests ajoutent de
la confusion. Ce type de situation se produit parfois en appliquant le principe <acronym title="Do not Repeat Yourself">DRY</acronym>
avec [un peu trop de zèle](https://hackernoon.com/this-is-not-the-dry-you-are-looking-for-a316ed3f445f)
et parfois, ce type de dépendance est plus subtile. Dans ce cas, je crois que le
meilleur remède est une bonne nuit de sommeil et un peu de patience.

## Alors, confortablement installé·e ?

Voila ma petite recette pour un confort maximal avec des tests logiciels 😀 Oui
ça paraît un peu long et pourtant, avec un tout petit peu de bonne volonté, de
pratique et de rigueur, il n'y a rien de vraiment compliqué. En fait, souvent le
plus compliqué est de démarrer la démarche de tests (automatisés !) et de
la poursuivre pour arriver à une couverture fonctionnelle suffisante, et même
sans forcément suivre toutes les bonnes pratiques (celles-ci ou d'autres), cet
investissement est déjà largement rentable.
