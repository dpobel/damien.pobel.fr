---
title: Quickly test eZ Platform with the PHP internal server
tags:  ez platform, composer, php, cms, online editor
published: 2016-03-06 17:08
lang: en
photos:
    - images/i-can-haz-aligned-image.jpg
---

<figure class="object-left bordered">
    <a href="/images/i-can-haz-aligned-image.jpg">
    <img src="/images/220x/i-can-haz-aligned-image.jpg" alt="I can haz aligned image">
    </a>
</figure>

[eZ Platform 16.02 was
released](http://ez.no/Blog/Discover-eZ-Platform-and-eZ-Studio-16.02) last week.
As far as I'm concerned, I did quite some changes mostly in Online Editor (the
rich text editor) to improve the handling of *embeds* and images in RichText
fields. And I'm happy to see my *I can haz aligned image* cat (generated with
[memegenerator.net](http://memegenerator.net/instance/66845943)) in [the release
notes](https://doc.ez.no/display/TECHDOC/eZ+Platform+16.02+Release+notes) :-)

Also, thanks to [this patch to the eZ Platform JavaScript REST
Client](https://github.com/ezsystems/ez-js-rest-client/pull/72), it's now
possible to use eZ Platform and its backend interface with the PHP internal
server. Written like that, this does not seem a very big nor a very useful
change. Actually, this makes easier to install and run eZ Platform for instance
to test the new version or even to start a project by not having to configure a
web server. If you are on an Ubuntu/Debian system, the following commands should
be enough to have a running eZ Platform install:

```bash
# system requirements
$ sudo apt-get install curl mysql-server mysql-client php5-cli php5-xsl php5-mysql php5-curl imagemagick

# let's get composer
$ curl -sS https://getcomposer.org/installer | php

# a database is needed, by default 'ezplatform'
$ mysql -u root -p -e 'CREATE DATABASE ezplatform CHARACTER SET utf8;'

# creating the project, with -n it won't ask you anything
$ ./composer.phar create-project --no-dev --prefer-dist -n ezsystems/ezplatform-demo

# install the database and run the server
$ cd ezplatform-demo
$ php app/console ezplatform:install --env=prod demo
$ php app/console server:run --env=prod
```

If you are a PHP developer, most likely [composer is already globally
setup](https://getcomposer.org/doc/00-intro.md#globally) and the required
package might also be already installed, so the first 2 commands might not even
be required.

After running those commands, you can open `http://127.0.0.1:8000` in your
favorite browser to see the frontend site or `http://127.0.0.1:8000/ez` to reach
the backend interface (the default login is `admin` and the password is
`publish`). Of course, this setup is not suited for production but it's
definitively enough for local developments or to discover eZ Platform.
