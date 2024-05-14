---
title: "Statistiques web avec AWStats sous Ubuntu en mode CGI"
tags: hébergement, apache, bash, dedibox, ubuntu, linux
lang: "fr"
node: "64124"
remoteId: "41b20c2a9e984b76efd4f822590910a7"
published: 2007-01-23T22:47:36+01:00
updated: 2024-05-14
---

Il existe beaucoup d'outils de statistiques web, personnellement j'utilise
[AWstats](https://awstats.sourceforge.net/) depuis de nombreuses années. Pour
faire simple, je l'utilise en mode CGI et mes statistiques sont mises à jour une
fois par jour lors de la rotation des logs avec
[logrotate](http://pwet.fr/man/linux/administration_systeme/logrotate).

Cette configuration fonctionne sans problèmes sous Ubuntu depuis de nombreuses
versions et ne devrait pas être très différente sous Debian et moyennant
quelques petites modifications sous tout *Unix like*.

## Installation et configuration de AWStats

Comme d'habitude sous Ubuntu, il existe un paquet pour installer AWStats, il
suffit donc de l'installer avec
[synaptic](http://pwet.fr/man/linux/administration_systeme/synaptic) (ou
équivalent) ou de taper dans un terminal :

```bash
$ sudo apt-get install awstats
```

AWStats se configure à l'aide d'un fichier texte stocké dans `/etc/awstats`. Le plus simple pour commencer la configuration est de partir du fichier `/etc/awstats/awstats.conf` en le copiant :

```bash
$ sudo cp /etc/awstats/awstats.conf /etc/awstats/awstats.DOMAINECONSULTATION.TLD.conf
```

où `DOMAINECONSULTATION.TLD` est le domaine par lequel les statistiques seront
accessibles. Pour ma part, je les consulte par `http://pwet.fr/stats/`, mon
fichier est donc `awstats.pwet.fr.conf`. Si je les consultais _via_
`http://www.pwet.fr/stats/`, ce serait `awstats.www.pwet.fr.conf`.

Il faut ensuite éditer ce fichier et modifier quelques paramètres pour les adapter à votre configuration (les commentaires dans ce fichier sont très utiles) :

 * `LogFile` : le chemin complet vers le fichier de log d'Apache (par exemple `/var/log/apache2/access.domaine.tld.log`)
 * `LogFormat` : il faut indiquer le format de log, j'utilise `combined` dans Apache, donc 1 est la bonne valeur
 * `SiteDomain` : le domaine principal du site, ici `pwet.fr`
 * `HostAliases` : toutes les adresses permettant de contacter le site, pour ma part `pwet.fr www.pwet.fr admin.pwet.fr`
 * `DirCgi` : mettre `/stats` car les statistiques seront accessibles via `http://domaine.tld/stats`
 * `DirIcons` : mettre `/icon` cf. la config d'apache plus bas.
 * `AllowFullYearView` : 3 pour pouvoir voir les stats sur une année
 * `AllowAccessFromWebToAuthenticatedUsersOnly` : mettre 1 pour obliger l'identification HTTP
 * `AllowAccessFromWebToFollowingAuthenticatedUsers` : mettre le ou les logins (séparés par des espaces) des personnes ayant accès aux stats.

Dans le cadre de ce document, le reste des options ne nécessite pas de
modification ou de valeur particulière. Personnellement, je met mon IP dans
`SkipHosts` pour m'exclure des statistiques.


## Rotation des logs avec logrotate et mise à jour des statistiques


Maintenant qu'AWStats est configuré correctement, il faut lui faire génèrer les
statistiques. Pour cela, il est possible d'utiliser
[logrotate](http://pwet.fr/man/linux/administration_systeme/logrotate) qui en
plus de faire le ménage dans les logs, va lancer awstats pour génèrer les
statistiques. Pour cela, il faut créer un fichier (par exemple `pwet`)
dans `/etc/logrotate.d` et y mettre :

 ``` bash
/sites/web/pwet.fr/logs/*.log {
        daily
        size 1 # si la taille des logs est > 1octet
        rotate 365 # garder une année de log
        compress # compresser les vieux logs
        dateext # les vieux logs seront datés
        create 640 root root # créer un nouveau fichier avec ces droits
        sharedscripts # lancer prerotate et postrotate une seule fois pour tous les logs
        olddir /sites/web/pwet.fr/logs/old/
        prerotate
                # Avant de changer de fichier
               /usr/lib/cgi-bin/awstats.pl -config=pwet.fr -update
        endscript
        postrotate
               # après le changment de fichier, on redémarre apache
               if pgrep -f ^/usr/sbin/apache2 > /dev/null; then
                     invoke-rc.d apache2 reload 2>&1 | logger -t apache2.logrotate
               fi
               # ajustement des permissions des fichiers de AWStats
               chown -R www-data:www-data /var/lib/awstats/
        endscript
}
```


Il est important de recharger (reload)
[apache](http://pwet.fr/man/linux/administration_systeme/apache2) après le
changement de fichiers de logs, sinon celui-ci se plaindera de nous pouvoir écrire
dans ses fichiers de log. Pour que la mise à jour fonctionne, il faut biensûr que le
paramètre `-config` de AWStats soit en accord avec le nommage du fichier de
configuration.

Petite précision sur la génération des statistiques, si vous avez déjà un stock
de logs, il faudra les traiter avant et dans l'ordre chronologique. Si il sont
déjà *gzippé* dans un répertoire, ceci peut se faire avec un morceau de
[bash](http://pwet.fr/man/linux/commandes/bash) du genre :

```bash
cd LE_REPERTOIRE
for f in *.log.gz ; do
  echo "$f"
  gzip -d "$f"
  /usr/lib/cgi-bin/awstats.pl -config=domaine.tld -update -LogFile=${f/.gz/}
  gzip "${f/.gz/}"
done
```


## Consultation en mode CGI

Maintenant que les statistiques sont générées, il ne reste plus qu'à permettre
leur consultation via le web. La configuration suivante incorporée au
VirtualHost de mon site permet de consulter les statistiques via le `/stats` :

 ``` apache
Alias /awstatsclasses "/usr/share/awstats/classes/"
Alias /awstatscss "/usr/share/awstats/css/"
# mêmes paramètres que dans awstats.*.conf
Alias /stats /usr/lib/cgi-bin/
Alias /icon "/usr/share/awstats/icon/"
<Directory /usr/lib/cgi-bin/>
  DirectoryIndex awstats.pl
  AddHandler cgi-script .pl
  UseCanonicalName off
  AuthName "Statistiques de pwet.fr"
  AuthType Basic
  Require valid-user
  AuthUserFile /sites/web/pwet.fr/.passwdstats
  Options +ExecCGI
  AllowOverride None
</Directory>
```


Pour que cela fonctionne, il faut que les modules `alias`, `auth` et `cgi` soit
activés (par exemple en utilisant
[a2enmod](http://pwet.fr/man/linux/administration_systeme/a2enmod/)), il faut
aussi créer le fichier qui stocke les comptes ayant accès aux stats en utilisant
[htpasswd](http://pwet.fr/man/linux/commandes/htpasswd) et en oubliant pas de
faire correspondre le(s) login(s) avec ceux indiqués dans le paramètre
`AllowAccessFromWebToFollowingAuthenticatedUsers` de AWStats.
