---
title: "Être à l'aise avec bash #1"
tags: geek, ssh, x11, truc, bash, ubuntu, debian, shell
updated: 2006-11-26T12:05:14.000Z
lang: "fr"
node: "62339"
remoteId: "cd23106da34dd3f5f883d7dfd8ac063b"
published: 2006-10-29T16:36:16+01:00
---
 
Bien que la plupart des distributions Linux et Ubuntu en particulier tendent à minimiser voire à rendre complètement inutile l'utilisation de la ligne de commande, il peut être intéressant de rendre cet outil un peu plus accueillant et facile d'utilisation. Pourquoi ? Si [Xorg](http://pwet.fr/man/linux/commandes/x2/xorg) plante, c'est tout ce qui reste et puis [pour certaines tâches](/post/remplacer-du-texte-dans-une-serie-de-fichiers-repartis-dans-des-dossiers), il n'y a pas plus rapide... Ce billet ouvre donc une série consacrée à la configuration et l'utilisation de bash.

  
## Le prompt

 
[Laurent - CyberSDF](http://cybersdf.org/) a publié [un court billet présentant un outils en ligne permettant de créer un prompt plus fantaisiste](http://cybersdf.org/2006/10/28/207-changez-votre-prompt) que celui par défaut. Au delà de l'aspect purement esthétique, le *prompt* est la première chose que l'on voit lors de l'utilisation du shell, il peut donc mettre en valeur des informations importantes. Au travail ou à la maison, j'ai potentiellement accès en [SSH](http://pwet.fr/man/linux/commandes/ssh) à 13 machines différentes (3 Ubuntu, 9 Debian et une [Solaris](/post/solaris-et-les-outils-gnu) pour les curieux), et je suis fréquemment connecté à 3 ou 4 machines en même temps, le *prompt* doit donc m'indiquer sur quelle machine je suis et surtout avec quel *login*, pour cela j'utilise la configuration suivante soit dans le fichier /etc/bash.bashrc soit dans mon ~/.bashrc :

 ``` bash
# couleurs
C_RED="\[\e[1;31m\]"
C_BLUE="\[\e[1;34m\]"
C_GRAY="\[\e[1;30m\]"
C_WHITE="\[\e[1;37m\]"
C_YELLOW="\[\e[1;33m\]"
C_DEF="\[\033[0m\]"

mUID=`id -u`
MACHINE="Lorien"
IP="192.168.0.243"

if [ "$mUID" = "0" ] ; then
   PS1="${C_YELLOW}>${C_DEF} ${C_RED}\u${C_DEF}@${MACHINE}${C_YELLOW}[${C_DEF}$IP${C_YELLOW}]${C_DEF}:\w${C_RED}#${C_DEF} "
   PS2="${C_RED}>${C_DEF}  "
else
   PS1="${C_YELLOW}>${C_DEF} ${C_BLUE}\u${C_DEF}@${MACHINE}${C_YELLOW}[${C_DEF}$IP${C_YELLOW}]${C_DEF}:\w${C_BLUE}\$ ${C_DEF}"
   PS2="${C_BLUE}>${C_DEF}  "
fi

export PS2
export PS1
```

 
Cette configuration fait en sorte d'avoir un *prompt* bleu, jaune et blanc pour un utilisateur normal et rouge, jaune et blanc pour l'utilisateur root attirant ainsi mon attention sur le fait qu'en root, on ne tape par n'importe quoi... Il m'indique aussi le nom de la machine ainsi que son adresse IP. Ce qui donne :

 


<figure class="object-center"><a href="/images/prompt-bash.png"><img src="/images//prompt-bash.png" alt="Prompt bash">
</a></figure>




   
## Le titre des terminaux graphiques

 
De la même manière que le *prompt*, le titre des terminaux est très utile pour se repèrer lorsqu'on utilise Xorg. Dans un terminal, il est possible de changer ce titre de manière dynamique avec un simple echo, il suffit alors d'utiliser la variable PROMPT_COMMAND pour stocker une commande que le shell éxécutera à chaque affichage du prompt.

 ``` bash
case $TERM in
xterm*)
  PROMPT_COMMAND='echo -ne "\033]0;${USER}@${MACHINE}[$IP]: ${PWD}\007"'
  echo -ne "\033]0;${USER}@${MACHINE}[$IP]: ${PWD}\007"
   ;;
 *)
  setterm -blength 0
  ;;
esac
```

 
Avec ces quelques lignes, les terminaux affiche la même chose que le prompt dans leur titre (sans les couleurs) lorsque le type de terminal commence par &quot;xterm&quot; (ce qui est le cas avec [xterm](http://pwet.fr/man/linux/commandes/xterm) mais aussi [gnome-terminal](http://pwet.fr/man/linux/commandes/gnome_terminal)).

 
À noter que la seconde partie du *case* permet de supprimer le *beep* très énervant beep lorsqu'on est en console sans Xorg.

 