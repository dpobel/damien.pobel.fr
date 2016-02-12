---
title: "PHP4 (mod_php) et PHP5 (fastcgi) avec Apache sous Ubuntu"
tags: hébergement, apache, dedibox, ubuntu, linux, php
updated: 2007-01-30T13:15:33.000Z
lang: "fr"
node: "63988"
remoteId: "64bad30ec0d02d6e8187d6ab0b78de20"
published: 2007-01-10T22:33:38+01:00
---
 
J'ai finalement choisi Ubuntu comme système sur [ma dedibox fraîchement livrée](/post/une-dedibox-en-moins-de-temps-qu-il-en-faut-pour-le-dire). Du coup, j'ai un système à configurer car j'ai plusieurs projets pour cette machine. Le premier étant d'héberger [pwet.fr]() et de pouvoir à côté tester / développer des applications en PHP5. J'ai donc besoin de faire cohabiter ces deux versions. Sachant que ce site utilise [eZ publish](), je préfère avoir PHP4 en module (a priori plus performant), PHP5 en FastCGI (plus rapide qu'en CGI) le tout avec Apache 1.3 pour la stabilité. La première chose à faire est évidemment d'installer tout le nécessaire (il faut activer [le dépôt Universe](http://doc.ubuntu-fr.org/depots)) :

 ``` bash
$ sudo apt-get install apache libapache-mod-php4 php4-domxml php4-pear php4-pear-log php5-cgi php5-mysqli php5-xsl php5-gd php5-pear libapache-mod-fastcgi libapache-mod-actions
```

 
Une fois tout cela installé, il faut activer les modules nécessaires, le plus simple étant d'utiliser [apache-modconf](http://pwet.fr/man/linux/administration_systeme/apache_modconf) puis de redémarrer [apache](http://pwet.fr/man/linux/administration_systeme/apache) :

 ``` bash
$ sudo apache-modconf apache enable mod_php4
$ sudo apache-modconf apache enable mod_fastcgi
$ sudo apache-modconf apache enable mod_actions
$ sudo /etc/init.d/apache restart
```

 
À partir de là, PHP4 devrait déjà fonctionner sur les fichiers terminant par .php, pour vérifier il suffit de créer un *virtual host* et d'y mettre un [phpinfo](http://fr.php.net/phpinfo). Ainsi tout à la fin de /etc/apache/httpd.conf, il suffit d'y mettre :

 ``` apache
NameVirtualHost __IP__:80
<VirtualHost __IP__:80>
    ServerAdmin __EMAIL__
    DocumentRoot /var/www/votresite.fr
    ServerName votresite.fr
    ErrorLog /var/log/apache/errors-votresite.fr.log
    CustomLog /var/log/apache/access-votresite.fr.log common
</VirtualHost>
```

 
En remplaçant évidemment __IP__, __EMAIL__ et votresite.fr par les valeurs nécessaires ;) Il suffit alors de créer un fichier info.php et d'y placer un appel à la fonction PHP phpinfo et de l'appeler dans votre navigateur via votresite.fr/info.php pour obtenir le fameux PHPInfo.

 
Reste maintenant à configurer Apache pour interprèter les fichiers .php5 avec la version CGI de php5 via le module FastCGI. Pour cela, il faut modifier le fichier /etc/apache/conf.d/fastcgi.conf comme suit :

 ``` apache
<IfModule mod_fastcgi.c>
  AddHandler fastcgi-script .fcgi
  FastCgiIpcDir /var/lib/apache/fastcgi
  FastCgiServer /var/www/votresite.fr/php5-wrapper.fcgi -processes 1 -idle-timeout 180 -socket /tmp/fastcgi.socket
  AddHandler php5-fastcgi .php5
  Action php5-fastcgi /php5-wrapper.fcgi
</IfModule>
```

 
Il reste alors à créer le fichier /var/www/votresite.fr/php5-wrapper.fcgi qui est en fait un simple script shell faisant appel à la version CGI de PHP5 :

 ``` bash
#!/bin/sh 
PHP_FCGI_CHILDREN=4
export PHP_FCGI_CHILDREN
PHP_FCGI_MAX_REQUESTS=1000
export PHP_FCGI_MAX_REQUESTS
exec /usr/bin/php5-cgi
```

 
Il reste plus qu'à tester en copiant le fichier info.php en info.php5 et en l'appelant votresite.fr/info.php5, qui affichera normalement les informations sur l'installation de PHP5.

