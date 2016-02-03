---
title: Passer de Vim à Neovim
tags: vim, neovim, terminal, linux, ubuntu
published: 2016-02-03 23:10
photos:
    - images/neovim.png
---

[Neovim](https://Neovim.io/) est un *fork* de Vim né il y a [environ 2
ans](https://linuxfr.org/news/Neovim-une-refonte-de-vim-pour-le-21e-siecle) et
dont les premières versions publiques ont été mises à disposition [à la fin de
l'année dernière](https://Neovim.io/news/2015/december/). Je suis [un fervent
utilisateur de Vim](/tag/vim/) depuis... pfffiou une quinzaine d'année mais je
trouve [ce *fork* plutôt appropriée avec de bonnes
idées](https://neovim.io/charter/). Par exemple Neovim permet d'éxécuter des
tâches de manière asynchrone dans les plugins, j'aurais adoré avoir cette
fonctionnalités quand je développais [le plugin eZVim pour eZ
Publish](/tag/ezvim/) il y a quelques années.

## Installation

L'installation de Neovim est bien détaillée dans [Installing
Neovim](https://github.com/Neovim/Neovim/wiki/Installing-Neovim#install-from-package).
Sur une Ubuntu (postérieure à 12.04 Precise Pangolin), pour l'installer, il
suffit d'activer le [PPA](https://doc.ubuntu-fr.org/ppa) correspondant et ensuite d'installer le paquet `neovim`.
En fonction des plugins, il sera peut-être nécessaire d'installer quelques
paquets liés à Python. Cette même page propose également de configurer le
système d'alternatives pour lancer Neovim avec les commandes `vim`, `vi` et
`editor`, sinon il faudra impérativement utiliser `nvim`.

## Configuration

Le fichier de configuration principale `~/.vimrc` est remplacé par
`~/.config/nvim/init.vim` et le dossier `~/.vim` est remplacé par
`~/.config/nvim/`. [La documentation pour passer de Vim à
Neovim](https://neovim.io/doc/user/nvim_from_vim.html) conseille de faire des
liens symboliques. Pour ma part, j'ai préfèré profiter de l'occasion pour
remettre à plat ma configuration un peu vieillissante au niveau des plugins et
pour notamment remplacer [Pathogen](https://github.com/tpope/vim-pathogen) par
[vim-plug](https://github.com/junegunn/vim-plug).

[Les différences entre Vim et Neovim sont bien
documentées](https://neovim.io/doc/user/vim_diff.html) et au final, le
changement s'est fait sans grosse difficulté avec 2 adaptations relativement
mineures&nbsp;:

* La valeur par défaut de
  [`mouse`](https://neovim.io/doc/user/options.html#%27mouse%27) est maintenant
  `a` mais je n'utilise quasiment jamais la souris dans mon éditeur et je
  préfère garder le fonctionnement du terminal intact, j'ai donc ajouté `set
  mouse=` à mon ~~.vimrc~~ euh init.vim ;-)
* dans les plugins que j'utilisais avec Vim, seul
  [Powerline](https://github.com/powerline/powerline) n'est [pas compatible avec
  Neovim](https://github.com/powerline/powerline/issues/1287), heureusement
  [vim-airline](https://github.com/vim-airline/vim-airline) fournit une
  alternative fonctionnelle et compatible avec Neovim.

Pour le reste quasi rien n'a changé, ou alors je n'ai pas encore remarqué ;-)

## Et alors ça marche&nbsp;?

<figure class="object-center">
    <a href="/images/neovim-full.png">
        <img src="/images/neovim.png" alt="Capture d'écran de Neovim">
    </a>
    <figcaption>
    Capture d'écran de Neovim lors de la rédaction de ce billet
    </figcaption>
</figure>

Neovim fonctionne très bien pour moi, je l'ai adopté depuis une petite semaine
et jusqu'à présent je n'ai noté aucun problème dans mon usage relativement
intensif en tant qu'<acronym title="Integrated Development
Environment">IDE</acronym> au bureau, dans l'édition de divers fichiers ou lors
de la rédaction de ce billet. Bref, Neovim a l'air bien installé sur ma machine
et il va maintenant falloir aller fouiller [dans les quelques plugins qui tirent
partie de
Neovim](https://github.com/neovim/neovim/wiki/Related-projects#plugins) et
refaire le tour des plugins Vim compatibles qui valent le coup.
