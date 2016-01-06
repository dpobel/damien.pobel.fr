---
title: "Utiliser OpenOffice avec le look and feel GTK/GNOME sans GNOME"
tags:
    - truc
    - openoffice
    - openbox
    - gnome
    - x11
    - ubuntu
    - linux
updated: 2007-02-03T13:29:31+01:00
lang: fr
node: 61462
remoteId: 2aadde2c981603fbccb06f5b93d44fd0
---
 
Depuis sa version 2.0, [OpenOffice](http://pwet.fr/man/linux/commandes/openoffice) est capable de détecter l'environnement de bureau utilisé pour en imiter le style graphique, ou en tout cas pour utiliser les même boites de dialogue. Cette fonctionnalité fonctionne très bien sous GNOME (et j'imagine aussi sous KDE voire sous XFCE), mais malheureusement si on n'utilise aucun de ces environnements de bureau en utilisant uniquement un gestionnaire de fenêtre alternatif comme [openbox](http://pwet.fr/man/linux/commandes/openbox) par exemple, OpenOffice se trouve un peu perdu (c'est certainement le cas avec d'autres gestionnaire de fenêtre comme [fluxbox](http://pwet.fr/man/linux/commandes/fluxbox), [blackbox](http://pwet.fr/man/linux/commandes/blackbox), [WindowMaker](http://pwet.fr/man/linux/commandes/x2/wmaker), ...). Du coup OpenOffice ressemble à ça :

 


<figure class="object-center"><a href="/images/openoffice-sans-detection-de-bureau.png">![OpenOffice sans détection de bureau](/images/330x/openoffice-sans-detection-de-bureau.png)
</a></figure>




 
Pas génial ... Après pas mal de recherche, j'ai fini par découvrir sur [une page du Wiki d'OpenOffice](http://wiki.services.openoffice.org/wiki/Environment_Variables#Environment_variables_for_users) qu'on pouvait &quot;forcer&quot; la détection du bureau par une simple variable d'environnement. Comme le lancement de mon environnement de travail se fait par l'intermédiaire de mon ~/.xsession, il m'a suffit d'y placer la ligne suivante pour définir la variable d'environnement **OOO_FORCE_DESKTOP** :

 ``` bash
export OOO_FORCE_DESKTOP="gnome"
```

 
Avec cette ligne, OpenOffice prend quoi qu'il arrive le look and feel de GNOME, c'est dire quelque chose comme :

 


<figure class="object-center"><a href="/images/openoffice-avec-le-look-and-feel-gnome.png">![OpenOffice avec le look and feel GNOME](/images/330x/openoffice-avec-le-look-and-feel-gnome.png)
</a></figure>




 
C'est tout de même beaucoup plus agréable, bien que ça semble un poil plus lent au lancement.

 
Une autre solution possible pour résoudre ce problème est de lancer le programme **gnome-settings-daemon** en même temps que la session. Il semble en effet qu'en lançant ce programme OpenOffice soit capable de détecter le bureau GNOME, mais si je n'utilise pas GNOME c'est justement pour éviter de lancer toute la machinerie derrière gourmande en ressources, donc autant se passer de gnome-settings-daemon.

