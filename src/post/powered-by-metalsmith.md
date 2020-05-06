---
title: Powered by Metalsmith (and Github, TravisCI, Myth, npm…)
lang: en
tags: javascript, metalsmith, blog, node.js, travis ci, github, git, myth, flexbox, jamstack
published: 2016-01-21 16:38
photos:
    - images/outils-cles.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/outils-cles.jpg" alt="A set of tools on a blue wall">
</figure>

And here is another version of this blog! As usual, it's a good opportunity to
experiment recent or interesting technologies and to apply new *good practices*
in a different context than at my daily job at eZ Systems.

The fundamental change this time is that it is now statically generated. To do
that, I use a tool called [Metalsmith](http://metalsmith.io/). I've already used
Metalsmith to publish [my mountain bike website](http://vtt.revermont.bike/) and
I still find it brillant. It is at the same time super simple and powerful
thanks to its plugins. By the way, [the full source code is on
Github](https://github.com/dpobel/damien.pobel.fr/), each and every new version of
this website is made with less and less code, it seems like I'm getting lazier
with time. Also, the build process is run by [Travis-CI](https://travis-ci.com/)
with the great benefit of not having to maintain an up to date environment for
that on the hosting server :-)

As a matter of fact, I also did various choices at different levels when
rebuilding this website:

* no external dependencies in the pages like custom fonts, social widgets and so on… Even
  no Google Analytics. I've came to the conclusion that the price for the reader
  does not worth it. So the main font is the good old Arial and to share a post on
  the main social networks (feel free to do it ;-)) you have good old hypertext
  links. And as a result, you won't see here the stupid cookie warning…
* it seems like [font icons are not that
  good](http://blog.cloudfour.com/seriously-dont-use-icon-fonts/) so this
  website is font icons free, the few icons were replaced by inline SVG coming
  from [Simple icons](http://simpleicons.org/).
* npm as the only package manager and as the tasks runner so no bower, grunt or
  gulp. Again, given the simplicity of this project, it's more than enough and
  it's a good way to limit the maintenance to a minimum.
* no CSS pre-processor: I don't like pre-processors like Sass or Less and I much
  prefer to write future proof CSS and post-process it to get a working CSS in
  current browsers. [PostCSS](https://github.com/postcss/postcss) is clearly the
  tool in this area right now but on the other hand
  [Myth](http://www.myth.io/) has been there for a while, it is much
  more simple and there's already [a plugin for
  Metalsmith](https://github.com/kasperisager/metalsmith-myth), so for now the
  winner is… Myth :-)
* on the CSS side: *flexbox all the things* and *CSS custom properties
  (variables) for the win*. Those 2 *new* CSS features change everything when it
  comes to write the stylesheets. And again given the simplicity of this
  project, there is no need for a grid framework.

As you can see, this new version is focused on the *Less is more* mantra.
Actually, for quite some time now, I try to apply the following quote from
Antoine de Saint-Exupéry in my developments:

> It seems that perfection is attained not when there is nothing more to add,
> but when there is nothing more to remove.

And as far as I can tell, this has worked quite well so far and the current website
is a direct result of that.
