---
title: Être à l'aise avec bash #2
tags: réseau, bash, ubuntu, linux, debian, shell
updated: 2007-01-27T14:26:38.000Z
lang: fr
node: 62507
remoteId: 237bd1f134612fea70d6ea83e9439341
published: 2006-11-01T15:21:41+01:00
---
 
Suite de la série d'articles sur [comment rendre son shell bash un peu plus attractif](/post/etre-a-l-aise-avec-bash-1) et plus facile d'utilisation, avec cette fois ci quelques trucs pour se simplifier la vie dans la navigation au sein du système de fichier et sur la gestion des alias.

  
## Navigation dans les répertoires

  
### La variable CDPATH

 
Les shells sont configurés en partie à l'aide de variables d'environnement. Il en existe un certain nombre et celles définies sur votre système peuvent être listées à l'aide de [printenv](http://pwet.fr/man/linux/commandes/printenv). Parmis ces variables, CDPATH permet de se simplifier la navigation dans l'arborescence à l'aide du shell et sa commande cd.

 
En effet, par défaut, cd xxxyyyzzz recherche le répertoire xxxyyyzzz dans le répertoire courant, mais en spécificiant la variable CDPATH, il est possible de demander au shell de regarder éventuellement dans d'autres répertoires si ce répertoire existe. J'utilise cette fonctionnalités pour naviguer rapidement dans les différents répertoires stockant les sites web sur ma machine en insérant la ligne suivante dans mon fichier .bashrc :

 ``` bash
export CDPATH=".:/home/damien/public_html"
```

 
Ainsi à chaque fois que je fais un cd xxxyyyzzz, le shell cherche si xxxyyyzzz existe dans le répertoire courant, et si ce n'est pas le cas, il cherche en suite dans /home/public_html/damien. Il procède de la même manière, si on utilise le [complètement](http://fr.wikipedia.org/wiki/ComplÃƒÂ¨tement) avec la touche &lt;Tab&gt;.

   
### Correction automatique

 
Une option permet de demander à bash de corriger les (petites) fautes frappes simples lors de l'utilisation de cd. Elle s'active avec la ligne suivante que l'on peut ajouter dans son .bashrc

 ``` bash
shopt -s cdspell
```

 
Avec cette option certaines fautes sont corrigées :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~/tmp/test$ mkdir Documents
> tigrou@Lorien[192.168.0.243]:~/tmp/test$ cd Documen
bash: cd: Documen: Aucun fichier ou répertoire de ce type
> tigrou@Lorien[192.168.0.243]:~/tmp/test$ cd Document
Documents
> tigrou@Lorien[192.168.0.243]:~/tmp/test/Documents$ cd ..
> tigrou@Lorien[192.168.0.243]:~/tmp/test$ cd Documents-
Documents
> tigrou@Lorien[192.168.0.243]:~/tmp/test/Documents$
```

   
### Quelques petits trucs avec cd

 
Taper cd sans argument permet d'aller directement dans son répertoire personnel.

 
En shell, ~ signifie le répertoire personnel de l'utilisateur, ainsi taper cd ~damien permet d'aller dans le répertoire personnel de l'utilisateur dont le login est damien. cd ~damien/Documents permet d'aller dans le répertoire Documents dans le *home directory* de damien. Si le login est omis, c'est celui de l'utilisateur courant qui est pris en compte.

 
cd - permet de retourner au répertoire précédent. Très pratique pour passer d'un répertoire à un autre éloiginé dans l'arborescence.

    
## Les *alias* 

 
Les *alias* permettent se simplifier des lignes de commandes en les réduisant au plus court et aussi de pallier aux fautes de frappe. Pour définir un *alias*, il suffit d'utiliser [la commande interne](http://pwet.fr/man/linux/conventions/bash_builtins) alias. Lorsqu'un *alias* défini est tappé par l'utilisateur, le bash remplace simplement l'alias par sa définition. Quelques exemples de féfinitions (à mettre dans son .bashrc) :

 ``` bash
alias cd..='cd ..'
alias rezo="sudo watch netstat -alpe --ip"
alias ag="sudo apt-get"
alias :wq='echo Je ne suis PAS vim'
```

 
Le premier permet aux habitués du DOS de garder leur habitudes. Le deuxième (rezo) permet de surveiller régulièrement quels programmes utilisent le réseau. Le troisième est un raccourci bien pratique enfin le dernier est là pour pallier à des erreurs de fenêtre.

 
Pour voir la liste des *alias*, il suffit de taper alias sans paramètre. La commande interne unalias permet de supprimer un *alias* dont le nom est passé en paramètre.

 