---
title: "Quelques trucs avec Vim #1"
tags: vim, geek, ssh, truc, dedibox, ubuntu, linux, pense bête, shell
updated: 2007-04-01T14:25:33.000Z
lang: "fr"
node: "64608"
remoteId: "237acf3518519cbf41875e997c12ef5e"
published: 2007-02-20T00:48:22+01:00
---
 
[Vim](http://pwet.fr/man/linux/commandes/vim) est un formidable éditeur de
texte. Bien sûr celui-ci demande un peu d'investissement avant d'être productif
mais une fois franchi ce cap, il est vraiment très agréable de garder les mains
sur le clavier pour toutes les tâches d'édition. Il est aussi très pratique
d'utiliser le même éditeur de texte pour éditer un fichier de configuration au
coup par coup sur un serveur et pour écrire de manière plus élaborée
(programmation, e-mail, …), on finit même par taper des commandes Vim dans le
terminal ce qui oblige [à définir des alias
bizarres](/post/etre-a-l-aise-avec-bash-2) :-)

 
Je ne vais pas faire ici une introduction à l'utilisation de Vim mais plutôt
donner quelques recettes de cuisine bien pratiques.

  
## Le fichier .vimrc

 
Pour commencer, il faut configurer la bête :-) Pour cela, il faut créer ou éditer le fichier .vimrc dans votre dossier personnel, par exemple avec vim. Voici un .vimrc de base :

 ``` dos
set nocompatible                " pas compatibilité avec vi

" priorité faible pour les fichiers avec les extensions
" suivantes lors du complètement
set suffixes=.bak,~,.swp,.o,.info,.aux,.log,.dvi,.bbl,.blg,.brf,.cb,.ind,.idx,.ilg,.inx,.out,.toc
set history=50                  " 50 lignes dans l'historique
set ruler                       " affiche la position du curseur en bas
set sm                          " affiche la parenthèse correspondante

set formatoptions=tcroqn        " indentation
set autoindent
set cin
set textwidth=0                 " pas de coupure de ligne par défaut
set backspace=2
set ts=4                        " tabulation sur 4 caractères
set sw=4

set nobackup                    " pas de fichier backup
set dir=~/tmp                   " fichier temporaire dans ~/tmp (il faut qu'il existe !)
set autowrite

set hlsearch                    " surligne les recherches
set incsearch                   " recherche au fur et à mesure

syntax on                       " coloration syntaxique
set background=dark             " fond noir par défaut
```

 
Ce fichier est évidemment à adapter en fonction de votre utilisation, constitue déjà une bonne base pour se faciliter l'édition avec Vim. Comme toujours, en cas de doute sur un paramètre, il ne faut pas hésiter à consulter l'aide très complète en tapant :help le_paramètre pour voir de quoi il retourne.

   
## Quelques trucs rapides

  
### Afficher les numéros de lignes

 
Il suffit de taper :set nu et :set nu! pour les cacher. Si vous voulez toujours afficher les numéros de ligne, il suffit d'ajouter set nu dans votre .vimrc.

   
### Éditer des fichiers distants via SSH

 
Il est bien sûr possible de se connecter en SSH et d'utiliser Vim sur la machine distante, mais il n'est peut être pas configurer voire pas installé du tout… La commande suivante me permet d'éditer mon .bashrc et le fichier /tmp/unfichier sur ma Dedibox :

 ``` bash
$ vim 'scp://tigrou@pwet.fr/.bashrc' 'scp://tigrou@pwet.fr//tmp/unfichier'
```

   
### Trier les lignes d'un fichier

 
Vim ne sait pas le faire directement, par contre, on peut utiliser la commande externe [sort](http://pwet.fr/man/linux/commandes/sort) pour le faire. Pour cela, il suffit de taper :%!sort, ce qui aura pour effet de donner le contenu du buffer courant en entrée de la commande sort et de le remplacer par sa sortie.

   
### Insèrer le résultat d'une commande

 
En tapant :%!la_commande, on remplace le contenu du buffer par la sortie de la commande. En tapant :r!la_commande, on insère son résultat. Par exemple pour insérer la date courante, on peut faire :r!date.

  