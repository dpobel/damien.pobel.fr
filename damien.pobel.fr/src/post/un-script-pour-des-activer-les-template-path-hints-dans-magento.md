---
title: "Un script pour (dés)activer les template path hints dans Magento"
tags: php, magento, template, shell
updated: 2010-07-13T15:52:50.000Z
lang: "fr"
node: "67973"
remoteId: "240a8f10a42e1a6c6c20606bc91068d7"
published: 2009-10-02T00:11:00+02:00
---

Comme je l'écrivais il y a quelques jours, [le backoffice de Magento est plutôt
sympa](/post/13-jours-avec-magento) mais un peu mou. En plus les options pour le
développeur sont bien cachés au fin fond du menu *System*. Si je compte bien, à
partir du tableau de bord il faut pas moins de 7 clics et 4 rafraîchissements de
page pour activer ou désactiver l'option *Template path hints* (affichage des
*templates* utilisés) et/ou l'affichage du nom des
*blocks*
pour un site… Bref c'est extrêmement pénible quand il s'agit juste de voir où
se trouve une coquille dans un *template* ou de connaître le nom du *block* à
surcharger.


J'ai donc un écrit [un petit
script](https://github.com/dpobel/stuff/blob/master/magento/scripts/setdebug.php)
qui permet d'activer ou de désactiver ces options pour un site
[Magento](/tag/magento) en ligne de commande. Il permet également d'activer
facilement ces options pour le backoffice sans manipuler directement la base de
données (ce qui n'est certes pas très compliqué une fois qu'on connaît le nom de
la bonne table).


Exemples d'utilisation :

``` bash
cd /path/to/magento
php /path/to/script/setdebug.php -s base # active template path hints pour le site dont le code est base
php /path/to/script/setdebug.php -b -s base # active template path hints et l'affichage des blocks
php /path/to/script/setdebug.php -d -s base # désactive template path hints et l'affichage des blocks
```

