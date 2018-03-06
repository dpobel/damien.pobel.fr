---
title: "Precompress a static website with Brotli and Gzip"
lang: en
tags: performances, brotli, gzip, apache, metalsmith
published: 2018-03-05 08:10
photos:
    - images/brotli-encoding-header.png
---
Compressing served files is a very usual trick to increase the loading
performance of a website. The principle, [defined in HTTP
1.1](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3), is quite
simple: when requesting a file, the browser announces the encoding it accepts in
the `Accept-Encoding` header (for instance `gzip`) and thanks to it, the server
knows how it can serve the file.

Typically, this is done *on the fly* by the web server with a dedicated module,
for instance in Apache,
[mod_deflate](http://httpd.apache.org/docs/current/mod/mod_deflate.html) does
that pretty well ([I've been using it for
years](/post/optimiser-son-site-sous-ubuntu-et-ailleurs-compresser-avec-gzip)
(fr)) and nowadays this requires almost no configuration besides being activated
unless you want to support the ~~venerable~~ most-hated browser of all time
*aka* Internet Explorer 6 :)

Alternatively, it's possible to pre-generate compressed files
along with the normal ones to serve the best one supported by the browser
visiting your website. This has the advantage of requiring almost no resource on
the web server while allowing you to use the highest compression level available
even this takes a bit of time. And depending on the static site generator this
is maybe super simple to setup.

So in this post, I'm gonna try to compress each page with Gzip and Brotli and to
configure Apache to serve the best possible version.

## Brotli ?

[According to Wikipedia](https://en.wikipedia.org/wiki/Brotli):

> Brotli is a data format specification for data streams compressed with a
> specific combination of the general-purpose LZ77 lossless compression
> algorithm, Huffman coding and 2nd order context modelling. [...]
>
> Brotli was first released in 2015 for off-line compression of web fonts.
> The version of Brotli released in September 2015 by the Google software
> engineers contained enhancements in generic lossless data compression, with
> particular emphasis on use for HTTP compression.

<figure class="object-left bordered">
    <img src="/images/220x/brotli-logo.png" alt="Brotli logo">
</figure>

If I believe caniuse.com, [Brotli is now supported by most
browsers](https://caniuse.com/#feat=brotli). As usual, only Internet Explorer
(11 and below) and Safari (before High Sierra) are a bit behind so for those and
for probably tons of bots out there, Gzip compressed files or uncompressed files
are still useful.

Brotli files are said to offer a higher compression rate than Gzip while remaining
fast to decode. On the other hand, Brotli is also known to be slower to
compress especially if you are using the highest compression level. Let's have a
look at that.

## Compressing files

Since I'm using [Metalsmith to generate this web
site](/post/powered-by-metalsmith/), I can use
[metalsmith-gzip](https://github.com/ludovicofischer/metalsmith-gzip) and
[metalsmith-brotli](https://github.com/michel-kraemer/metalsmith-brotli) to
compress generated documents. Both plugins are very similar and are configured
to compress files matching the regular expression
`/\.[html|css|js|json|xml|svg|txt]/`. I just had to configure metalsmith-gzip to
compress at level 9 instead of 6 by default.

If you use Metalsmith, that's pretty much it! Of course, it's possible to do the
same with a "simple" shell *oneliner*, something like:

```sh
find path/to/files -type f -a \( -name '*.html' -o -name '*.css' -o -name '*.js' \
-o -name '*.json' -o -name '*.xml' -o -name '*.svg' -o -name '*.txt' \) \
-exec brotli --best {} \+ -exec gzip --best -k {} \+
```

## Apache configuration

This part is a bit tricky, at least it took me some time to figure it out,
especially the part about preventing the double compression when you still need
mod_deflate for other websites.

First, you need to make sure that
[mod_mime](http://httpd.apache.org/docs/current/mod/mod_mime.html),
[mod_headers](http://httpd.apache.org/docs/current/mod/mod_headers.html) and
[mod_rewrite](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) are
enabled in Apache. Under Debian, if you are unsure just run as root:

```
# a2enmod mime
# a2enmod headers
# a2enmod rewrite
```

Then, the `VirtualHost` for your website requires a bit of configuration.
Here is the relevant configuration excerpt for serving my pre-compressed
website:

```apache
# Otherwise Content-Language: br is added
# Only needed if mod_mime configures that language
# in /etc/apache2/mods-enabled/mime.conf
RemoveLanguage .br

# Encoding for Brotli files
AddEncoding br .br

# Set gzip encoding instead of setting as a Content Type
RemoveType .gz
AddEncoding x-gzip .gz

# Mapping foo.suffix.gz or foo.suffix.br => Type
# see following repositories for recognized suffixes
# https://github.com/michel-kraemer/metalsmith-brotli
# https://github.com/ludovicofischer/metalsmith-gzip
AddType "text/html" .html.br .htm.br .html.gz .htm.gz
AddType "text/css" .css.br css.gz
AddType "text/plain" .txt.br txt.gz
AddType "text/xml" .xml.br .xml.gz
AddType "application/javascript" .js.br .js.gz
AddType "application/json" .json.br .json.gz
AddType "image/svg+xml" .svg.br .svg.gz
# Depending on what you compress, some more might be needed

# Proxy configuration
Header append Vary Accept-Encoding

RewriteEngine On

RewriteCond %{HTTP:Accept-Encoding} br
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME}.br -s
RewriteRule ^(.*)$ %{DOCUMENT_ROOT}/%{REQUEST_FILENAME}.br [E=no-gzip,L]

RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME}.gz -s
RewriteRule ^(.*)$ %{DOCUMENT_ROOT}/%{REQUEST_FILENAME}.gz [E=no-gzip,L]
```

So to explain it shortly:

* this changes the configuration so that `.br` and `.gz` files have the
  same type for Apache as the ones without those suffixes. This has to be in
  sync with what is done by the static site generator or your shell script.
* if a browser accepts Brotli compressed files and the requested file exists
  with a `.br` suffix, serve this file.
* if a browser accepts Gzip compressed files and the requested file exists
  with a `.gz` suffix, serve this file.
* in both cases, if the file with the suffix is served, the `no-gzip`
  environment variable is set so that mod_deflate does not try to compress again
  the file.

And that's it for serving pre-compressed files! You can see in the network
panel that files are now served with `Content-Encoding: br` and maybe loading
feels a bit snappier.

<figure class="object-left bordered">
    <img src="/images/brotli-encoding-header.png" alt="Screenshot of Firefox dev
    tools showing the HTTP headers">
</figure>

## Some stats

This little experiment is a good opportunity to look at some numbers about Gzip
vs. Brotli vs. no compression.

### Time to compress files

At their maximum compression level, Brotli is way slower than Gzip. At the time
of writing, 1452 files are matching the regular expression mentioned above.  On
my Macbook pro, metalsmith-gzip takes less than 400 milliseconds to compress
those while for Brotli, this takes almost 6 seconds! Using the shell version, I
find out that it takes almost 24 seconds to compress those files with Brotli and
a bit more than 1 second for Gzip.

Even if in this setup, this does not matter much, it's interesting to note that
the difference is somehow of an order of magnitude.

### Resulting sizes

After all, that's the point of compressing, so let's have a look at the
resulting size of some files (unless mentioned, sizes are in bytes).

<table class="data-table">
    <thead>
        <tr>
            <th>File(s)</th>
            <th>Size</th>
            <th colspan="2">Gzip</th>
            <th colspan="2">Brotli</th>
            <th>Gzip - Brotli</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>[Homepage](/)</td>
            <td>8293</td>
            <td>2399</td><td>29%</td>
            <td>1991</td><td>24%</td>
            <td>-408</td>
        </tr>
        <tr>
            <td>[RSS feed](/rss.xml)</td>
            <td>57368</td>
            <td>19636</td><td>34%</td>
            <td>16998</td><td>30%</td>
            <td>-2638</td>
        </tr>
        <tr>
            <td>Main stylesheet</td>
            <td>10943</td>
            <td>3034</td><td>28%</td>
            <td>2591</td><td>24%</td>
            <td>-443</td>
        </tr>
        <tr>
            <td>robots.txt</td>
            <td>24</td>
            <td>44</td><td>183%</td>
            <td>28</td><td>117%</td>
            <td>-16</td>
        </tr>
        <tr>
            <td>[Posts index](/posts/)</td>
            <td>6772</td>
            <td>1892</td><td>28%</td>
            <td>1587</td><td>23%</td>
            <td>-305</td>
        </tr>
        <tr>
            <td>[Latest post in English](/post/configure-neovim-vim-gf-javascript-import)</td>
            <td>13814</td>
            <td>4437</td><td>32%</td>
            <td>3681</td><td>27%</td>
            <td>-756</td>
        </tr>
        <tr>
            <td>Total</td>
            <td>11.65Mb</td>
            <td>4Mb</td><td>34%</td>
            <td>3.4Mb</td><td>29%</td>
            <td>-579Kb</td>
        </tr>
    </tbody>
</table>

Almost no surprise here, Brotli compressed files are about 5% (of the initial
size) smaller than the Gzipped one. Given that most of my pages are quite small
already, that's not a lot in absolute value but still an interesting gain. Only
exceptions to that are very small files like my robots.txt where compressed ones
are bigger than the original. So for the sake of completeness, I should not
compress those but we are talking of 4 or 20 bytes depending on the algorithm :)
