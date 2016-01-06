---
title: "X11Forwarding : lancer une application sur un serveur et l'afficher ailleurs avec SSH"
tags:
    - ssh
    - x11
    - réseau
    - sécurité
    - ubuntu
    - linux
    - pense bête
    - shell
updated: 2007-02-03T15:26:55+01:00
lang: fr
node: 61447
remoteId: 1fff5ac545a07880bb4184230df8b4ee
---
 
SSH est, comme l'indique [la page du manuel du client ssh OpenSSH](http://pwet.fr/man/linux/commandes/ssh), un client permettant de s'identifier sur une machine distante et constitue un remplacement sécurisé (en tout cas crypté) de [telnet](http://pwet.fr/man/linux/commandes/telnet) et des utilitaires comme rsh ou rlogin qui s'appuient sur un identification par adresse IP ou pas mot de passe en clair. Une des particularités du [protocole SSH](http://fr.wikipedia.org/wiki/Secure_shell) est qu'il est prévu pour servir de transport à n'importe quel type de données. Cette application est appelée **TCPForwarding** et dans le cas d'application particulier de données &quot;graphiques&quot; cela s'appelle le **X11Forwarding** mais peut être utile pour faire circuler n'importe quelle informations de manière sûre ou pour faire des redirections de ports pour franchir un firewall par exemple.

  
## X11Forwarding, quels intérêts ?

 
La possibilité d'afficher une application sur une machine différente de celle qui l'éxécute est déjà possible par X11 de manière native ([avec un peu de configuration](http://www.linuxfocus.org/English/January2002/article222.shtml)), alors pourquoi en rajouter une couche avec SSH ? Il y a plusieurs avantages à utiliser le **X11Forwarding** :

* tout comme telnet, les connections par le protocole X11 sont en clair (ie non cryptées) et donc par nature assez peu sécurisées.
* l'utilisation est simpliste et en configurant SSH pour utiliser l'authentification par échange de clés, on peut lancer une application distante quasiment comme une application locale.
* ssh dispose d'une option permettant de compresser les données échangées, ce qui peut grandement améliorer les performances sur des lignes à faible débit (mais les ralentir sur d'autres, à tester donc...)
 

Évidemment cette solution comporte [quelques points faibles](http://www.hsc.fr/ressources/breves/ssh-x11.html.fr) mais quelle solution n'en a pas ?

   
## Configuration et utilisation

 
La mise en place de ce système est très simple. Sur le serveur sur lequel on va lancer les applications il faut installer [OpenSSH](http://www.openssh.org/fr/index.html) (à l'aide d'[apt-get](http://pwet.fr/man/linux/administration_systeme/apt_get) sur un système Ubuntu ou Debian ou du votre système de paquets préféré) et configurer le [daemon SSH](http://pwet.fr/man/linux/administration_systeme/sshd) en positionnant l'option *X11Forwarding* à *yes* dans le fichier de configuration [/etc/ssh/sshd_config](http://pwet.fr/man/linux/formats/sshd_config). Il ne faut évidemment par oublier de redémarrer le daemon ssh par :

 ``` bash
tigrou@mon-server:~ $ sudo /etc/init.d/ssh restart
```

 
Une fois cette opération réalisée, on peut lancer des applications sur la machine distante et les afficher sur votre machine locale (ou sur une autre machine distante d'ailleurs) avec la ligne de commande suivante :

 ``` bash
tigrou@machine-locale:~ $ ssh -c blowfish -X -C -f login@adresse ton_application
```

 
Explications : cette ligne indique à ssh de se connecter sur le serveur adresse &quot;adresse&quot; sous le login &quot;login&quot; pour y lancer *ton_application*.L'option -X indique que l'on souhaite utiliser le **X11Forwarding** ce qui signifie que ssh va installer toutes les variables d'environnements et faire toutes les opérations nécessaires pour cela.

Les autres options sont toutes facultatives. *-C* active la compression gzip qui peut ralentir ou accélèrer le lancement selon le débit (c'est à tester), *-c blowfish* indique à SSH d'utiliser un cryptage à l'aide de l'algorithme **blowfish** qui est normalement le plus performant. Enfin -f indique à SSH de passer en arrière plan une fois la commande lancée.

 
Après avoir tapé cette commande, par défaut ssh vous demandera votre mot de passe. Il est possible de s'authentifier uniquement à partir d'un système de clefs ou à partir d'une *passphrase*. Toutes ces possibilités sont détaillés dans [la documentation SSH sur Ubuntu-fr](http://doc.ubuntu-fr.org/applications/ssh#authentification_par_cle_publique) et feront peut être l'objet d'un billet tant les options, les possibilités et les usages sont nombreux. Il faudra alors regarder du côté de [ssh-agent](http://pwet.fr/man/linux/commandes/ssh_agent), [ssh-add]() et certainement [x11-ssh-askpass](http://pwet.fr/man/linux/commandes/x11_ssh_askpass)...

 
