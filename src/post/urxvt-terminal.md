---
title: "URXVT, my new terminal emulator"
tags: linux, shell, terminal, x11
published: 2013-03-19T08:12:59+01:00
lang: en
photos:
    - images/urxvt.jpg
---

A terminal emulator is like a pair of hiking shoes, it takes time to choose it
but it's a good sign if you don't pay attention to it after a while. For about 2
years, I have used [Terminator](http://www.tenshu.net/p/terminator.html) on all
my machines.  Terminator is a very powerful terminal emulator with a lot of
features. Among others, it has tabs, it handles true transparency, it detects
urls, it allows to split each tab into several embed terminals... On the other
hand, Terminator is also quite slow and for a tool you use several hours a day,
that's annoying. So I was looking for a faster and lighter alternative with at
least tabs, url detections and not too many dependencies.

Some days ago, while trying different plugins for my Vim setup, I (re)discovered
[URXVT](http://software.schmorp.de/pkg/rxvt-unicode.html) ([man
urxvt](http://pwet.fr/man/linux/commandes/urxvt)) and I realized that you can
add plugins to it and through some of them, it supports tabs and URL detection
and more! So I switched to URXVT. My configuration (to put in
`~/.Xdefaults`) is [available on
Github](https://github.com/dpobel/config/blob/master/x/Xdefaults). To get the
tabs, you need to put the [tabbedex
plugin](https://github.com/stepb/urxvt-tabbedex) in the directory
`~/.urxvt/`. This plugin replaces the default one (called tabbed); it
allows to rename tabs, to put the title of the focused tab next to the tab bar,
to hide the "new" button...

This gives the following result:

<figure class="object-center"><img src="/images/urxvt.jpg" alt="2 URXVT
window"></figure>

To handle the tabs, the following keyboard shortcuts are available:

* `Shift + Down` to add a new tab
* `Shift + Right` / `Shift + Left` to focus the next/previous tab
* `Shift + Up` to rename the current tab
* `Control + Right` / `Control + Left` to move a tab

For now, the only missing feature is the ability to split vertically or
horizontally the terminal. URXVT is not able to do this on its own so I'll have
to use an external tool like [GNU screen](http://www.gnu.org/software/screen/)
([man screen](http://pwet.fr/man/linux/commandes/screen)) or
[tmux](http://tmux.sourceforge.net/) but that will be for another post.
