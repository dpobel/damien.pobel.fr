---
title: "Configuring neovim (vim) gf command to resolve JavaScript import"
tags: neovim, vim, javascript
published: 2018-01-30 18:34
lang: en
photos:
    - images/neovim-logo.png
---

I've been using vim (and [now neovim (fr)](/post/vim-neovim/)) for more than
15 years and I still discover new tricks regularly. This post is about one of
those about vim's `gf` command. This command allows the user to open the file whose path
is under the cursor. I guess it's clear how this can be handy to explore the
source code of any application where the source contains references to others
files.

These days I'm working on an application built with the popular stack
composed of React, Redux, Babel and Webpack (and 2876 more friends ;-))
where quite obviously `import` is used to load dependencies of a given module.
For those who don't know the `import` statement yet, as usual [MDN provides a nice
documentation about
it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
So the application source code contains code like:

```js
// this file is src/common/mymodule.js
// Note: I always run neovim at the project root

import whatever from 'path/to/dependency';
import relative from './relative/path/to/dependency';
```

Depending, on your stack and in my case depending on Webpack configuration,
`import` path resolution can be quite complicated. In my
case, the first one could mean:

* `path/to/dependency.js`
* `path/to/dependency.jsx`
* `src/path/to/dependency.js`
* `src/path/to/dependency.jsx`
* `node_modules/path/to/dependency.jsx`
* `node_modules/path/to/dependency.js`

While the second one potentially means:

* `src/common/relative/path/to/dependency.js`
* `src/common/relative/path/to/dependency.jsx`

The path can also reference a CSS file (`path/to/file.css`) or a SVG file
(`path/to/file.svg`) with the same resolution directories or even a node module
which means the main file of that module should be imported:

```js
import stuff from 'a-node-module'
// means importing
// node_modules/a-node-module/<path indicated in main entry of package.json>
```

Initially, I thought I would need a plugin so that `gf` is able to resolve all
those paths. I even tested some but they failed for me. After a deeper look at
[`gf` documentation](https://neovim.io/doc/user/editing.html#gf), it turns out
that 2 lines of configuration to set
[`path`](https://neovim.io/doc/user/options.html#'path') and
[`suffixesadd`](https://neovim.io/doc/user/options.html#'suffixesadd') allows to
almost solve the issue:

```vim
set path=.,src,node_nodules
set suffixesadd=.js,.jsx
```

With that configuration, when hitting `gf`, neovim (or vim) will try to load the
file in the given paths with the suffixes. The only case not
fully solved by this is the one where the path refers to the main file of a node
package, with the configuration above, neovim will open the directory
`node_modules/a-node-module` which is already quite nice but for sure neovim can do
better :)

This time [`includeexpr`
setting](https://neovim.io/doc/user/options.html#'includeexpr') is the way out.
It allows the developer to define a function to run if the editor was unable to find a file
path. So by removing `node_modules` from the path and implementing a function,
we can try to load the `package.json` file and build a file path with its `main`
entry, this results in the following configuration:

```vim
set path=.,src
set suffixesadd=.js,.jsx

function! LoadMainNodeModule(fname)
    let nodeModules = "./node_modules/"
    let packageJsonPath = nodeModules . a:fname . "/package.json"

    if filereadable(packageJsonPath)
        return nodeModules . a:fname . "/" . json_decode(join(readfile(packageJsonPath))).main
    else
        return nodeModules . a:fname
    endif
endfunction

set includeexpr=LoadMainNodeModule(v:fname)
```

As far as I can tell, any imported module is now just a `gf` away from me. As a
complementary tip, after using `gf` you can get back to the first file with
`Ctrl+O` (as *get Out*) and get back again to the imported file with `Ctrl+I` (as *get
In*).

The path resolution can be quite specific to the project so this configuration
plays particularly well with [a config by
project](https://andrew.stwrt.ca/posts/project-specific-vimrc/) which is also an
out of the box vim feature (another trick I discovered lately ;)), in neovim
just use `.nvimrc` instead of `.vimrc`.
