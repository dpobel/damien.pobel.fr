---
title: "Le bug de l'espace supplémentaire..."
tags: ez publish, vim, template
updated: 2009-01-25T00:40:49.000Z
lang: "fr"
node: "67451"
remoteId: "6d7f0d09f850fcd68a5ec55363b4b533"
published: 2009-01-25T01:37:27+01:00
---

Depuis [près de deux ans et demi](/post/ouverture), j'avais un bug assez énervant qui faisait que tous les liens insérés dans un bloc de texte riche était systématiquement suivi d'un espace lors du rendu ce qui est particulièrement gênant avec la ponctuation qui se retrouve parfois sur la ligne suivante. Depuis quelque temps j'étais persuadé qu'il s'agissait d'un bug d'[eZ Publish](/tag/ez-publish) lié au fait que j'avais fait un *override* du template <code>content/datatype/view/ezxmltags/link.tpl</code>
 en le plaçant dans le design de mon site.


Aujourd'hui, j'ai refait quelques tests sur le code [Planet eZ Publish.fr](http://www.planet-ezpublish.fr) qui souffrait du même problème. J'ai découvert que le problème ne venait pas de la surcharge directement, mais de l'édition du template avec [Vim](/tag/vim/) qui, par défaut, insère systématiquement un caractère fin de ligne (<abbr title="End Of Line">EOL</abbr> ) sur la dernière ligne d'un fichier et ce caractère qui apparaissait comme un espace. Ceci explique aussi les messages de [diff](http://pwet.fr/man/linux/commandes/posix/diff)/[svn](http://pwet.fr/man/linux/commandes/svn) diff indiquant qu'un caractère fin de ligne a été ajouté ou supprimé selon les cas.


Il est heureusement possible de désactiver ce comportement en ajoutant les lignes suivantes dans sa configuration de Vim :

``` 
au BufWritePre * :set binary | set noeol
au BufWritePost * :set nobinary | set eol
```

