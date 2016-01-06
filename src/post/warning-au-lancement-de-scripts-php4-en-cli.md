---
title: "Warning au lancement de scripts PHP4 en CLI"
tags: ez publish, dedibox, ubuntu, linux, php, debian
updated: 2008-10-31T08:41:29.000Z
lang: "fr"
node: "64732"
remoteId: "567b46f774ab2a4e300673192b982ba4"
published: 2007-03-10T14:54:38+01:00
---

J'ai un *warning* pénible lors du lancement d'un script PHP4 en ligne de commande (CLI) sur ma [Ubuntu Edgy Eft](http://doc.ubuntu-fr.org/versions/edgy_eft) installée sur [ma Dedibox](/post/migration-sur-dedipwet). Rien de bien grave, mais à chaque lancement d'un script (au hasard un de [ceux d'eZ Publish](/post/les-scripts-cli-fournis-avec-ez-publish) :-), j'ai le message suivant :

``` bash
$ php4 update/common/scripts/cleanup.php -s plain_site_admin expired_session
PHP Warning:  mime_magic: type regex            BEGIN[[:space:]]*[{]    application/x-awk invalid in Unknown on line 0
```


Un moyen de supprimer ce message systématique trouvé sur [Launchpad](https://bugs.launchpad.net/ubuntu/+source/php4/+bug/59183) et sur [l'outil de rapport de bug de Debian](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=361789) est d'aller commenter la ligne 273 du fichier [/usr/share/file/magic.mime](http://pwet.fr/man/linux/formats/magic). Simple, un peu crade mais au moins ça marche et puis je ne pense pas que cette modification ait beaucoup d'impact sur le reste du système...

