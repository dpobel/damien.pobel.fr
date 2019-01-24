---
title: Comment je fais ma veille technologique
published: 2019-02-06 18:15:35
tags: métier, bonnes pratiques, blog
photos:
    - images/vieux-outils.jpg
---

Depuis [début janvier 2018](/post/veille-semaine-01-2018/), toutes les semaines
(ou presque) je publie [un résumé de ma veille technologique](/tag/veille/) en
sélectionnant une petite dizaine de liens, chacun accompagné d'une courte
description.  La publication hebdomadaire est un truc que j'avais en tête depuis
un bon moment mais ce n'est finalement que la partie émergée de ma veille et
plusieurs personnes m'ont demandé comment je procédais, alors voila quelques
_secrets de fabrication_ même si je ne crois pas faire grand chose de très
original ;-)

<figure class="object-center bordered">
    <img src="/images/660x/vieux-outils.jpg" alt="Un marteau et une tenaille qui
    ont l'air assez anciens et quelques clous">
</figure>

## Sources

### ❤ RSS ❤

Ma première et principale source est une longue liste de flux RSS accumulés au
cours des années. J'utilise [Feedly](https://feedly.com/) comme lecteur RSS et
tout ce qui concerne ma veille technologique est regroupé dans une catégorie
*Tech* dont voici [l'export OPML](/files/tech.opml) et [une version
HTML](/page/flux-rss-tech/).  Comme j'ai d'autres sources d'information et j'ai
pris l'habitude d'ajouter quasi systématiquement le flux RSS (quand il existe)
d'un site avec un article intéressant. Cette liste est donc en perpétuelle
évolution.

Au passage, par pitié si vous avez un site, fournissez un flux RSS et [mettez la
balise `<link>` correspondant sur toutes les
pages](https://www.mnot.net/rss/tutorial/#telling-people-about-your-feed) afin
qu'il puisse être découvert *automatiquement* par exemple avec [l'extension
Feedly Subscribe Button
Extension](https://browsernative.com/feedly-chrome-extension/)… et si en plus
vous pouviez [ne pas utiliser Medium](http://tonsky.me/blog/medium/), ce serait
encore mieux `</râlage>`.

### Newsletters

Même si je préfère (et de loin) suivre des flux RSS, les newsletters sont une autre
source incontournable de ma veille. Il en existe des tas et pour ma part je suis
abonné aux listes suivantes&nbsp;:

* [JavaScript Weekly](https://javascriptweekly.com/)
* [Hacker Newsletter](https://www.hackernewsletter.com/)
* [Awesome PHP](https://php.libhunt.com/newsletter)
* [Node Weekly](https://nodeweekly.com/)
* [PHP Weekly](http://phpweekly.com/)
* [CSS Weekly](https://css-weekly.com/)
* [Frontend Focus](https://frontendfoc.us/)
* [Serverless PHP news](https://serverless-php.news/)
* [Newsletter Dareboost](https://www.dareboost.com/fr/newsletter)
* [La Lettre de la qualité Web](https://www.opquast.com/lettre-de-qualite-web-newsletter-opquast/)

et sans doute quelques autres en pause ou à la publication plus irrégulière…

### Twitter

Là encore, ce n'est pas ma source préférée mais certaines personnes partagent
des liens intéressants et d'autres en ont même fait une spécialité, je
pense notamment à [François Zaninotto](https://twitter.com/francoisz), [Jérémy
Decool](https://twitter.com/jdecool) ou encore
[Souvir](https://twitter.com/souvir) et il y en a sans doute beaucoup d'autres.

J'utilise également de temps à autre [la fonctionnalité
explore](https://mobile.twitter.com/explore) qui me propose parfois des liens
populaires que j'aurais pu rater.

### Autres

Au travail, nous avons un salon Slack appelé `#dev-veille` qui permet de
partager des liens sur différents sujets techniques plus ou moins connectés avec
le quotidien professionnel. C'est vraiment un super démarche, si vous ne faites
pas encore ça, je ne peux que vous conseillez de mettre en place un système
similaire.

En plus de tout ça, il m'arrive de temps à autre de regarder des enregistrements
de conférences même si les vidéos cadrent moyennement avec mon rituel de veille.
Et surtout, regarder une vidéo est assez chronophage même en la regardant
accélérée 1.25 ou 1.5 fois. Je vais également de temps à autre jeter un œil sur
[Reddit](https://www.reddit.com/), mais c'est de plus en plus rare.

## Quelques trucs

Au fil des années, 4 choses relativement simples ont rendu ma veille à la fois
plus efficace et plus intéressante&nbsp;:

1. la ritualisation
1. la lecture rapide
1. le tri dans les sources
1. terminer par un résumé

### Ritualisation

Depuis plusieurs années maintenant, j'ai mis en place un rituel de veille qui
cadre avec ma routine personnelle.  En principe dans une semaine *normale*, je
me rends à Lyon 3 fois par semaine, ce qui se traduit par 6 trajets en train
d'environ 1h. Une partie des trajets matinaux est dédiée à ma veille. Sur ce
trajet, ma connexion est assez variable (de la 4G par endroit à rien du tout à
d'autres…), j'ai donc pris l'habitude d'ouvrir *pour plus tard* les articles
qui me paraissent intéressants et d'avoir toujours au minimum un stock d'une
dizaine d'onglets ouverts pour m'occuper dans les zones blanches. Aussi, à force
d'emprunter le même trajet, je sais où je peux ouvrir une nouvelle page et où
c'est même pas la peine d'y penser ;-)

En dehors de ces trajets en train, il m'arrive de lire un truc ou deux dans la
journée et parfois le soir, mais finalement c'est relativement rare.

Si au début, la mise en place de ce rituel a demandé un (petit) effort, il
s'agit maintenant d'une habitude que je vois plus comme une manière de démarrer
la journée tranquillement. L'idée est de trouver un compromis pour une veille
efficiente tout en maintenant cette habitude dans la durée.

### Lecture rapide

Pendant longtemps, j'ai essayé de tout lire *normalement* .  Mais en fait, pour
la plupart des articles techniques (surtout si je suis familier avec le
domaine), [la lecture dite rapide](https://fr.wikipedia.org/wiki/Lecture_rapide)
marche vraiment bien pour moi, le ratio compréhension/temps passé est bien
meilleur.  Maintenant pour gagner encore un peu de temps, quasi systématiquement
je fais une première lecture que je le qualifierais de très rapide (en
diagonale). Si je perçois un intérêt, je fais une deuxième lecture plus ou moins
approfondie et sinon sujet suivant&nbsp;!

### Tri dans les sources

Comme je le disais plus haut, j'ajoute régulièrement de nouvelles sources dans
mon lecteur de flux RSS mais pour ne pas être submergé, il faut nécessairement
faire un peu de ménage de temps à autre. Dans le même esprit avec plus de 260
sources et même si [Feedly marque automatiquement comme lu les articles qui ont
plus de 30
jours](https://feedly.uservoice.com/forums/192636-suggestions/suggestions/3747193-no-limits-on-unread-old-items),
j'hésite pas à utiliser la fonctionnalité *Tout marqué comme lu*.

### Terminer la lecture par un court résumé

Après la lecture de chaque article, j'essaie toujours de résumer ma lecture au
moins mentalement en une phrase ou deux. Il s'agit pour moi d'être un peu moins
passif vis à vis de ce que je viens de lire et quelque part de me *forcer* à
tirer quelque chose de cette lecture. Après tout c'est le but de la veille et je
me suis rendu compte que si je ne faisais pas cet effort, j'avais
tendance à simplement enchaîner les lectures sans vraiment en tirer quoi que ce
soit.

---
En résumé ma recette de la veille efficace est la suivante&nbsp;:

1. une bonne dose de flux RSS
1. une poignée de newsletters
1. une pincée de réseaux sociaux
1. secouer le tout très régulièrement en filtrant finement et rapidement

et vous voila prêt·e à déguster une veille sans y passer des jours entiers tout
en en profitant largement :-)
