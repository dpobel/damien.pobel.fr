---
title: "Mise à jour noyau sur une dedibox"
tags: hébergement, dedibox, ubuntu, linux, sécurité
updated: 2008-10-22T15:26:04.000Z
lang: "fr"
node: "66656"
remoteId: "b3a23e23ebb67a765405090ff791f737"
published: 2008-02-14T00:27:53+01:00
---

[Plusieurs bugs de sécurté importants ont été découverts dans le noyau Linux](http://linuxfr.org/2008/02/13/23685.html), en particulier [le bug CVE-2008-0600](http://nvd.nist.gov/nvd.cfm?/page/cvename=CVE-2008-0600) permet à un utilisateur local d'obtenir un shell avec les droits root assez simplement. Même sans utilisateurs locaux, la faille peut devenir exploitable via une autre faille d'une application web par exemple, même si ça devient beaucoup plus compliqué.


La seule solution est de mettre à jour son noyau. J'ai réalisé cette opération tout à l'heure sauf que je ne connaissais pas encore le *petit* détail mentionné [dans ce billet](http://www.mumblyworld.info/index.php?post/04/01/2008/Mise-a-jour-Ubuntu-704-vers-710-%3A-le-cas-Dedibox) et rappelé [dans un topic du forum Ubuntu-fr](http://forum.ubuntu-fr.org/viewtopic.php?pid=1533153#p1533080) ce qui m'a donné un bon gros coup de stress :-) et [une bonne heure de pwet.fr HS](http://www.woozweb.com/ressourcedetail/pwet.fr/20070912135319CF489351/) :-/


Bref, sur les dedibox utilisant le noyau fournit par Dedibox la manipulation est simple. Une fois [le kernel spécifique installé](http://documentation.dedibox.fr/doku.php?id=distrib:kernel), il faut indiquer l'emplacement de la racine du système avec l'ancienne syntaxe (type /dev/sdXY) au lieu des <abbr title="Universal Unique Identifier">UUID</abbr> . Sinon la machine ne reboote pas. Heureusement, [les dedibox ont un système de rescue](http://documentation.dedibox.fr/doku.php?id=gestion:rescue2) bien pratique qui permet de se sortir de ce genre de situation. Concrètement, avant pour chaque choix dans le fichier /boot/grub/menu.lst, j'avais quelque chose comme :

``` bash
title       Ubuntu, kernel 2.6.24.2
root        (hd0,0)
kernel     /vmlinuz-2.6.24.2 root=UUID=238ddcbc-cb7e-4023-a48e-932d874b5ef0 ro quiet splash
quiet
savedefault
```


que j'ai remplacé par

``` bash
title       Ubuntu, kernel 2.6.24.2
root        (hd0,0)
kernel      /vmlinuz-2.6.24.2 root=/dev/sda3 ro quiet splash
quiet
savedefault

```


Évidemment, /dev/sdaY est spécifique à l'organisation de la machine, il s'agit du numéro de la partition root du système. Il semble qu'avec le partitionnement par défault, il s'agisse de /dev/sda2. Avec le système de rescue de Dedibox, pour déterminer qu'elle est le bon numéro, il faut [monter toutes les partitions du système](http://documentation.dedibox.fr/doku.php?id=gestion:rescue2#modifier_la_configuration_du_bootloader) et trouver le numéro de celle qui contient toute l'arborescence ( /bin, /usr, /lib, ...).

