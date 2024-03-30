---
title: "Chercher remplacer dans tous les buffers de Vim"
tags: vim, linux, ezvim, shell, pense bête
updated: 2010-07-13T15:53:03.000Z
lang: "fr"
node: "67937"
remoteId: "dbc5c3306f52b726613334b4ebaebd2f"
published: 2009-09-08T23:30:46+02:00
---

J'ai plusieurs fois eu besoin de faire des substitutions dans tous les fichiers ouverts dans [Vim](/tag/vim). J'avais cherché dans [les flags](http://vimdoc.sourceforge.net/htmldoc/change.html#:s_flags) de [la commande substitute (<code>:s</code>
)](http://vimdoc.sourceforge.net/htmldoc/change.html#:substitute) sans succès et donc systématiquement je contournais le problème à coup de lignes de [bash](http://pwet.fr/man/linux/commandes/bash) à base de [find](http://pwet.fr/man/linux/commandes/find), [sed](http://pwet.fr/man/linux/commandes/sed2), [grep](http://pwet.fr/man/linux/commandes/grep) et compagnie. Mais je suis tombé par hasard sur la commande [<code>:bufdo</code>](http://vimdoc.sourceforge.net/htmldoc/windows.html#:bufdo) en cherchant à corriger quelques petits bugs dans [eZVim](/post/ezvim-is-back) le plugin Vim pour [eZ Publish](/tag/ez-publish). Du coup rien de compliqué, il suffit de préfixer toute commande par *bufdo* pour l'appliquer sur tous les *buffers* ouverts, par exemple :

```vim
:bufdo! %s/cherche/remplace/g
```


Le point d'exclamation permet de forcer le passage d'un buffer à un autre sans sauvegarder son contenu. Et évidemment ça marche pour autre chose que la substitution. Il est également possible d'exécuter plusieurs commandes sur chacun des *buffers* en les séparant avec un *pipe* (<code>|</code>
), par exemple pour corriger une indentation en fonction des réglages de Vim, supprimer les espaces inutiles en fin de ligne et sauvegarder le fichier, la ligne suivante devrait faire l'affaire :

```vim
:bufdo retab | %s/  *$//g | w
```


Il existe également [<code>:tabdo</code>](http://vimdoc.sourceforge.net/htmldoc/tabpage.html#:tabdo) (pour les onglets), [<code>:windo</code>](http://vimdoc.sourceforge.net/htmldoc/windows.html#:windo) (pour les fenêtres Vim) et [<code>:argdo</code>](http://vimdoc.sourceforge.net/htmldoc/editing.html#:argdo) (pour les arguments de la ligne de commande).

