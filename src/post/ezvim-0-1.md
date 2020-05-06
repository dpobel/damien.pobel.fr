---
title: "eZVim 0.1"
tags: ez publish, vim, python, ezvim
updated: 2007-07-29T20:11:11.000Z
lang: "fr"
node: "65079"
remoteId: "c724b73de858aef7db17e15e800ee919"
published: 2007-04-08T22:13:14+02:00
---

Je viens de mettre en ligne la toute première version du [plugin eZVim](http://projects.ez.no/ezvim) sur [la plateforme eZ Projects](http://projects.ez.no) et dans [les contributions externes eZ publish](http://ez.no/community/contribs/3rd_party/ezvim). [vim.org](http://www.vim.org/) est inaccessible au moment où j'écris ces lignes, mais je l'ajouterai aussi là bas dès que possible.


eZVim est un plugin Vim sous licence GPL qui ajoute à cet éditeur quelques fonctionnalités pour le développeur [eZ Publish](/tag/ez-publish) inspirées du [plugin Smile eZ Plugin](http://smile-ez-plugin.sourceforge.net/). Pour l'utiliser, il faut Vim 6 ou supérieur, avec le support des scripts en python. Sous Ubuntu et Debian, il suffit d'installer le paquet vim-python.


### Classes View


Une barre verticale, le **Classes View**, permet de voir rapidement, les groupes de classes, les classes et leurs attributs. Cette barre affiche les informations les plus pertinentes (identifiant numérique, identifiant, classe, *datatype*, ...). Les attributs obligatoires sont mis en valeur et préfixés par le signe +. Des screenshots sont en ligne sur [la page *gallery* du projet](http://projects.ez.no/ezvim/gallery/screenshots). Plusieurs raccourcis sont utilisables dans cette barre :

<ul>
    <li>+ ouvre l'élément courant</li>
    <li>- ferme l'élément courant</li>
    <li>* ouvre tous les éléments</li>
    <li>= ferme tous les éléments</li>
    <li>d ouvre le moteur de recherche sur ez.no pour le <em>datatype</em> de l'attribut sur la ligne courante</li>
    <li>v permet de visualiser le groupe ou la classe sur la ligne courante.</li>
    <li>e permet d'éditer le groupe ou la classe sur la ligne courante.</li>
</ul>

Cette fonctionnalités nécessite l'installation de [l'extension eZ Publish SmileClasses](http://sourceforge.net/project/showfiles.php?group_id=190833&amp;package_id=224521) disponible sur le site du plugin Smile eZ Plugin.


### Abbréviations Vim


Les abbréviations Vim permettent de taper quelques lettres et l'éditeur les remplace automatiquement par la séquence définie. Par exemple, en tapant **ezfcls** (Fetch Content List Sort) suivi d'un espace, Vim va *automagiquement* remplacer cette séquence par :

 ```
fetch(content, list, hash('parent_node_id', __ ,
            'class_filter_type', include,
            'class_filter_array', array( __ ),
            'sort_by', array( __ ),
            'offset', $view_paremeters.offset,
            'limit', __ ))
```


Les éléments à complèter par le développeur sont remplacés par la chaîne &quot; __ &quot; qui est mise en valeur par l'éditeur. Chaque paramètre est sur une ligne, il est ainsi extrêmement simple de supprimer les lignes qui seraient superflues ou de rajouter des éléments moins courants (limitation, main_node_only, ...).




<figure class="object-center"><a href="/images/abbreviation-ezfcls.png"><img loading="lazy" src="/images//abbreviation-ezfcls.png" alt="Abbréviation ezfcls">
</a></figure>





### A venir


D'autres fonctionnalités sont à venir, en particulier :

* Une coloration syntaxique spécifique pour les templates eZ Publish
* La validation syntaxique des templates dans Vim
* Custom operators view qui, à la manière du Classes View, affiche les extensions fournissant des opérateurs ainsi que les prototypes de ces opérateurs.
