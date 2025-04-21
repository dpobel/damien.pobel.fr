---
title: "Chasser le superflu"
tags: code, métier, bonnes pratiques, ingénierie logicielle, qualité, complexité, dette technique
lang: fr
published: 2025-04-21
photos:
    - images/superflu-et-toi.png
---

Il y a quelques jours, je suis tombé sur [Developer
philosophy](https://qntm.org/devphilo). Je trouve l'exercice amusant, je vais
essayer de faire plus ou moins la même chose ici en listant et détaillant ce que
j'appellerais plutôt des principes qui me semblent essentiels et qui sont issus
de mon expérience.

<figure class="object-center bordered">
  <a href="/images/superflu-superheros-inutile.png">
    <img loading="lazy" src="/images/660x/superflu-superheros-inutile.png" alt="Superflu, le superhéros inutile">
  </a>
  <footer>Extrait de <a href="https://editions.ptilouk.net/superflu/">Les aventures inutiles de Superflu</a> par <a href="https://ptilouk.net/">Gee</a> sous licence <a href="https://creativecommons.org/licenses/by-sa/2.0/fr/">CC BY-SA 2.0</a></footer>
</figure>

Je commence donc par le premier qui me vient à l'esprit que j'aime bien exprimé
avec la citation suivante attribuée à Antoine de Saint-Exupéry :

> La perfection est atteinte, non pas lorsqu'il n'y a plus rien à ajouter, mais
> lorsqu'il n'y a plus rien à retirer.

En d'autres termes, je déclare la chasse au superflu ouverte 😃
En pratique, qu'est ce que cela signifie ?

L'application la plus évidente de ce principe consiste à éliminer ce qu'on
appelle [le code mort (_dead code_)](https://refactoring.guru/smells/dead-code).
Il s'agit sans doute de l'un des _code smells_ les plus connus qui désigne le code
qui ne peut pas être atteint. Équipé·e d'un bon <abbr title="Environnement de
développement intégré">IDE</abbr>, de quelques outils d'analyse statique et [de
bons tests automatisés](/post/bon-test-unitaire-integration-fonctionnel/), il
est relativement facile de le détecter et de l'éliminer au niveau d'une fonction
ou d'un fichier. En revanche, au niveau d'un projet conséquent avec un peu
d'historique (comprendre du code _legacy_ 😜) c'est une autre histoire. Petite
anecdote, il y a quelques mois, sur deux projets TypeScript j'ai poussé pour
essayer de rationaliser l'usage du mot clé `export` en introduisant un script
dans la CI pour détecter les changements qui incluent des `export` inutilisés
(basé sur [ts-unused-export](https://www.npmjs.com/package/ts-unused-exports))
et pour progressivement éliminer les `export` inutilisés existants. Cette
démarche s'inscrivait déjà dans une volonté de _chasser le superflu_ mais mon but
initial était surtout de faciliter le _refactoring_ (sans mot clé `export`, on
est certain d'avoir un périmètre limité au fichier) et au final, cet exercice
a permis de déterrer une quantité de code mort plus que conséquente (plusieurs
milliers de lignes de code 😮) qui n'était là que être exporté sans être
utilisé et qui occasionnait de la confusion et zéro valeur ajoutée. Hop [un peu
moins de dette technique](/post/dette-technique-partie-tetris/) !


<figure class="object-center bordered">
  <a href="/images/superflu-manque-rien.png">
    <img loading="lazy" src="/images/660x/superflu-manque-rien.png" alt="Superflu, le superhéros inutile">
  </a>
  <footer>Extrait de <a href="https://editions.ptilouk.net/superflu/">Les aventures inutiles de Superflu</a> par <a href="https://ptilouk.net/">Gee</a> sous licence <a href="https://creativecommons.org/licenses/by-sa/2.0/fr/">CC BY-SA 2.0</a></footer>
</figure>

Si on prend un peu de hauteur, appliquer ce principe dans le design d'une API
(d'une simple méthode comme d'une API web type REST ou GraphQL) est un bon outil
pour s'éviter un peu de complexité. Par exemple, si une méthode accepte des
paramètres optionnels mais qu'ils ne sont jamais utilisés ou que cette méthode
reçoit un paramètre avec toujours la même valeur ou que sa valeur de retour
n'est jamais utilisée vous avez probablement du _superflu_ sous les yeux qui
induit [une certaine complexité](/post/complexite-charge-cognitive/) et qui
aurait tout intérêt à être éliminé pour améliorer la maintenabilité. On parle
parfois de _réduire la surface d'API_. L'exercice est assez mécanique et
d'autant plus simple si on l'applique à la création du code en question. Pour ce
qui me concerne, c'est le genre de chose que je fais au fil de l'eau et que je
vérifie [dans une revue de code](/post/vertus-revue-de-code/).

Si on prend encore un peu plus de hauteur, ce principe s'applique aussi très
bien à l'ajout de toute fonctionnalité. Dit autrement, il est toujours
intéressant de questionner la solution vis à vis du besoin qu'on cherche à
satisfaire pour systématiquement en tirer l'essentiel et surtout en retirer tout le
reste. Dans ce contexte, cette démarche permet de restreindre autant que
possible le périmètre des changements et encore une fois de réduire la
complexité mais également de permettre de se concentrer sur l'essentiel et
d'obtenir un résultat satisfaisant le plus rapidement possible et, à partir de
là, d'itérer jusqu'à atteindre une solution qui apporte suffisamment de valeur.
Toute ressemblance avec l'un [des principes du manifeste
agile](https://agilemanifesto.org/iso/fr/principles.html) n'est PAS fortuite
😛 :

> La simplicité – c’est à dire l'art de minimiser la quantité de travail
> inutile – est essentielle.

Et puis cette démarche va au delà du code et des fonctionnalités, elle
s'applique par exemple très bien au _workflow_ des développeur·ses. Qui n'a
jamais subi un _workflow_ (CI, CD, _commit hook_,…) plus lourd que nécessaire ?
Ou à toutes ces réunions qui pourraient être un simple email 🫠 Ici, il s'agit
plus [d'un potentiel problème
d'efficacité](/post/maximiser-efficacite-developpeurs/) au quotidien mais là
encore le superflu peut peser lourd.

---

Bref, sans surprise, _chasser le superflu_ est un exercice bénéfique pour la
qualité d'un projet logiciel et la productivité des développeur·ses.  Plus
qu'une simple habitude, pour moi, **cette démarche doit être active et
systématique**. Je la considère comme une clé dans l'obtention d'un code
maintenable sur le long terme et dans l'efficience au quotidien.
