---
title: Un écran de démarrage et un gestionnaire de session avec vim-startify
tags: vim, neovim, outil, git
published: 2021-01-26
photos:
    - images/neovim-ecran-de-demarrage-startify.png
---

<p class="note">
Comme d'habitude j'emploie indifféremment Neovim et Vim (même si <a
href="/post/vim-neovim/">j'utilise le premier</a>), tout ce qui est écrit ici
est valable pour les deux.
</p>

[vim-startify](https://github.com/mhinz/vim-startify) est l'une de mes dernières
découvertes en terme de plugin pour Neovim. Comme [sa documentation
l'indique](https://github.com/mhinz/vim-startify/blob/master/doc/startify.txt#L46),
il est fournit essentiellement deux choses :

1. des commandes pour simplifier l'utilisation des sessions.
1. un écran de démarrage lorsque vim est lancé sans nom du fichier (ou sans
   donnée sur l'entrée standard)

## Les commandes de gestion de session

vim-startify définit quatre commandes `SSave`, `SLoad`,
`SDelete` et `SClose` pour respectivement enregistrer, charger, supprimer et
fermer une session. Ces commandes se contentent d'enrichir [le système de
session natif de Vim](https://medium.com/vim-drops/vim-sessions-50756b2c603a) en
permettant notamment de pouvoir lister les sessions et d'en charger une depuis
l'écran de démarrage.

Au passage, si comme moi vous utilisez aussi
[NERDTree](https://github.com/preservim/nerdtree), il peut être opportun
d'ajouter la ligne suivante dans votre `.vimrc` ou `.config/nvim/init.vim` pour
éviter d'avoir un warning lors du chargement d'une session où NERDTree était
ouvert :

```vim
let g:startify_session_before_save = [
        \ 'silent! NERDTreeClose'
        \ ]
```

## Écran de démarrage

La configuration par défaut est plutôt correcte mais en fonction de votre usage
de Vim quelques adaptations peuvent s'avérer nécessaires ou bien pratiques.

J'utilise Neovim dans un terminal et si je le lance sans fichier en paramètre
c'est le plus souvent pour l'utiliser comme un IDE, c'est à dire à partir de la
racine d'un projet et dans un dépôt git. Par conséquent, je suis uniquement
intéressé par les sessions existantes, les derniers fichiers édités dans le
répertoire du projet et les fichiers modifiés localement ou créés que git ne
connaît pas encore. C'est pourquoi mon écran de démarrage n'affiche que ces
trois blocs alors que [vim-startify en propose d'autres par
défaut](https://github.com/mhinz/vim-startify#screenshot). Je garde aussi la
citation, elle est souvent plutôt pertinente 😉

<figure class="object-center bordered">
    <a href="/images/neovim-ecran-de-demarrage-startify.png">
        <img loading="lazy" src="/images/neovim-ecran-de-demarrage-startify-660x.png" alt="Capture d'écran de Neovim présentant un écran de démarrage généré par vim-startify">
    </a>
    <figcaption>
    Un écran de démarrage généré par vim-startify
    </figcaption>
</figure>

Pour obtenir cet écran, ma configuration est à peu près la suivante :

```vim
function! s:gitModifiedUntracked()
    let files = systemlist('git ls-files -m -o --exclude-standard 2>/dev/null')
    return map(files, "{'line': v:val, 'path': v:val}")
endfunction

let g:startify_lists = [
        \ { 'type': 'sessions',  'header': ['   Sessions']       },
        \ { 'type': 'dir',       'header': ['   MRU '. getcwd()] },
        \ { 'type': function('s:gitModifiedUntracked'),  'header': ['   git untracked and modified']},
        \ ]

" don't change the working directory
let g:startify_change_to_dir = 0
let g:startify_update_oldfiles = 1
let g:startify_session_persistence = 1
let g:startify_session_sort = 1
```

À partir de l'écran de démarrage, vim-startify propose des raccourcis clavier
pour ouvrir plusieurs fichiers. En général j'utilise `S` et/ou `V` suivi des
numéros de fichiers que je souhaite ouvrir et voir directement [en partageant
l'écran](https://Neovim.io/doc/user/windows.html#opening-window) respectivement
horizontalement et verticalement.

Par exemple avec l'écran présenté ci-dessus, la séquence `V28S9<cr>` permet
d'ouvir dans 2 volets verticaux les fichiers numérotés 2 et 8 puis de séparer
horizontalement ce fichier 8 pour ouvrir le numéro 9, ce qui donne :

<figure class="object-center bordered">
    <a href="/images/neovim-layout.png">
        <img loading="lazy" src="/images/neovim-layout-660x.png" alt="Capture d'écran de Neovim écran partagé après l'utilisation de vim-startify">
    </a>
    <figcaption>
    Neovim affichant plusieurs fichiers après l'utilisation de vim-startify
    </figcaption>
</figure>

Plutôt pratique pour démarrer l'édition d'un fichier tout en jetant
des coups d'œil sur plusieurs autres.

---

Voila une rapide présentation des fonctionnalités principales de vim-startify et
de comment je les utilise.  Clairement, ce plugin ne révolutionnera pas votre
usage de Neovim mais il apporte un petit plus très appréciable.
