---
title: Hello metalsmith-pdfize
tags:  metalsmith, plugin, pdf, chrome, puppeteer, travis ci, javascript, jamstack
published: 2017-09-29 10:07
lang: en
photos:
    - images/print-screen.jpg
---

<figure class="object-left bordered">
    <a href="/images/print-screen.jpg">
    <img loading="lazy" src="/images/330x/print-screen.jpg" alt="Print screen, you are doing it
    wrong">
    </a>
</figure>

Yesterday I published the very first version of
[metalsmith-pdfize](https://www.npmjs.com/package/metalsmith-pdfize) on npm (and
of course on [Github](https://www.github.com/dpobel/metalsmith-pdfize) as well).
As its name suggests, it is a [Metalsmith](http://metalsmith.io/) plugin to
generate PDF files as part of the build process (Metalsmith is among other
things a static site generator [I use to generate this website](/post/powered-by-metalsmith/)). To do so, this plugin uses
[Puppeteer](https://www.npmjs.com/package/puppeteer) to drive [a Chrome instance
in headless
mode](https://developers.google.com/web/updates/2017/04/headless-chrome) in
order to export a PDF from a file generated by Metalsmith. This headless Chrome
instance just loads the corresponding page (and related assets) with the `print`
media and generates a PDF from that. It just acts as if you print the
corresponding page to a PDF file with a regular Chrome instance.

I wrote this plugin for my own use so it is integrated into [the build process
of this
website](https://github.com/dpobel/damien.pobel.fr/pull/53/files#diff-efd59cd1bdc5c9ac6d0eaa368f1e149fR84)
to generate [a PDF version](/page/cv/cv-damien-pobel.pdf) of [my
résumé](/page/cv/) (by the way, I'm looking for a new job ;)). So far, I'm
pretty satisfied with the end result, even if at the moment, the fonts in the
generated PDF files are not exactly the expected ones. I guess it is because the
build happens on TravisCI where the environment is minimal, I'll have to look at
that soon.