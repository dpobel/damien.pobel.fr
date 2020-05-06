---
title: "Apwal !"
tags: geek, x11, truc, openbox, ubuntu
lang: "fr"
node: "63826"
remoteId: "97ce2ea8527ca402492f6693dec557c4"
published: 2006-12-13T22:36:18+01:00
updated: 2016-02-09 22:03
---
 
Apwal est un petit logiciel écrit dans le but de permettre le lancement de ses
applications favorites en ayant le moins de mouvements de souris à faire. En
effet, le plus souvent lorsque vous voulez lancer une application, il faut
diriger le pointeur jusqu'à une barre d'icônes située généralement sur un bord
de l'écran et ce même si le pointeur de la souris se trouve à l'opposé. Apwal
permet de faire apparaître une barre d'icônes à proximité du pointeur de la
souris où qu'il soit.

 
Par exemple avec le window manager
[Openbox](http://pwet.fr/man/linux/commandes/openbox), j'ai configuré le clic
gauche sur le fond d'écran et la combinaison Shift+Tab pour lancer apwal faisant
ainsi apparaître ce menu à l'aide de la configuration suivante dans le fichier
~/.config/openbox/rc.xml :

 ``` xml
<!-- extrait de ~/.config/openbox/rc.xml -->
<context name="Desktop">
  <!-- [...] -->
  <mousebind button="Left" action="Press">
    <action name="Execute"><execute>apwal</execute></action>
  </mousebind>
</context>
<keyboard>
  <!-- [...] -->
  <keybind key="S-Tab">
    <action name="Execute"><execute>apwal</execute></action>
  </keybind>
</keyboard>
```

 
Comme une image vaut toujours mieux qu'un long discours :

 


<figure class="object-center"><a href="/images/apwal.gif"><img loading="lazy" src="/images//apwal.gif" alt="Apwal">
</a></figure>

Comme on peut le voir sur ce GIF animé,
[Apwal](http://pwet.fr/man/linux/commandes/apwal) fait apparaître chez moi une
barre au dessus de toutes les applications en cours me permettant de lancer
facilement et rapidement, un [xterm](http://pwet.fr/man/linux/commandes/xterm),
[nautilus](http://pwet.fr/man/linux/commandes/nautilus),
[Firefox](http://pwet.fr/man/linux/commandes/firefox),
[Thunderbird](http://pwet.fr/man/linux/commandes/mozilla_thunderbird),
[Vim](http://pwet.fr/man/linux/commandes/vim) ou encore de contrôler mon lecteur
audio préféré (Listen en ce moment).

 
Apwal est disponible sous Ubuntu dans le dépôt Universe et s'installe avec le paquet du même nom :

 ``` bash
$ sudo apt-get install apwal
```

 
Apwal se configure simplement à l'aide d'une interface graphique (générant un simple fichier XML) en le lançant avec l'option --edit.

