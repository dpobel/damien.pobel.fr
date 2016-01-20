---
title: "Apache Rewrite rules to replace wildcard based url translation in eZ Publish 3.10.0"
tags: ez publish, apache, blog, php
updated: 2010-07-13T15:53:34.000Z
node: "66474"
remoteId: "a58484c380ac4b4ef1d3d8ba7bf49543"
published: 2007-11-15T22:14:41+01:00
---

Wildcard based URL translation has been removed in [eZ Publish](/tag/ez-publish) 3.10.0. In [the upgrading from eZ Publish 3.9.x to 3.10.0 documentation](http://ez.no/doc/ez_publish/upgrading/upgrading_to_3_10/from_3_9_x_to_3_10_0) on eZ.no, we can now read (I think this note was not there when [I upgrade](/post/upgrading-a-large-site-from-ez-publish-3-9-2-to-ez-publish-3-10) at the beginning of October...) :

<blockquote>
Before continuing, note that eZ Publish 3.10.0 does not support wildcard based URL forwarding anymore. This possibility was removed when implementing the multilingual URLs functionality. However, it might be added in the future (refer to changelogs and latest release announcements for more information).
</blockquote>


Wildcard based URL translation is (was...) a very easy to use way to install a kind of simple rewriting rules on a site from eZ Publish almost without technical knowlegde. I use this feature to shorten long URLs when using [the layout module for specific RSS feeds](/post/des-fils-rss-sur-mesure-dans-ez-publish) for instance.


Wildcard rules are still in the database, so I wrote a small script that transforms eZ Publish wildcard rules into [apache rewrite rules](http://httpd.apache.org/docs/1.3/mod/mod_rewrite.html). You can [download the script](/files/wildcard_apache_rules.php.txt), you just have to run it from eZ Publish root directory. For me, it generates something like :

``` apache
#### Auto-generated rules ####
## you may need to load mod_rewrite
## you may need to uncomment the following line
# RewriteEngine on
### Direct rules
## for those rules, you need to load mod_proxy
# eZ Publish rss/feed/tag/* -> layout/set/rss/content/view/rsspost/{1}
RewriteRule rss/feed/tag/(.*) layout/set/rss/content/view/rsspost/$1 [P,L]
# eZ Publish rss/feed/commentaires/* -> layout/set/rss/content/view/rssco/{1}
RewriteRule rss/feed/commentaires/(.*) layout/set/rss/content/view/rssco/$1 [P,L]
# eZ Publish rss/feed/trackback/* -> layout/set/rss/content/view/rsstb/{1}
RewriteRule rss/feed/commentaires/(.*) layout/set/rss/content/view/rsstb/$1 [P,L]
```


You can put the generated code in the apache configuration, but you'll probably have [to tweak rewrite rules](/post/citations-a-propos-du-module-apache-mod-rewrite). Of course mod_rewrite has to be loaded in apache (you already have it in a [Virtual host setup](http://ez.no/doc/ez_publish/technical_manual/3_10/installation/virtual_host_setup)) and for direct rules (kind of alias without redirect) you also need [mod_proxy](http://httpd.apache.org/docs/1.3/mod/mod_proxy.html) to be loaded. As I use apache 1.3 under Ubuntu, I run these commands as root :

``` bash
$ sudo apache-modconf apache enable libproxy
Replacing config file /etc/apache/modules.conf with new version
$ sudo /etc/init.d/apache reload
```

