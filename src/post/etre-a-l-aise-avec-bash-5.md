---
title: "Être à l'aise avec bash #5"
tags: ssh, truc, bash, ubuntu, linux, debian, shell
updated: 2007-01-27T14:22:20.000Z
lang: "fr"
node: "63693"
remoteId: "a878971184b2adf1013385e3f8d463e8"
published: 2006-11-26T16:53:06+01:00
---
 
Résumé des épisodes précédents :

* [Le prompt bash et la manipulation des titres des fenêtres](/post/etre-a-l-aise-avec-bash-1)
* [Navigation dans les répertoires en ligne de commande et les alias](/post/etre-a-l-aise-avec-bash-2)
* [L'historique et le complètement avancé avec bash](/post/etre-a-l-aise-avec-bash-3)
* [Les entrée/sorties, leur redirection et les motifs du shell](/post/etre-a-l-aise-avec-bash-4)
 

Ce billet est quant à lui consacré à l'enchaînement de commandes, au contrôles des tâches (*jobs*) puis à deux petites astuces bien pratiques à utilisées sans modération. Je pense que ce billet est le dernier de cette série, les prochains autour [du shell](/tag/shell) seront probablement sur les scripts et [diverses astuces](/tag/truc) plus ou moins pointues comme les deux présentées à la fin de ce billet.

  
## Enchaîner les commandes

 
L'utilisation probablement la plus courante d'un shell consiste à taper une commande, regarder sa sortie ou son résultat et éventuellement recommencer en fonction du résultat précédent. On peut aussi vouloir exécuter plusieurs commandes à la suite. Pour cela, on peut écrire un script ou une fonction bash (ce sera probablement l'objet d'une prochaine série de billets) mais il est aussi possible de le faire en mode interactif.

  
### Plusieurs commandes à la suite sans condition

 
Pour éxécuter plusieurs commandes de suite, il est possible de les écrire les unes à la suite des autres en les séparant par un point-virgule, par exemple :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ cd /tmp ; find . -type d -user tigrou > liste_dossiers ; cd ; cat /tmp/liste_dossiers
./orbit-tigrou
./ssh-QSQBhp4238
./gconfd-tigrou
./gconfd-tigrou/lock
./.exchange-tigrou
./listen
```

 
Cette liste de 4 commandes est regroupée sur une ligne, j'aurais aussi bien pu taper chacune d'elle sur une ligne séparée, le résultat aurait été le même. Si l'une d'entre elles échoue, les autres sont quand même exécutées.

   
### Plusieurs commandes à la suite sous condition

 
Chaque commande lancée renvoie normalement un code de retour. Par convention, un résultat normal (sans erreur) renvoie un code de retour égale à zéro, si quelque chose se passe mal, ce code est différent de zéro et peu avoir différentes significations selon les programmes. La variable $? contient le code de retour de la précédente commande lancée. En séparant des commandes par &amp;&amp;, bash vérifie que la commande a bien renvoyé un code de retour nulle avant d'éxécuter la suivante, sinon il interrompt la suite, exemple :

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ test -L /tmp
> tigrou@Lorien[192.168.0.243]:~$ echo $?
1
> tigrou@Lorien[192.168.0.243]:~$ test -e /tmp && echo "/tmp existe" && test -L /tmp && echo "/tmp est un lien symbolique"
/tmp existe
```

 
Cette suite de commande est interrompue après le **test -L** car son code de retour n'est pas nulle puisque /tmp n'est pas un lien symbolique.

    
## Contrôle des tâches

 
En ajoutant le caractère **&amp;** à une commande, celle-ci est lancée en arrière plan tout en restant &quot;attaché&quot; au shell qui l'a lancé. On peut aussi faire passer en arrière plan une commande avec le raccourci **Ctrl+z**. Pour récupèrer la main sur le programme passé en arrière plan, il est possible d'utiliser la commande [fg](http://pwet.fr/man/linux/commandes/fg). J'utilise couramment ce mécanisme lorsque j'édite un fichier à l'aide de [Vim](http://pwet.fr/man/linux/commandes/vim) en [ssh](http://pwet.fr/man/linux/commandes/ssh) et que je me rend compte que je dois lancer une autre commande, je peux alors faire Ctrl+z pour récupèrer le shell, je lance ma commande puis je tape fg pour reprendre la main sur mon éditeur. fg accepte en paramètre un entier qui indique le numéro de la tâche à remettre en avant plan. Ce numéro correspond à l'ordre dans lequel les programmes ont été mis en arrière plan.

   
## Quelques trucs...

  
### Un peu de couleurs avec grep

 
Les émulateurs de terminal sont capables d'afficher quelques couleurs (en général 16). La configuration par défaut sous la plupart des distributions fait en sorte que [ls](http://pwet.fr/man/linux/commandes/ls) affiche sa sortie avec des couleurs en fonction du type de fichier ou de son extension. D'autres programmes sont capables d'améliorer leur affichage avec un peu de couleur.

 
C'est par exemple le cas de [grep](http://pwet.fr/man/linux/commandes/grep) qui permet de filtrer un texte selon [une expression rationnelle](http://pwet.fr/man/linux/conventions/regex) en mettant en avant les morceaux de texte correspondant au motif, c'est assez pratique lorsque l'on tente de déchiffrer un fichier de log ou tout autre fichier texte.

 ``` bash
> tigrou@Lorien[192.168.0.243]:~$ cat .bashrc | egrep --color ' [a-z][a-z]='
```

 
Cette ligne permet d'obtenir tous les alias de 2 caractères. Ce qui donne dans mon terminal :

 


<figure class="object-center"><a href="/images/couleur-avec-grep.png">![Couleur avec grep](/images//couleur-avec-grep.png)
</a></figure>




 
Pour que ce comportement soit systématique, il suffit d'ajouter les lignes suivante dans son fichier ~/.bashrc :

 ``` bash
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
```

 
Pour que tout appel à grep (et à egrep) mette en valeur le motif trouvé.

   
### Suivre un fichier de log

 
[tail](http://pwet.fr/man/linux/commandes/tail) est un programme qui propose d'afficher les n dernières lignes ou les n derniers octets d'un fichier. Il dispose d'une option **-f** (pour *follow*) très intéressante permettant de suivre un fichier pour faire défiler les dernières lignes ajoutées. Cette option combinée à d'autres utilitaires de traitement de texte ([cut](http://pwet.fr/man/linux/commandes/cut), [sed](http://pwet.fr/man/linux/commandes/sed__1), [grep](http://pwet.fr/man/linux/commandes/grep), ...) permet de suivre différents types de journaux facilement, deux exemples courants :

 ``` bash
# suivre les logs d'Apache avec uniquement l'IP du visiteur, la page demandée,
# son navigateur et le référent sans les requêtes pour les images et les feuilles de style
tail -f access.log  | egrep -v --line-buffered '(/var|/design|/share)' | cut -d ' ' -f 1,7,12-

# suivre les logs de Postfix des mails rejetés
# avec uniquement la raison du rejet
tail -f mail.log | grep --line-buffered reject | cut -d ' ' -f 8-
```

 
À noter dans ces exemples, l'ajout du paramètre **--line-buffered** pour indiquer à grep de traiter les données ligne par ligne plutôt que par un buffer plus grand. Cette option permet de ne pas avoir de latence entre le moment ou tail écrit une nouvelle ligne et le moment ou grep la traite.

  
