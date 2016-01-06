---
title: Thunderbird en tant que lecteur RSS dans Firefox2 ou le truc idiot de la journée
tags: mozilla, rss, humeurs, stupides, informatique, cherry, linux
updated: 2007-07-28T16:06:56.000Z
lang: fr
node: 64242
remoteId: b1ebb16f8c4c2d1f0d162e1bfd50bdee
published: 2007-02-03T18:14:49+01:00
---
 
Ma chère et tendre me tannant pour avoir [le thème Mario Bros dans son Firefox](https://addons.mozilla.org/firefox/4345/), je lui installe Firefox 2 sous Windows 2000 et le fameux thème Marios Bros. Jusque là, rien d'extraordinaire, tout fonctionne bien, même si le thème est affreux (et encore je suis poli)...

 


<figure class="object-center"><a href="/images/firefox-avec-le-theme-mario-bros.gif">![Firefox avec le thème Mario Bros](/images/660x/firefox-avec-le-theme-mario-bros.gif)
</a></figure>




 
Ensuite, je me dis que cette nouvelle version sera pratique pour les fils RSS, puisqu'il suffira de cliquer sur le lien ou sur l'icône dans la barre d'adresse et Firefox lancera Thunderbird pour l'ajout direct du flux RSS sans avoir à chercher puis copier/coller l'adresse du fil. Je configure donc Firefox, pour utiliser thunderbird.exe en tant que lecteur RSS, je me rend sur [pwet.fr](http://pwet.fr/) pour ajouter un fil RSS et là... rien. Je me dis bon, peut être faut-il relancer le tout, je ferme Firefox et Thunderbird, je relance Firefox, je reclique sur un lien vers un fils RSS, Thunderbird se lance bien mais il affiche le flux &quot;version texte&quot; dans un des panneaux et c'est tout... Bon, peut être que ce sont mes fils RSS qui sont problématiques, je refais l'essai avec le fil de [Mozilla Europe](http://www.mozilla-europe.org), et là c'est encore mieux, Thunderbird m'ouvre carrément une fenêtre pour me demander quoi faire du fichier (&quot; *Enregister*&quot; ou &quot; *Ouvrir avec*&quot;)... Je refais les tests sous Linux en lançant Thunderbird depuis un terminal (je n'ai pas encore installé Firefox 2), et même résultat ! C'est un peu idiot tout ça ! Deux logiciels produits par la même fondation/entreprise qui ne fonctionne pas de manière optimale ensemble. Après quelques recherches dans le [bugzilla de la fondation Mozilla](https://bugzilla.mozilla.org/), je trouve qu'[il n'est pas possible de spécifier des arguments à l'éxécutable lancé par Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=339514), et que [Thunderbird n'est pas capable de reconnaître l'URL d'un flux RSS à moins de le lancer avec de la manière suivante](https://bugzilla.mozilla.org/show_bug.cgi?id=348450) :

 ``` bash
$ mozilla-thunderbird -mail feed:http://pwet.fr/rss/feed/billets
```

 
D'ailleurs cette ligne est d'une cohérence *incroyable*, puisqu'elle indique à thunderbird d'ouvrir le composant de mail pour y visualiser... le flux RSS en paramètre ! Bon eh bien l'intégration de RSS dans Firefox/Thunderbird c'est pas encore ça, dommage :(

