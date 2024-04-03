---
title: Quelques astuces pour améliorer les performances de Neovim au quotidien
tags: vim, neovim, performances, outil, code
published: 2018-04-29 17:54
photos:
    - images/neovim-logo.png
---

En fait, il s'agit plutôt de bien choisir les plugins pour Neovim ou de les
configurer pour en tirer le maximum même dans les situations les plus
difficiles; qu'il s'agisse de travailler avec énormément de fichiers ou sur un
disque où les accès sont plutôt lents (typiquement un montage réseau).

<p class="note">
Comme d'habitude j'emploie indifféremment Neovim et Vim (même si <a href="/post/vim-neovim/">j'utilise principalement le premier</a>), tout ce qui est écrit
ici est valable pour les deux.
</p>

## Analyse statique asynchrone

Il existe de nombreux plugins pour analyser le code (*linting*) et rapporter
certaines erreurs directement dans l'éditeur. Cette fonctionnalité exploite
généralement des outils externes (des *linters*, par exemple
[ESLint](https://eslint.org/) pour JavaScript, l'interpréteur
[php](http://php.net/manual/fr/features.commandline.options.php) et/ou
[phpstan](https://phpstan.org/) pour PHP) et un plugin Vim se charge d'intégrer
le résultat dans l'éditeur.

Pendant longtemps, j'ai utilisé l'excellent
[syntastic](https://github.com/vim-syntastic/syntastic/). Ce plugin fonctionne
très bien mais de manière synchrone, ce qui signifie que pendant l'analyse,
l'éditeur est bloqué en attendant le résultat du ou des *linters*. En fonction
de l'outil d'analyse, de la taille du fichier, des performances d'accès au
système de fichier et même de la quantité d'erreurs, ce phénomène est plus ou
moins gênant. C'est pourquoi, il vaut mieux utiliser un plugin gérant ce
processus de manière asynchrone (ce qui est possible avec Neovim et Vim 8).

Il existe plusieurs autres plugins de ce type et j'utilise actuellement
[ALE](https://github.com/w0rp/ale) (pour Asynchronous Lint Engine) qui répond
parfaitement à mes besoins. Mieux, sur le même principe, ce plugin sait
également corriger le code par exemple avec [Prettier](https://prettier.io/)
pour JavaScript ([et bientôt
PHP](https://prettier.io/blog/2018/04/09/plugin-php-0.1.html)) ou
[PHP-CS-Fixer](https://github.com/FriendsOfPhp/PHP-CS-Fixer) ou [`phpcbf` de
PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) pour PHP. Avec ça
plus d'excuse pour ne pas respecter les *coding standards* du projet.

En terme de configuration de ALE, mon `init.vim` contient quelque chose comme:

```vim
nmap <silent> <C-k> <Plug>(ale_previous_wrap)
nmap <silent> <C-j> <Plug>(ale_next_wrap)

let g:ale_sign_column_always = 1

let g:ale_fix_on_save = 1
let g:ale_fixers = {
\   'php': ['trim_whitespace', 'php_cs_fixer'],
\   'javascript': ['trim_whitespace', 'prettier'],
\   'yaml': ['trim_whitespace'],
\   'markdown': ['trim_whitespace']
\}

" most linters are automatically detected and default works for me
let g:ale_php_phpcs_standard = 'PSR2'
```

## Génération des *tags*

Vim est capable d'utiliser un ou des fichiers de *tags* générés avec [`ctags` ou
l'un de ces *forks*](https://en.wikipedia.org/wiki/Ctags) pour [naviguer dans le code
source](http://vim.wikia.com/wiki/Browsing_programs_with_tags). Tout le
problème est donc de générer et de tenir à jour ce fichier.

Le plugin [Gutentags](https://github.com/ludovicchabant/vim-gutentags) réalise
cette tâche de manière très efficace en permettant notamment la mise à jour
incrémentale du fichier de *tags* là où certains plugins tentent d'indexer le
projet dans sa totalité. Il est également possible de [le configurer pour écrire
le fichier de *tags* ailleurs qu'à la racine du
projet](https://github.com/ludovicchabant/vim-gutentags/blob/v1.0.0/doc/gutentags.txt#L411)
par exemple sur une partition locale voire carrément montée en mémoire. Bref,
tous ces atouts font de Gutentags un compagnon de choix sur de gros projets
et/ou avec des accès disques un peu ralentis. Et surtout, il n'est *a priori*
pas nécessaire d'ignorer des pans entiers du projets ou de ces dépendances.

En terme de configuration, c'est assez simple&nbsp;:

```vim
let g:gutentags_ctags_exclude_wildignore = 0
let g:gutentags_cache_dir = "~/.cache/gutentags"

" because Ctrl-] is close to impossible to use for me on fr MacOS keyboard
nnoremap <Leader>t :execute 'tjump' expand('<cword>')<CR>
nnoremap <Leader>wt :execute 'stjump' expand('<cword>')<CR>
```

## Recherche de fichiers

En plus de naviguer dans le code source par symbole, il est courant de chercher
un fichier par son nom et surtout par un ou des morceaux de nom (*fuzzy
matching*). Plusieurs plugins fournissent ce type de fonctionnalités, mais
j'utilise depuis de nombreuses années
[CtrlP.vim](http://ctrlpvim.github.io/ctrlp.vim/) qui remplit cette fonction
avec brio. Malgré tout, à mesure que le projet grandit (ou avec des accès disque
ralentis), l'indexation et la recherche prennent de plus en plus de temps.

Pour améliorer le temps d'indexation, il est tentant d'ignorer des parties du
projet par exemple les dépendances (les dossiers `vendor` sur un projet PHP)
mais invariablement ces dossiers non indexés finissent par manquer. Au lieu de
ça ou plus exactement en complément, il est possible d'utiliser une commande du
système pour construire la liste des fichiers, cette commande a toutes les
chances d'être plus rapide que l'indexation de base de CtrlP écrite en language
de script de Vim. Il semble que [the Silver Searcher
(`ag`)](https://geoff.greer.fm/ag/) soit particulièrement indiqué mais toute
commande capable de lister des fichiers dans une arborescence pourra faire
l'affaire (`find`, `ack`,&nbsp;…).  Par ailleurs, CtrlP peut-être configuré
pour conserver son cache (son index) entre 2 lancements de l'éditeur (avec la
configuration par défaut, F5 permet de rafraîchir le cache après avoir lancé
CtrlP avec… Ctrl-P 😀), la configuration
suivante apporte donc une amélioration appréciable de l'indexation&nbsp;:

```vim
let g:ctrlp_user_command = 'ag %s -l -U --nocolor -g ""'
" -U tells ag to ignore .gitignore but to still take .ignore into account
" to have different ignore rules for git and for CtrlP
let g:ctrlp_clear_cache_on_exit = 0
```

Pour améliorer le temps de recherche lorsque l'index grandit, il est possible de
configurer CtrlP pour utiliser une fonction de *matching* spécifique. Le plugin
[ctrlp-py-matcher](https://github.com/FelikZ/ctrlp-py-matcher) en fournit une
écrite en Python. L'auteur indique l'utiliser sur un projet avec plus de 350000
fichiers ! Bref, après avoir installé le plugin, la ligne suivante permet
d'utiliser cette fonction&nbsp;:

```vim
let g:ctrlp_match_func = { 'match': 'pymatcher#PyMatch' }
```

## Recherche dans les fichiers

Enfin après avoir chercher dans les symboles ou par nom de fichier, il est
parfois utile de tout simplement chercher dans le contenu des fichiers d'un
projet. Là encore, la taille du projet et les accès disque jouent un rôle
essentiel. Pour ce genre d'opération, j'utilise le plugin
[vim-grepper](https://github.com/mhinz/vim-grepper) qui lui aussi permet
d'intégrer les commandes du système. Là encore, the Silver Searcher (`ag`) est
d'une grande utilité mais si comme moi vous utilisez votre éditeur dans un code
source géré avec git, [git grep](https://git-scm.com/docs/git-grep) est
potentiellement encore plus rapide dans la mesure où celui-ci indexe déjà tout
les fichiers du dépôt. Je configure vim-grepper avec 2 appels différents de `git
grep`, l'un qui cherche en tenant compte du `.gitignore` mais aussi dans les
fichiers que git ne *tracke* pas et l'autre dans absolument tout. Au final, ma
configuration de vim-grepper ressemble à&nbsp;:

```vim
map <C-g> :Grepper<cr>
map <Leader><C-g> :Grepper -side<cr>

let g:grepper               = {}
let g:grepper.highlight     = 1
let g:grepper.next_tool     = '<leader>g'
let g:grepper.simple_prompt = 1
let g:grepper.dir = 'repo,cwd'
let g:grepper.side_cmd = 'botright vnew'

runtime plugin/grepper.vim
let g:grepper.git.grepprg .= ' --untracked'

let g:grepper.tools = ['git', 'git_grep_everything', 'ag']
let g:grepper.git_grep_everything = {
\   'grepprg':    'git grep -nI --untracked --no-exclude-standard',
\   'grepformat': '%f:%l:%m',
\   'escape':     '\^$.*[]',
\ }
```

---

Il y a sans doute plein d'autres astuces possibles et d'ailleurs si vous en avez
en stock je serais ravi de les lire et d'ajouter des liens dans ce billet. Mais
pour moi, avec tout ça, Neovim est largement utilisable et même parfaitement
adapté à des projets de toute taille.
