---
title: "Theme Gtk2, Gtk3 et Qt4 unifié"
tags: ubuntu, gtk, gnome, openbox, linux
lang: "fr"
published: 2013-04-07T18:43:30+02:00
updated: 2016-02-12 13:33
---

Après [le changement de disque dur](/post/rue-du-commerce-client-perdu) de mon PC
portable, j'ai réinstallé Ubuntu 12.10 The Quantal Quetzal. Bien que plutôt
agréablement surpris par Unity, celui-ci ne correspond pas à mon usage. En
effet, depuis quelques années j'utilise [un environnement graphique basé sur
Openbox](/tag/openbox) principalement pour ses performances et le fait de
pouvoir presque tout faire avec des raccourcis claviers.

Un problème courant avec ce type d'environnement est l'intégration
d'applications venant de GNOME ou KDE qui se retrouvent souvent avec le thème
par défaut ou des styles complètement différents. Quelques lignes de
configuration suffisent à obtenir un ensemble cohérent pour les applications
Gtk2, Gtk3 et Qt4.

Pour Gtk2, le fichier `~/.gtkrc-2.0` permet de configurer le thème à
utiliser. L'application gtk-theme-switch2 disponible dans le paquet
`gtk-theme-switch` permet
de générer une version de base. Le fichier généré inclut le fichier
`~/.gtkrc-2.0.mine` dans lequel il est possible faire [des
ajustements](https://developer.gnome.org/gtk2/stable/GtkSettings.html#GtkSettings.properties)
par rapport au thème. [Le mien est disponible sur
Github](https://github.com/dpobel/config/blob/master/gtkrc-2.0.mine).

Pour Gtk3, le fichier `~/.config/gtk-3.0/settings.ini` permet de
régler le thème à utiliser et [divers
paramètres](https://developer.gnome.org/gtk3/3.1/GtkSettings.html#GtkSettings.properties).
Là encore, [mon fichier de configuration est disponible sur
Github](https://github.com/dpobel/config/blob/master/config/gtk-3.0/settings.ini).

Enfin pour Qt4, le fichier de configuration est
`~/.config/Trolltech.conf` mais celui-ci assez compliqué... Le plus
simple est d'installer le paquet
`qt4-qtconfig` qui fournit
l'application qtconfig-qt4. Celle-ci permet notamment de choisir Gtk+ comme
style d'interface graphique. Les applications Qt prennent alors le même style
que les applications Gtk.

Au final, le thème utilisé par les applications écrites avec différents
*toolkits* est cohérent, par exemple entre  Firefox (Gtk2), nautilus (Gtk3) et
Virtualbox (Qt4), les différences sont minimes&nbsp;:

<figure class="object-center"><a href="/images/theme-gtk2-gtk3-qt4.jpg"><img
src="/images/660x/theme-gtk2-gtk3-qt4.jpg" alt="Theme Gtk2, Gtk3 et Qt4
unifié"></a></figure>
