---
title: "Anti spam avec Postfix"
tags: postfix, spam, mail, hébergement, truc, linux, debian
lang: "fr"
node: "62120"
remoteId: "35ee54efa9f0e0ff063b8fd66a04dd74"
published: 2006-10-25T23:40:52+02:00
updated: 2016-02-09 09:10
---
 
J'administre un serveur de messagerie utilisant
[Postfix](http://pwet.fr/man/linux/administration_systeme/postfix) +
[OpenLDAP](http://pwet.fr/man/linux/administration_systeme/slapd) avec le trio
[AMaViS new](http://pwet.fr/man/linux/administration_systeme/amavisd_new),
[ClamAV](http://pwet.fr/man/linux/administration_systeme/clamd) et SpamAssassin
pour le filtrage des *spams* et des virus le tout sur un serveur Debian Sarge (à
l'origine une Woody). Cette solution fonctionne très bien mais elle est
extrêment gourmande en ressources (en temps CPU et en mémoire) ce qui provoque
aux heures de pointe un embouteillage dans la file d'attente de Postfix. Il est
possible de résoudre en grande partie le problème avec deux manipulations :
l'une au niveau de Postfix et AMaVis new et l'autre simple au niveau de Postfix.

  
## Postfix et AMaVis new

 
Il possible de règler le nombre d'analyses simultanées effectués. Cette
manipulation ne sera utile pour les performances générales que si la machine est
suffisamment puissante, c'est à dire que même aux heures de pointe, elle
n'affiche pas une charge trop importante. Pour cela dans le fichier
/etc/postfix/master.cf, il faut aller modifier la ligne correspondant à AMaViS
new, chez moi cette ligne ressemble à :

 ``` 
smtp-amavis unix -      -       -     -       2  smtp
        -o smtp_data_done_timeout=1200
        -o smtp_send_xforward_command=yes
        -o disable_dns_lookups=yes
```

 
Le paramètre important ici est le 2 qui indique le nombre maximal de processus
qui peuvent s'éxécuter en même temps. En augmentant cette valeur, on augmente le
nombre de messages pouvant être traités en même temps sous réserve que la
machine soit suffisamment puissante. Pour que cette modification soit effective
il faut aussi mettre à jour la valeur correspondante dans le fichier
/etc/amavis/amavisd.conf

 ``` perl
# You may want $max_servers to match the width of your MTA pipe
$max_servers  =  2;   # number of pre-forked children          (default 2)
$max_requests = 10;   # retire a child after that many accepts (default 10)
```

 
Il est également possible de jourer sur la variable $max_requests pour éviter
des *forks* trop fréquents couteux en temps CPU au prix d'un peu de mémoire.

   
## Avec Postfix uniquement

 
Une autre solution (en fait une solution complémentaire) consiste à reporter une
partie du filtrage directement dans Postfix. Cette solution est très bien
expliquée dans cet article [Blocking SPAM (UCE) using
Postfix](http://www.akadia.com/services/postfix_uce.html).

  
### Appliquer une expression rationnelle sur les messages

 
En effet, Postfix est capable de faire des vérifications simples sur les
messages et de rejeter ceux ci, s'ils correspondent à [une expression
rationnelle](http://pwet.fr/man/linux/conventions/regex). Cette technique permet
par exemple d'exclure et de se protéger contre les vagues soudaines de *spams*
répétitifs du même type. En ce moment par exemple, je reçois énormément de spam
dont le sujet est V\*IAGRA est une ou deux lettres quelconques. Ces messages
peuvent être bloqués rapidement et directement par Postfix avec la configuration
suivante :

 ``` ini
# dans le fichier /etc/postfix/main.cf
header_checks = regexp:/etc/postfix/header_check.cf
```

 
Le fichier /etc/postfix/header_check.cf contient :

 ``` 
/^Subject: .*V?AGRA/               REJECT Spam
/^Subject: .*V??AGRA/             REJECT Spam
```

   
### Utilisation de *blacklists* 

 
Autre technique beaucoup plus efficace sur le long terme est l'utilisation
directement dans Postfix de plusieurs **RBL** (Realtime Blackhole List). Ce sont
des listes noires d'IP ou de domaines reconnus pour leur émissions de *spams*.
Cette configuration permet de *pré-filtrer* énormément de *spams* avec très peu
de ressources. L'inconvénient principal est qu'il faut faire confiance à ces
listes et qu'il arrivent parfois que les SMTP de certains grands fournisseurs
d'accès se retrouvent blacklistés comme c'est le cas en ce moment pour Orange
sur multihop.dsbl.org. Ces listes
s'utilisent très simplement dans Postfix de la manière suivante :

 ``` 
smtpd_recipient_restrictions = reject_invalid_hostname,
                               reject_unknown_recipient_domain,
                               reject_unauth_destination,
                               reject_rbl_client sbl.spamhaus.org,
                               permit
```

 
Il est tout à fait possible d'utiliser plusieurs listes, il suffit pour cela
d'enchaîner les
[reject_rbl_client](http://postfix.traduc.org/index.php/postconf.5.html#reject_rbl_client)
avec en paramètre l'adresse de la liste avant le permit pour les utiliser
séquentiellement.
