---
title: "Revermont.bike: VTT dans le Revermont"
lang: "fr"
tags: vtt, gps, javascript, metalsmith, bourg-en-bresse, ain, jura, jamstack
published: 2014-10-20T21:36:26+02:00
---

<figure class="object-center">
<img src="/images/660x/revermont_bike.png" alt="Capture d'écran de
http://vtt.revermont.bike/"></a>
</figure>

Il y a trois semaines j'ai mis en ligne mon dernier projet personnel&nbsp;:
Revermont.bike&nbsp;! Comme le titre de ce post le suggère, il s'agit d'un site
proposant [des traces GPS pour le VTT dans le
Revermont](http://vtt.revermont.bike/). Plus particulièrement, ce site propose
des [parcours de randonnées](http://vtt.revermont.bike/randonnees/) et tente de
répertorier [les plus beaux single tracks du Revermont pour le
VTT](http://vtt.revermont.bike/single-tracks/)

Single track&nbsp;? Revermont&nbsp;? Mais qu'est ce que c'est que tout ça&nbsp;?
[Single track](http://vtt.revermont.bike/tags/single-track/) est un terme du
[jargon du VTT](http://vtt.revermont.bike/glossaire/) (ou plus largement des
sports de nature) qui désigne un chemin (très) étroit; la plupart des VTTétistes
adorent ça mais il n'est pas toujours aisé de les découvrir.

Et le Revermont alors&nbsp;? [Le
Revermont](http://vtt.revermont.bike/tags/revermont/) est une région naturelle
vallonnée à cheval sur les départements de l'Ain et du Jura; en gros entre
Lons-le-Saunier au nord ouest, Point d'Ain au sud, la vallée de l'Ain à l'est et
l'axe Bourg-en-Bresse/Lons-le-Saunier à l'ouest. De mon point de vue, il s'agit
d'une super région pour pratiquer le VTT, mais [étant originaire de cette
région](http://vtt.revermont.bike/posts/sortie-vintage/), je suis peut-être un
peu subjectif ;-)

Pour le côté geek et plomberie, il s'agit d'un site entièrement statique (c'est
à la mode ces derniers temps) généré avec
[Metalsmith](http://www.metalsmith.io/).  Metalsmith est un petit outil écrit en
JavaScript que je trouve absolument brillant. Pour les plus curieux, les sources
du site sont entièrement libres et disponibles sur Github dans le dépôt
[dpobel/revermont.bike](https://github.com/dpobel/revermont.bike/).
Techniquement parlant, il y a pas mal de choses à dire et je suis plutôt fier du
système complet (avec du grunt, bower, metalsmith, gpsbabel, des tests unitaires
et fonctionnels, des graphiques *server side* avec Rickshaw, de la cartographie
avec Leaflet et des fonds de cartes IGN,...) mais les détails seront pour de
futurs billets.

Ah, j'allais oublier, Revermont.bike est évidemment sur
[Twitter](https://twitter.com/Revermont_bike) et
[Google+](https://plus.google.com/107813370030366851762/posts) et si certains
veulent venir rouler dans le Revermont, faites moi signe&nbsp;!&nbsp;:-)
