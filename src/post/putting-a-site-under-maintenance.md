---
title: "Putting a site under maintenance"
tags: ez publish, web, hébergement, apache, truc
updated: 2009-01-19T21:27:10.000Z
node: "66997"
remoteId: "6091401a0cdcf57e6912f41a4d9de191"
published: 2008-08-12T21:55:00+02:00
---

Pascal Specht asks a good question in the eZ Publish forums: *how to put a site under maintenance without breaking bookmarks and external links* ?


The easiest way (the only ?) is probably to use [mod_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) of [Apache](http://pwet.fr/man/linux/administration_systeme/apache2) to distribute a maintenance page instead of the normal page. This can be done with those few lines in a .htaccess file :

``` apache
RewriteEngine on
#  RewriteCond  %{REMOTE_ADDR}         !^82.225.188.34$
RewriteRule  (.*) /path/to/your/maintenance/file/index.htm [L]

```

With this setting, Apache distributes the index.htm file for all request. You can also put your own IP address on the second line and uncomment it so that you can view the normal site for example to generate some caches in [eZ Publish](/tag/ez-publish) before putting your site online again.

