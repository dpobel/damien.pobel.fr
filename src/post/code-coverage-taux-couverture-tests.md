---
title: Le code coverage, cet éternel incompris
tags: bonnes pratiques, unit test, métier, code, qualité
lang: fr
published: 2018-07-23 22:31
collection: top
photos:
    - images/couverture.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/couverture.jpg" alt="Un chien sous une couverture">
</figure>

Le *code coverage* ou la couverture de code par les tests en bon français est
probablement l'une des métriques les plus incomprise et l'un des concepts les
plus maltraité lorsqu'on parle de tests logiciels et de qualité de code en
général. C'est d'ailleurs un bon sujet de conversation pour animer un *open
space* rempli de développeur·ses un tant soit peu intéressé·es par les tests.
Mais au fait qu'est-ce que c'est au juste&nbsp;?

D'après [Wikipédia](https://fr.wikipedia.org/wiki/Couverture_de_code):

> En génie logiciel, la couverture de code est une mesure utilisée pour décrire
> le taux de code source exécuté d'un programme quand une suite de test est
> lancée.

Si on met de côté le fait qu'en fonction des outils, des configurations ou de
qui extrait cette valeur, ce taux est un pourcentage d'instructions, de
branches, de fonctions ou de lignes, il n'y a rien de très compliqué. Mais
généralement, les choses se corsent dès lors qu'il s'agit d'interpréter ce
nombre. Doit on absolument viser 100%&nbsp;? Je plafonne à 40%, est-ce
grave&nbsp;? À partir de quel pourcentage mon code est il bien testé&nbsp;?
Pourquoi je ne parviens pas à couvrir les 2 cas qui me permettrait d'arriver à
100%&nbsp;? Et bien d'autres… À ces questions relativement légitimes s'ajoute le
fait que ce sujet a le pouvoir de polariser bon nombre de personnes sur des
positions extrêmes avec d'un côté les partisans du *il faut atteindre 100% de
couverture pour bien tester* et de l'autre les défenseurs du *le taux couverture
des tests ne sert à rien*.

Assez paradoxalement, chaque camp n'a pas totalement tort. Ce paradoxe tient au
fait que le taux couverture ne mesure que l'exécution d'une portion de code, ou
en d'autres termes, un bout de code peut être couvert mais mal voire pas du tout
testé. Par exemple, si dans un test vous appelez une fonction sans jamais
vérifier directement ou indirectement sa valeur de retour, elle fera partie du
code couvert mais on ne peut pas considérer qu'elle soit bien testée. À partir
de là, on comprend bien la faiblesse de cette métrique. Elle est d'ailleurs
d'autant plus faible qu'il est possible de gonfler artificiellement le taux de
couverture. En effet, la plupart (tous&nbsp;?) des outils permettent d'ignorer
des morceaux de code soit grâce à des annotations dans le code, soit en se
basant sur le nom des fichiers. Hormis lorsqu'il s'agit d'exclure des
dépendances, j'ai toujours trouvé étrange l'utilisation de cette fonctionnalité
qui transforme une métrique déjà faible en une métrique faible et fausse.

Malgré tout, le taux de couverture peut être un outil intéressant. Si sa valeur
absolue à un instant t reste relativement anecdotique, mesurer son évolution
dans le temps est un indicateur déjà plus pertinent. En fonction de l'historique
du projet et si l'équipe a décidé de diriger des efforts sur les tests (et
[d'écrire de bons tests](/post/bon-test-unitaire-integration-fonctionnel/)), le
*code coverage* devrait soit rester relativement stable, soit augmenter dans le
temps mais sauf exception, il ne devrait pas baisser significativement. Une
autre manière de voir ce phénomène est de considérer que, passée la phase de
prototypage où généralement on écrit peu de tests, toute modification du projet
devrait venir avec des tests qui couvrent au maximum ces changements. Au fur et
à mesure des évolutions et [par *refactorings*
successifs](http://www.arolla.fr/blog/2018/06/quand-refactorer-et-pourquoi/), le
taux de couverture va donc mécaniquement et progressivement augmenter. Dans cet
exercice, le rapport de couverture constitue un outil précieux en permettant de
naviguer dans le code source tout en différenciant les parties couvertes du code
qui ne l'est pas. D'ailleurs, viser un maximum de couverture pour chaque (petit)
changement a aussi la vertu de pousser vers une certaine simplification du code
pour éliminer du code inutile et donc difficilement testable.

---

Si on en fait pas une religion, le *code coverage* peut être un outil
intéressant. Mais plutôt que de le considérer sur l'ensemble du projet, il me
semble nettement plus pertinent de le prendre en compte sur de petites
modifications où il est plus simple de vérifier que la couverture provient de
tests de qualité. À noter qu'il est possible de tester l'efficacité des tests et
la réalité du taux de couverture avec [des tests de mutations (*mutation
testing*)](https://en.wikipedia.org/wiki/Mutation_testing) mais ce sera pour un
autre billet.
