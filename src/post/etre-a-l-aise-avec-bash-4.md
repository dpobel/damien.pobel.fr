---
title: "Être à l'aise avec bash #4"
tags: apache, bash, ubuntu, debian, shell
updated: 2007-02-03T18:43:17.000Z
lang: "fr"
node: "63644"
remoteId: "e21756dda852ab923281ab5074b11d1f"
published: 2006-11-19T15:04:40+01:00
---
 
Résumé des épisodes précédents :

* [Le prompt bash et la manipulation des titres des fenêtres](/post/etre-a-l-aise-avec-bash-1)
* [Navigation dans les répertoires en ligne de commande et les alias](/post/etre-a-l-aise-avec-bash-2)
* [L'historique et le complètement avancé avec bash](/post/etre-a-l-aise-avec-bash-3)
 
 
Après ces trois billets plutôt sur la configuration de [bash](http://pwet.fr/man/linux/commandes/bash), passons *aux choses sérieuses* avec l'étude de trois concepts qui font du shell en général et de bash en particulier un outil extrêment puissant :

* [Les gestion des entrées/sorties (ou flux ou Input/Output ou I/O pour les intimes :) avec les redirections et l'utilisation du pipe.](#io)
* [Rediriger la sortie standard dans un fichier](#o1fichier)
* [Rediriger la sortie d'erreur dans un fichier](#o2fichier)
* [Rediriger la sortie standard et la sortie d'erreur sur la sortie standard](#o12fichier)
* [Et l'entrée standard ?](#ipipe)
* [Pour aller plus loin](#more)
* [Les motifs (ie le globbing)](#eztoc171373_2)
 
  
## Les entrées/sorties

 
L'article sur [les flux standards sur Wikipedia](http://fr.wikipedia.org/wiki/Flux_standard) est une très bonne et courte introduction au concept d'entrée/sorties standards. Pour faire simple, lorsqu'un shell est lancé en mode interactif (ie le shell attend qu'on lui tape des commandes typiquement dans un terminal), l'entrée standard est le clavier et la sortie standard et la sortie d'erreur sont reliées au terminal. Par défaut, lorsque le shell lance une commande, cette commande hérite (entre autre) des entrées/sorties standards du shell parent. Ces flux sont manipulables dans le shell, quelques exemples pratiques à l'aide de la commande [find](http://pwet.fr/man/linux/commandes/find) permettant de rechercher tous les répertoires dans le dossier de l'utilisateur root sur lequel mon utilisateur n'a évidemment pas tous les droits, cette commande renvoie donc des informations sur la sortie d'erreur et la sortie standard :

 ``` bash
$ find ~root -type d
/root
/root/.gnome2
find: /root/.gnome2: Permission non accordée
/root/.gconf
find: /root/.gconf: Permission non accordée
```

  
### Rediriger la sortie standard dans un fichier

 
Cette opération se fait avec l'opérateur &gt;, qui créa le fichier si il n'existe pas ou l'écrasera avec la sortie standard en l'utilisant de la manière suivante :

 ``` bash
$ find ~root -type d > sortie_standard
find: /root/.gnome2: Permission non accordée
find: /root/.gconf: Permission non accordée
$ cat sortie_standard 
/root
/root/.gnome2
/root/.gconf
```

 
Plutôt que d'écraser le fichier, il est aussi possible d'ajouter la sortie au fichier si celui-ci existe déjà avec l 'opérateur &gt;&gt;.

   
### Rediriger la sortie d'erreur dans un fichier

 
Cette opération se fait également avec &gt; mais en spécifiant le descripteur de la sortie d'erreur (par défaut 2) :

 ``` bash
$ find ~root -type d 2> sortie_erreur
/root
/root/.gnome2
/root/.gconf
$ cat sortie_erreur 
find: /root/.gnome2: Permission non accordée
find: /root/.gconf: Permission non accordée
```

 
Cette séquence est fréquemment utilisée pour n'afficher que la sortie standard en spécifiant comme fichier le fichier spécial [/dev/null](http://pwet.fr/man/linux/fichiers_speciaux/null). De la même manière que précédemment, 2&gt;&gt; ajoutera la sortie d'erreur à la fin du fichier.

   
### Rediriger la sortie d'erreur et la sortie standard sur la sortie standard

 
Ici, on souhaite tout avoir sur la même sortie pour un traitement ultérieur, pour cela il faut indiquer au shell de rediriger les données écrites sur le descripteur 2 sur le descripteur 1.

 ``` bash
$ find ~root -type d > sortie_1_et_2 2>&1
$ cat sortie_1_et_2 
/root
/root/.gnome2
find: /root/.gnome2: Permission non accordée
/root/.gconf
find: /root/.gconf: Permission non accordée
```

   
### Et l'entrée standard ?

 
Il est possible d'enchâiner les commandes en redirigeant les sorties d'une commande sur l'entrée standard à l'aide du *pipe* (| ou tube), par exemple si je souhaite n'avoir que les messages concernant les dossier de GNOME à la suite de find, je peux utiliser l'utilitaire [grep](http://pwet.fr/man/linux/commandes/grep) pour filtrer la sortie comme suit :

 ``` bash
$ find ~root -type d 2>&1 | grep gnome
/root/.gnome2
find: /root/.gnome2: Permission non accordée
```

 
Comme vue précédemment, les sorties standard et d'erreur de find sont redirigés sur la sortie standard qui est elle même redirigées sur l'entrée standard de grep. Cette ligne est équivalente aux deux lignes suivantes utilisant le symbole &lt; permettant de rediriger le contenu d'un fichier sur l'entrée standard :

 ``` bash
$ find ~root -type d > sortie_1_et_2 2>&1
$ grep gnome < sortie_1_et_2 
/root/.gnome2
find: /root/.gnome2: Permission non accordée
```

 
elle même équivalente à

 ``` bash
$ find ~root -type d > sortie_1_et_2 2>&1
$ cat sortie_1_et_2 | grep gnome
/root/.gnome2
find: /root/.gnome2: Permission non accordée
```

 
Ce sont des exemples très simples, mais il est possible ainsi de faire des choses assez complexe en une ligne en enchaînant quelques commandes (qui feront l'objet d'un prochaine billet) :

 ``` bash
$ cat access.log | egrep -v '(/var|/design|/share|/stats| 404 )' | cut -d ' ' -f 7 | sort | uniq | wc -l
2911
```

 
Cette ligne lit le fichier de log d'apache access.log et permet de compter le nombre de pages différentes vues au moment où j'écris ces lignes.

   
### Pour aller plus loin

 
Pour en revenir aux entrée/sorties, ces opérations sont les plus courantes, mais il existe bien d'autres possibilités décrites dans la [page du manuel de bash](http://pwet.fr/man/linux/commandes/bash).

    
## Les motifs

 
Les motifs sont des caractères spécifiques qui permettent, une fois développé par le shell, de remplacer plusieurs fichiers sans avoir à tous les écrire. Pour faire simple, ce sont des expressions rationnelles très limitées. Le plus connu de ces caractères est l'étoile * souvent utilisé dans les rm -rf * (ce qui est très **dangereux** !). Pour tester ces caractères, il vaut mieux utiliser echo.

 
À la suite des commandes tapées ci-dessus, j'ai plusieurs fichiers dans le répertoire temporaire qui peuvent servir d'exemple :

 ``` bash
$ ls
gconfd-tigrou  mapping-tigrou  sortie_1_et_2  sortie_standard
listen         orbit-tigrou    sortie_erreur  ssh-jDyKBu4304
# tout ce qui commençe par un s
$ echo s*
sortie_1_et_2 sortie_erreur sortie_standard ssh-jDyKBu4304
# tout ce qui termine par un u
$ echo *u
gconfd-tigrou mapping-tigrou orbit-tigrou
# tout ce qui termine par un chiffre
$ echo *[0-9]
sortie_1_et_2 ssh-jDyKBu4304
# tout ce qui ne se termine PAS par un chiffre
$ echo *[!0-9]
gconfd-tigrou listen mapping-tigrou orbit-tigrou sortie_erreur sortie_standard
# tout ce qui commence par sortie suivi d'un caractère suivi de standard
$ echo sortie?standard
sortie_standard
```

 
Pour utiliser l'un de ces caractères sur la ligne de commande sans qu'il soit interprèté, il suffit de la préfixer d'un antislash (\).

 
