---
title: Être à l'aise avec bash #3
tags: truc, apt, bash, ubuntu, debian, shell, sécurité
updated: 2007-01-15T08:07:31.000Z
lang: fr
node: 62750
remoteId: af1aa31fd76644ecfcd7b39cdde446d4
published: 2006-11-04T22:26:38+01:00
---
 
Après un premier épisode [sur le prompt et les titres des terminaux](/post/etre-a-l-aise-avec-bash-1), un deuxième [sur la navigation dans l'arborescence et les alias](/post/etre-a-l-aise-avec-bash-2), je poursuis cette série sur le shell [bash](http://pwet.fr/man/linux/commandes/bash) avec quelques trucs de configurations pour l'historique et sur le complètement avancé.

  
## L'historique

 
À chaque fois qu'une commande est tapée, bash l'ajoute dans l'historique. Cet historique est consultable en utilisant les touches &lt;Flèche haut&gt; et &lt;Flèche bas&gt;. Lorsque le shell se termine, l'historique est écrit dans le fichier ~/.bash_history. Ce comportement basique peut être modifié pour gagner en facilité et rapidité d'utilisation.

  
### Éviter les doublons

 
Il est possible d'éviter d'avoir des &quot;doublons consécutifs&quot;. Avec la ligne suivante dans le fichier ~/.bashrc, les lignes identiques consécutives, ainsi que les lignes commençant par un espace seront ignorées permettant de gagner du temps dans la navigation dans l'historique :

 ``` bash
export HISTCONTROL=ignoreboth
```

   
### Rechercher dans l'historique

 
Il est possible de rechercher dans l'historique avec le raccourcis Control+R. Cette recherche est incrémentale, cela signifie qu'au fur et à mesure de la frappe les résultats correspondant apparaissent, une fois la bonne commande trouvée, il suffit de taper sur Entrée pour l'éxécuter ou sur la flèche droite pour copier cette commande sur la ligne courante si on veut y ajouter des paramètres.

 
Les touches flèche haut et flèche bas permettent de recherche les commandes précédemment tapées dans l'historique, mais il est possible de faire en sorte que cette recherche prenne en compte les caractères déjà tapés, un exemple sera plus parlant :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ tar -cf mes_script.tar bin
> tigrou@Lorien[192.168.0.243]:~$ du -sh mes_script.tar
340K    mes_script.tar.bz2
> tigrou@Lorien[192.168.0.243]:~$ t
```

 
Avec la configuration par défaut, l'appui sur la touche &lt;Flèche haut&gt; m'affichera la commande précédente, même si j'ai déjà tappé la première lettre de la commande souhaitée. Il est possible d'indiquer à bash (en fait à [libreadline](http://pwet.fr/man/linux/fonctions_bibliotheques/readline) qui gère la ligne de commande interactive) de prendre en compte ce qui est déjà tapé, de manière chercher les lignes débutant par ces lettres. Pour cela il suffit d'écrire ces deux ligne dans le fichier ~/.inputrc

 ``` 
"\e[A": history-search-backward
"\e[B": history-search-backward
```

 
Les différentes fonctions disponibles sont détaillées dans la [page du manuel de readline](http://pwet.fr/man/linux/fonctions_bibliotheques/readline/readline) et la [page du manuel de bash](http://pwet.fr/man/linux/commandes/bash).

   
### Faire le ménage dans son historique

 
Il n'y a que très peu d'intérêt d'avoir les commandes très courtes dans son historique, c'est pourquoi il est possible de définir des commandes qui n'apparaîtront jamais à l'aide de la variable d'environnement HISTIGNORE, par exemple clear, bg, fg, cd, ls sans paramètre sont plus rapides à taper qu'à chercher dans l'historique, on peut donc les ignorer sans problème :

 ``` bash
export HISTIGNORE="cd:ls:[bf]g:clear"
```

   
### Les raccourcis

 
bash propose une syntaxe particulière pour utiliser les commandes déjà taper sans les rechercher interactivement.

 **Attention : ces raccourcis sont à utiliser avec parcimonie, car il est facile de rappeler des commandes dans un contexte différent ce qui peut être très dangereux (un [rm](http://pwet.fr/man/linux/commandes/rm) -rf * par exemple ...)**

 
!-1 appelle la dernière commande tapée, !-2 l'avant dernière, et ainsi de suite. !! est équivalent à !-1.

 
!xxx va exécuter la dernière commande commençant par xxx. !?xxx va exécuter la dernière ligne de commande contenant *xxx*.

 
Si on souhaite juste afficher cette commande, on peut ajouter :p à la fin de ces lignes.

    
## Le complètement avancé

 
Cette fonctionnalité de bash s'active en décommentant si elles sont commentés ou en ajoutant les lignes suivantes dans le fichier /etc/bash.bashrc (pour tous les utilisateurs) ou ~/.bashrc (pour un utilisateur) :

 ``` bash
if [ "$PS1" -a -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi
```

 
En activant cette fonctionnalités, bash propose de complèter les lignes de commandes en fonction du contexte. Par exemple, si vous utilisez [tar](http://pwet.fr/man/linux/commandes/tar) pour désarchiver il ne proposera que les fichiers terminant par .tar. Pour un cd, il ne proposera que les dossiers... Avec [apt-get](http://pwet.fr/man/linux/administration_systeme/apt_get), il est capable de proposer les différentes actions (install, update, upgrade, ...) ainsi que les noms de paquets correspondant à des noms répertoriés dans la liste des paquets disponibles. Cette fonctionnalités permet aussi de complèter les options longues de différents programmes comme [rsync](http://pwet.fr/man/linux/commandes/rsync). Bref, une fois qu'on y a gouté, il est difficile de s'en passer.

 