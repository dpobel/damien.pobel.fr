---
title: "La juste dose de commentaires ?"
tags: bonnes pratiques, métier, code, qualité, citation
lang: fr
published: 2019-02-18
photos:
    - images/dose-cafe.jpg
---

Comme sur quasiment toutes les *bonnes* pratiques liées au code, sur la question
des commentaires, on navigue joyeusement d'un extrême à l'autre entre *ne pas en
écrire du tout* (`#NoComment`) et *en écrire beaucoup* et comme souvent, ~~la
vérité est ailleurs~~ le bon dosage sans doute quelque part entre les deux.

<figure class="object-center bordered">
    <img src="/images/660x/dose-cafe.jpg" alt="Une dose de café en grain">
</figure>

Les commentaires font partie du code et donc comme n'importe quel code, il
faudra faire l'effort de les maintenir ce qui s'avère en réalité bien plus
compliqué qu'on pourrait le croire. En effet, comme les commentaires sont
généralement *inertes*, ils ont une fâcheuse tendance à devenir obsolètes sans
que personne ne s'en rende compte jusqu'au jour où un·e développeur·se soit
induit·e en erreur…

> Code never lies, comments sometimes do.
>
> — [Ron Jeffries](https://fr.wikipedia.org/wiki/Ron_Jeffries)

C'est pourquoi tout l'enjeu est finalement d'écrire suffisamment de commentaires
pour enrichir le code mais pas trop non plus pour s'éviter de la maintenance et
surtout être capable de garder un contenu à jour et pertinent.

Très bien, mais alors comment savoir si un commentaire est vraiment
nécessaire&nbsp;? Personnellement, pour chaque commentaire que je lis [dans une
revue](/post/vertus-revue-de-code/) ou que j'écris, je me pose systématiquement
les deux questions suivantes&nbsp;:

1. duplique t il une information déjà donnée par le code ou est il possible de
   réécrire ce code pour rendre ce commentaire inutile&nbsp;?
1. répond il à une question qui commence par <em>pourquoi</em>&nbsp;?

La première (double) question consiste à vérifier si le commentaire est inutile
car soit il paraphrase le code correspondant, soit on peut améliorer ce code
pour que ce soit le cas. Souvent, il s'agit de faire un *refactoring* léger en
renommant ou en créant des constantes, variables et autres méthodes/fonctions
avec des noms bien choisis. En d'autres termes, en cherchant à se débarrasser de
cette classe de commentaire, le code gagne en expressivité et donc en
maintenabilité. Faire cet exercice s'avère donc doublement rentable.

Après avoir répondu à la première question et en portant un peu d'attention aux
noms et à l'architecture générale même là où il n'y a pas de commentaire a
priori inutile, normalement le code devrait communiquer assez clairement ce
qu'il fait autrement dit le <i>quoi</i>. En revanche, le code seul ne communique
jamais réellement le <i>pourquoi</i>. Par conséquent, si un commentaire répond à
une question qui commence par <i>pourquoi</i>, il est très probable que celui-ci
apporte un éclairage qui permettra d'améliorer la compréhension du code par un·e
collègue (ou votre futur·e vous). À moins d'énoncer des évidences, ce type de
commentaire a donc toute sa place dans une base de code de qualité et même
mieux, ajouter ce type de commentaire participe à la qualité du code&nbsp;!

---

En bref, la question n'est ni de n'écrire aucun commentaire, ni d'en écrire
énormément, mais plutôt d'essayer d'en rédiger avec un contenu de
qualité qui ne paraphrasent pas le code. Et si c'est déjà le cas, il y a sans
doute une belle opportunité pour améliorer le code à relativement peu de frais.
