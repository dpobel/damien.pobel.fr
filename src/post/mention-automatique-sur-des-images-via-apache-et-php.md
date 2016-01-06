---
title: Mention automatique sur des images via Apache et PHP
tags: humeurs, photo, apache, dedibox, licence, php
updated: 2007-07-31T07:17:34.000Z
lang: fr
node: 64744
remoteId: 3379fca1e1df71801e38319d8f7f81ba
published: 2007-03-11T22:19:12+01:00
---
 
Comme [je l'indiquais dernièrement](/page/about), j'ai décidé de placer [mes photos](http://photos.pwet.fr) et [mes billets](/) sous [Licence Creative Commons CC-By-Sa](http://creativecommons.org/licenses/by-sa/2.0/fr/) ce qui implique de citer mon nom (ou je me contente de l'adresse d'origine du site) lors de l'utilisation de ces contenus. Mais je me rend compte en regardant [mes statistiques générées avec AWStats](/post/statistiques-web-avec-awstats-sous-ubuntu-en-mode-cgi) que beaucoup de gens *hotlink* mes photos sur divers [blogs](http://llal-1.tchatcheblog.com/10210767/blog-article-olivier.aspx), [page myspace](http://www.myspace.com/laruedesdeuxcons) ou [divers](http://bibli.forumzen.com/dortoire-c4/pre-f11/pre-t19.htm)[forums](http://www.startimes2.com/f.aspx?t=3701084&amp;pg=5#cell_80024203)[sans rien mentionner de leur provenance](http://www.ouverturefacile.com/forums/index.php?showtopic=2780&amp;st=500) et ça m'énerve un peu... Alors bien sûr, je peux m'inscrire et rajouter les mentions nécessaires dans le topic du forum en question mais :

* c'est long et fastidieux ;
* parfois impossible ;
* bien souvent [les administrateurs prennent peur et retirent purement et simplement l'image](http://www.mordurezo.com/smf/index.php?topic=4279.msg37283#msg37283) alors que je demande juste une simple et courte mention.
 
 
J'ai donc décidé d'automatiser un peu le processus en utilisant [quelques règles de *Rewriting Apache*](http://httpd.apache.org/docs/1.3/mod/mod_rewrite.html) et un simple script PHP qui ajoute un texte à la volée et met en cache les images hébergées sur [ma Dedibox](/post/migration-sur-dedipwet) mais utilisées hors de [pwet.fr](http://pwet.fr). Je n'aime pas trop le procédé, mais je n'en vois pas d'autre...

 
Techniquement parlant, j'ai mis la configuration suivante dans mon fichier de configuration d'Apache :

``` apache
RewriteCond %{HTTP_REFERER} !^$ [NC] 
RewriteCond %{HTTP_REFERER} !^http://.*pwet\.fr.*$ [NC] 
RewriteCond %{HTTP_REFERER} !^http://images\.google\..*$ [NC] 
RewriteRule .*\.jpg$ /hotlink.php?img=%{SCRIPT_FILENAME}&ref=%{HTTP_REFERER}
```


Ce qui signifie que lors de l'appel à une image si une URL référente est définie et n'est ni pwet.fr, ni Google Images alors l'image renvoyée est en fait traitée par un script.

 
[Le script hotlink.php](/files/hotlink.php.txt) est un traitement qui ajoute un texte blanc en bas de l'image en fonction de la taille de l'image en utilisant [les fonctions de traitements d'image de la bibliothèque GD](http://fr3.php.net/gd).

