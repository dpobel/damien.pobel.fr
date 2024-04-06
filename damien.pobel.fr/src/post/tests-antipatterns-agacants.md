---
title: "Tests : mon top 8 des anti-patrons les plus agaçants"
tags: bonnes pratiques, unit test, qualité, code, behaviour driven development, tdd, php, javascript, ingénierie logicielle
lang: fr
published: 2021-04-08
photos:
    - images/angry-cat.jpg
---

Il y a un peu plus trois ans, je publiais [Au fait, c'est quoi un bon test
unitaire, d'intégration ou
fonctionnel ?](/post/bon-test-unitaire-integration-fonctionnel), un billet où je
décrivais quelques caractéristiques d'une bonne suite de tests logiciel. Ce
billet reste d'actualité mais depuis, je me suis frotté à plusieurs
environnements accumulant parfois plusieurs _antipatterns_, certains
particulièrement pénibles. Alors cette fois ci, je prends le sujet dans l'autre
sens, voici une sélection des anti-patrons liés aux tests que j'ai pu croisés
plus ou moins récemment.


<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/angry-cat.jpg" alt="Un chat donnant l'impression d'être agacé">
    <footer>
    Photo par <a
    href="https://pixabay.com/users/skitterphoto-324082/">Skitterphoto</a>
    </footer>
</figure>

## Les tests pas lancés automatiquement

Une suite de tests qui n'est pas lancée automatiquement ne sert (quasiment) à
rien. Bien sûr, si on se lance dans un effort pour écrire des tests (en
particulier des tests _end to end_ ou fonctionnels), cet état peut être
_transitoire_ le temps d'investir suffisamment de temps pour automatiser
l'ensemble mais clairement il faut essayer d'en sortir le plus rapidement
possible sinon arrivera invariablement le moment où un·e développeur·se cassera
quelque chose sans s'en rendre compte et généralement, il faut pas longtemps 😉

Dans cette catégorie, il arrive aussi qu'une partie des tests ne soient pas
lancer automatiquement, par exemple lors de l'ajout de code dans un endroit pour
lequel le _test runner_ n'est pas configuré. C'est assez vicieux et pas
forcément évident à détecter; on peut éventuellement
surveiller l'évolution [du taux de couverture et/ou jeter un œil à un rapport de
couverture](/post/code-coverage-taux-couverture-tests/).

## Les tests superficiels

> ce rapport de bug est surprenant, on a un test qui vérifie exactement ce comportement\
> [quelques minutes plus tard…]\
> aaah reproduit, le test ne vérifiait rien en fait 😠

Écrire des tests c'est bien, écrire des tests qui vérifient réellement un
comportement c'est encore mieux. Par exemple, imaginons que vous vouliez tester
une API HTTP plus ou moins RESTful qui permette de créer une entité quelconque
avec une requête `POST` et qui lorsque tout se passe bien renvoie [une réponse
201](https://httpstatuses.com/201). Si les tests de cette fonctionnalité se
contentent de ne vérifier que le statut HTTP ou quelques trucs dans le contenu
de la réponse, eh bien vous avez un test (très) superficiel, il ne teste que
quelques détails et passe à côté de la fonctionnalité principale qui pourrait
très bien être complètement cassée sans que le test supposé la couvrir n'échoue.
Bon c'est mieux que rien mais ça donne un faux sentiment de sécurité.

Pour valider la qualité et la précision des tests, il est possible d'employer
une technique appeler [Mutation
testing](https://blog.ippon.fr/2020/05/20/le-mutation-testing-ou-comment-tester-ses-tests/).
Il s'agit en quelques sorte de tester les tests en introduisant artificiellement
des bugs pour vérifier sur les tests échouent, si ce n'est pas le cas, vous avez
probablement des tests superficiels !

## Les tests _flaky_

> ptet bien que oui, ptet bien que non
>
> -- un test _flaky_

Le grand classique des tests qui échouent seulement de temps à autre sans raison
apparente. Ce type de problème peut être particulièrement compliqué à
diagnostiquer et plus les tests sont de haut niveau plus le nombre de
dépendances augmentent et avec elles les risques de _flakyness_.

Parfois, c'est beaucoup plus simple qu'il n'y paraît. Pour l'anecdote, il m'est
déjà arrivé de subir des échecs aléatoires de tests en raison d'une mauvaise
utilisation de [`rand()`](https://www.php.net/rand) dans des _fixtures_ qui
n'avaient de toute manière aucune raison d'être aléatoires.

Malheureusement sur cet aspect, il n'y a pas de solution magique. Je dirais que
le principal est de surveiller activement ce genre de comportement et surtout ne
pas laisser la situation s'enliser car les choses auront plutôt tendance à
empirer qu'à se résoudre d'elles-mêmes.

## Les tests difficiles à interpréter car trop verbeux

> Ah je crois que les tests sont en train d'échouer… Ah non en fait, ah je sais
> pas, c'est normal d'avoir 3000 lignes sur la sortie après une minute
> d'éxécution sur la CI ?
>
> -- un·e dévéloppeur·se proche de la noyade

Ce problème est assez typique des tests avec du code en JavaScript, il faut dire
que les méthodes `console.log` et consorts sont tellement faciles d'accès,
qu'elles finissent par être utilisées avec un peu trop de zèle au moindre cas
limite. La sortie des tests finit par être un joyeux bazar au point que
parfois il devient difficile de savoir si les tests passent ou échouent.
[Jest propose une option
`--silent`](https://jestjs.io/docs/cli#--silent) mais pour moi cela
s'apparente plus à mettre la poussière sous le tapis qu'à résoudre le soucis.
Dans un monde idéal, les tests devraient être silencieux et si quelque chose
n'est pas correct, ils devraient juste échouer; [oui, prop-types c'est quoi que
je regarde en fronçant les sourcils](https://github.com/facebook/prop-types/issues/28) !

## Les tests incompréhensibles car rédigés avec des termes inconnus

> Entretien d'embauche :
>
> - nous on fait du <abbr title="Domain Driven
> Design">DDD</abbr> et on a des tests en mode <abbr title="Behavior Driven
> Development">BDD</abbr>
> - super, vous mettez l'accent sur la qualité, où est ce que je signe ?

En réalité, c'était l'un des plus gros mensonges de ma
carrière professionnelle… Il y avait vaguement [une approche DDD
technique ou
tactique](https://www.lilobase.me/le-domain-driven-design-sous-langle-strategique-une-introduction/)
et oui des tests écrits en Gherkin mais [sans l'aspect
comportement ni la plupart du temps le moindre bout de domaine](https://blog.ippon.fr/2021/02/24/4-idees-recues-sur-le-bdd-behavior-driven-development/)
et je parle pas de l'implémentation des phrases…

Bref, qu'on fasse du BDD ou non, en lisant les tests, le ou la développeur·se
doit pouvoir comprendre ce que fait le composant/la fonction/l'API testée et
comment elle est supposée être utilisée. C'est pourquoi le nommage doit être
particulièrement soigné. Il est aussi évident que les tests sont des bouts de
code qui vont nécessiter de la maintenance. Dans ces conditions appliquer [les
principes de _clean code_](/post/clean-code/) est plus que jamais une bonne idée
que votre futur·e vous appréciera sans aucun doute.

## Les tests qui échouent avec un message d'erreur cryptique

En contrôlant la verbosité et en soignant le nommage, on évite pas mal d'écueils
à ce niveau. Malgré tout, lorsqu'on écrit des tests, il faut toujours avoir à
l'esprit que le but est qu'ils échouent en communiquant clairement le problème.
Par exemple, si vous utilisez [les assertions de
PHPUnit](https://phpunit.readthedocs.io/en/9.5/assertions.html), il est plus que
probable que vous devriez penser à utiliser le paramètre optionnel `$message`
pour améliorer cet aspect. Toujours avec PHPUnit, l'utilisation de _data
provider_ permet généralement de tester rapidement un grand nombre combinaisons
mais dans ce cas,
[bien nommer chaque combinaison améliorera grandement la compréhensibilité d'un
éventuel
échec](https://phpunit.readthedocs.io/en/9.5/writing-tests-for-phpunit.html#writing-tests-for-phpunit-data-providers-examples-datatest1-php)
et en bonus devoir trouver un nom à chaque combinaison, vous forcera peut-être à
[simplifier votre API](/post/au-cas-ou/) et/ou à détecter des cas qui n'ont
aucun sens dans votre domaine.

## Les tests qui _mockent_ l'Univers

Un grand classique d'une stratégie de tests pas vraiment réfléchie du genre
_tout doit être testé unitairement_ et/ou d'un
peu trop d'attention portée [au taux de
couverture](/post/code-coverage-taux-couverture-tests/). En soit, il est normal
de _mocker_ les dépendances d'un composant que l'on souhaite tester
unitairement. Néanmoins, si le composant en question a beaucoup de dépendances
et/ou [des dépendances qui proviennent d'autres projets](https://matthiasnoback.nl/2018/02/mocking-at-architectural-boundaries-persistence-and-time/),
il est clair que le test risque d'être pénible à maintenir et pire, il pourrait
même être un frein au _refactoring_ et à l'évolution du composant testé ! Pour
éviter cela, deux solutions complémentaires :

1. D'un côté, on peut considérer que le composant en question nécessite un
   _refactoring_ pour diminuer le nombre de dépendances (avec autant de
   dépendances il est probable qu'il ait un peu trop de responsabilités) et pour
   s'abstraire des dépendances que l'on ne contrôle pas, l'idée étant de tendre
   vers [une architecture hexagonale ou en
   oignon](https://fr.wikipedia.org/wiki/Architecture_hexagonale_(logiciel)#Variantes).
1. On peut aussi opter pour des tests de plus haut niveau comme des tests
   d'intégration ou fonctionnels pour éviter de tout _mocker_ et tester un peu
   moins unitairement chaque composant. Le prix à payer est une mise en place
   des tests potentiellement un peu plus complexe et éventuellement un peu
   moins de couverture (certains cas limites peuvent être plus difficiles à
   obtenir) mais en contrepartie ces tests seront plus simples et surtout à
   partir du moment où la fonctionnalité est couverte, on peut la retravailler
   en tout sérénité et éventuellement se lancer dans le _refactoring_ évoqué
   précédemment.

Comme toujours en développement, c'est une affaire de contexte, de compromis et
de stratégie.

## Les tests interdépendants

> Je comprends pas, j'ai changé 3 détails dans une méthode et j'ai 30 tests qui
> échouent dans les tests fonctionnels de l'API REST
>
> -- Un·e développeur·se devant un château de cartes qui s'effondre

Alors bien sûr il est possible de faire échouer beaucoup de tests avec peu de
changements mais la dernière fois où je me suis trouvé en face de cette
situation la raison était un peu différente. J'avais effectivement introduit un bug
dans la création d'une entité quelconque ce qui aurait du faire échouer 3
tests mais en fait les 27 autres assumaient que ces premiers tests
passaient pour utiliser les données créées… une belle manière de rendre les
choses confuses. J'ai aussi vu des suites de tests ou certains tests en
appellent directement d'autres voire même issues d'une autre suite de tests ! Là
encore, c'est l'effet château de cartes au moindre bug.

---

Tout ceci est du vécu; heureusement pour ma santé
mentale, j'ai jamais vu de projet qui cumulait tous ces _antipatterns_, après
j'ai aussi vu pas mal de projets _critiques_ sans aucun test 😀

Plus sérieusement, tous ces défauts ne sont pas seulement agaçants, ce sont
surtout des obstacles [pour travailler
efficacement](/post/maximiser-efficacite-developpeurs/) et pour produire un
logiciel robuste et de qualité ce qui est quand même un comble pour une
technique justement supposée améliorer ces aspects.
