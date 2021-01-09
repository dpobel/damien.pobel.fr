---
title: "bash:  grep : commande introuvable"
tags: truc, bash, ubuntu, linux, shell
lang: "fr"
node: "61643"
remoteId: "addfca710c9f1803141efdc212408613"
published: 2006-10-01T01:06:33+02:00
updated: 2016-02-10 18:26
---
 
Voila plusieurs fois que je vois passer cette erreur comme par exemple
aujourd'hui [sur la liste de diffusion
Ubuntu-fr](http://www.mail-archive.com/ubuntu-fr@lists.ubuntu.com/msg09312.html)
(tient ce message n'apparaît pas dans [les archives officielles de
septembre](https://lists.ubuntu.com/archives/ubuntu-fr/2006-September/thread.html)
?). J'ai moi même eu ce problème lorsque j'ai commencé à utiliser [Ubuntu
Hoary](http://doc.ubuntu-fr.org//hoary), voila ce qui peut se
produire sur un exemple tout simple :

```bash
$ ls ~/Desktop | grep 'JPG'
bash:  grep : commande introuvable
```

 
L'utilitaire grep introuvable sur un système Linux&nbsp;? c'est probablement
possible mais après vérification il est bien installé et fonctionne correctement
sur d'autres exemples, alors d'où vient le problème&nbsp;?

Le problème se situe en fait lors de la frappe de la commande. En effet, pour
taper un *pipe* (|) il faut presser simultanément AltGr et le chiffre 6 sur le
haut du clavier et lorsque l'on tappe un peu rapidement il arrive fréquement que
le caractère espace suivant soit frappé alors que la touche AltGr est encore
enfoncée. Or, avec le clavier
[fr-latin9](https://bugs.freedesktop.org/attachment.cgi?id=6953) (dont [une
révision est en discussion](http://linuxfr.org/2006/09/13/21322.html)) cette
combinaison produit un caractère non-ASCII qui est [une espace
insécable](http://fr.wikipedia.org/wiki/Espace_insécable) ([espace est féminin
lorsqu'on parle d'un caractère](http://www.druide.com/points_de_langue_03.html))
que le shell ne reconnait pas malgré le fait que son apparence soit la même dans
un terminal. D'ailleurs il faut remarquer que dans le message d'erreur du shell,
il y a visiblement deux espaces avant grep. Le message est en fait &quot;bash:
&lt;espace insécable&gt;grep : commande introuvable&quot;.

 
Le fait que le clavier permette de taper des caractères spéciaux permettant de
respecter la typographie de la langue française me paraît plutôt une bonne
chose. Ici le problème est plus la combinaison malheureuse ajoutée au fait que
visuellement il n'y ait pas de différence entre l'espace et l'espace insécable.
Comme souvent sous Linux, il est possible de changer ce comportement à l'aide de
[xmodmap](http://pwet.fr/man/linux/commandes/x2/xmodmap). Pour cela il suffit de
créer un fichier .Xmodmap dans votre répertoire utilisateur (attention à la
casse sinon le fichier ne sera pas chargé automatiquement) avec le contenu
suivant :

``` 
keycode 65 = space space space space space
```
 
Ce fichier indique que la touche dont le code est 65 (la barre d'espace)
associée à n'importe quelle touche *modifier* (shift, control, alt, …) produit
une espace simple. Je n'ai pas l'utilité de taper des espaces insécables mais du
coup avec cette technique il est possible d'assigner n'importe quelle
combinaison de touche à un caractère particulier. Par exemple si on souhaite
pouvoir insérer des espaces insécables à l'aide de Shift+Espace (combinaison
plus difficile à taper par erreur ou enchaînement rapide) on peut mettre dans ce
fichier&nbsp;:

``` 
keycode 65 = space nobreakspace space space space
```
