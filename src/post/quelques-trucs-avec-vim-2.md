---
title: "Quelques trucs avec Vim #2"
tags: truc, vim, ubuntu, linux
lang: "fr"
node: "65114"
remoteId: "13c1ec3de533c98a31fc0bf1a803a979"
published: 2007-04-15T21:39:34+02:00
updated: 2016-02-10 18:19
---
 
Voici la suite du billet [Quelques trucs avec Vim
#1](/post/quelques-trucs-avec-vim-1) qui, comme le suggèrait le #1, a bien une
suite :) Voici donc 3 petits trucs qui me simplifient la vie presque tous les
jours.

## Mise en valeur de la ligne courante
 
Une fonctionnalité que l'on voit dans beaucoup d'éditeurs de texte avancés ou
<abbr title="Integrated Development Environment">IDE</abbr>  est la mise en
valeur de la ligne courante. Depuis Vim 7, disponible depuis [Ubuntu Edgy
Eft](http://doc.ubuntu-fr.org/edgy), cette fonctionnalité est directement dans
l'éditeur. Dans un terminal, la ligne est soulignée alors que dans la version
graphique, il est possible de définir une couleur de fond, pour ma part,
j'utilise les lignes suivantes dans mon .gvimrc pour avoir une ligne légèrement
surlignée de bleu/gris dans la version graphique uniquement :

``` 
set cursorline
hi CursorLine guibg=#e7ebff
```
   
## Les *folds* sur mesure

 
Beaucoup d'éditeurs proposent la possibilité de &quot;pliage/dépliage&quot;
(fold/unfold) des structures de contrôle et/ou des commentaires. Il est possible
de faire la même chose dans Vim mais j'apprécie assez peu cette fonctionnalités.
Par contre, il est possible de définir des zones &quot;pliables&quot; sur mesure
ce qui peut être pratique pour être à deux endroits éloignés dans le code sans
ouvrir deux buffers sur le même fichier. Pour commencer à l'utiliser, le plus
simple est de passer en mode visuel en tapant v depuis le mode commande, de
sélectionner quelques lignes de texte avec les déplacements habituels et puis de
faire zf pour créer la zone pliée. Pour la déplier, il suffit de taper zo (Fold
Open), pour la replier zc (Fold Close). Si on n'a plus besoin de la zone, on
peut faire zd (Fold Delete) pour supprimer la possibilité de pliage/dépliage, le
texte reste intact. Il est possible d'avoir un repère visuel où des zones
pliables sont positionnées en fixant la variable foldcolumn, par exemple à 2 en
tapant &quot;:set foldcolumn=2&quot;, ce qui donne :

<figure class="object-center"><a href="/images/fold-dans-vim.gif"><img src="/images//fold-dans-vim.gif" alt="Fold dans Vim">
</a></figure>

 
Les zones sont imbricables et beaucoup de raccourcis existent pour les
manipuler. Plus d'informations [le *folding* dans l'aide de
Vim](http://vimdoc.sourceforge.net/htmldoc/fold.html).

   
## Les abbréviations

 
Lorsqu'on écrit du code, on utilise régulièrement les mêmes constructions
syntaxiques, il peut être avantageux de définir des abbréviations permettant de
taper rapidement ces séquences. Dans [eZVim](http://projects.ez.no/ezvim), [un
plugin Vim pour eZ Publish](/post/ezvim-0-1), j'en définis quelques unes, par
exemple :

 ``` 
iabbrev ezfe {foreach __ as $k => $val}<CR><CR>{/foreach}
match Error / __ /
```

La première ligne indique à vim de remplacer la chaîne ezfe suivie d'un espace
par le reste de la ligne (foreach) en mode insertion. &lt;CR&gt; représente une
frappe sur la touche &quot;Entrée&quot;. La seconde ligne dit à vim de
reconnaître la chaîne &quot; __ &quot; comme une erreur ce qui permet de voir
rapidement les points à complèter dans ce qui vient d'être inséré pour obtenir
un code syntaxiquement correct :

<figure class="object-center"><a href="/images/abbreviations-dans-vim.gif"><img src="/images//abbreviations-dans-vim.gif" alt="Abbréviations dans Vim">
</a></figure>

Plus d'informations sur [les abbréviations dans l'aide de Vim](http://vimdoc.sourceforge.net/htmldoc/map.html#Abbreviations).
