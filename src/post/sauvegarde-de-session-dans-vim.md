---
title: "Sauvegarde de session dans Vim"
tags: vim, linux, truc
lang: "fr"
node: "68747"
remoteId: "26aaad759bd7dd37dc61f4b3683f5c23"
published: 2010-10-16T23:58:53+02:00
---

Dans [Vim](/tag/vim) il est possible de sauvegarder la session courante avec la commande <code>:mksession</code>
 (ou avec&nbsp;l’abréviation&nbsp;<code>:mks</code>
) suivi d'un nom de fichier, par exemple dans une instance de vim avec plusieurs fichiers ouverts, des buffers ou des onglets… on peut taper :

``` 
:mksession ~/test.vim
```


Cette commande va créer un fichier de session Vim (test.vim dans ce cas) qui contient toutes les commandes nécessaires pour restaurer vim dans l'état où il se trouvait au moment où la commande est lancée. Pour restaurer la session, on peut utiliser la commande <code>:so</code>
 suivie du nom du fichier de session ou alors il suffit de lancer Vim avec la paramètre <code>-S</code>
 :

``` bash
vim -S ~/test.vim
```


Ce mécanisme est très pratique lorsque par exemple on doit redémarrer suite à une mise à jour du système mais en l'état il reste manuel. Il m'arrive en effet de temps à autre de fermer par accident le terminal qui contient Vim et ainsi de perdre tout l'organisation de l'éditeur. Pour remédier à cela, il est possible de coupler cette fonctionnalité avec le système d'évènement de Vim pour sauvegarder automatiquement la session à certains moments.

``` 
autocmd VimLeavePre * :mksession! ~/stopped.vim
```


Avec cette ligne dans la configuration de Vim (.vimrc), l'état de la session sera enregistré automatiquement dans le fichier stopped.vim et il est donc aisé de récupérer son environnement suite à une fausse manipulation.

