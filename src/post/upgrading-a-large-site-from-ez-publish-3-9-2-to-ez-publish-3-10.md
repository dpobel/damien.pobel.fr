---
title: "Upgrading a \"large\" site from eZ Publish 3.9.2 to eZ Publish 3.10"
tags: ez publish, truc, blog, php
node: "66354"
remoteId: "e539e0ac284537359c819809614e3978"
published: 2007-10-07T23:12:00+02:00
updated: 2016-02-10 09:57
---


**Warning:***this article explains some hacks I had to do to upgrade quickly to
eZ Publish 3.10. These modifications can be dangerous for your data, use them at
your own risk and don't forget to make backups !*


Waiting for a more stable version of [eZ Publish
4](/post/ez-publish-4-alpha-1-et-beaucoup-d-autres-choses), I've upgraded [my
site]() from [eZ Publish](/tag/ez-publish) 3.9.2 to eZ Publish 3.10.0. [My last
upgrade was quite long](/post/migration-vers-ez-publish-3-9-2), but this one
could have taken ages ! As [I mentioned in the developper
forum](http://share.ez.no/forums/developer/upgrade-to-3.10), the
updateniceurls.php script started with this message :

``` bash
> tigrou@dedipwet[88.191.30.29]:~/web/pwet.fr/www310$ php4 bin/php/updateniceurls.php -s plain_site_admin
Using siteaccess plain_site_admin for nice url update
Importing old url aliases
Importing 62638 standard urls
........................................................ 0.09% 45h 46m 8s
........................................................ 0.18% 86h 55m 44s
........................................................ 0.27% 106h 58m 2s
........................................................ 0.36% 155h 18m 55s
```


WOW **155 hours**, and just for the first step ! In fact, I don't want to change
my URIs ([Cool URIs don't change](http://www.w3.org/Provider/Style/URI) !) so I
put these lines in site.ini.append.php :

``` ini
[URLTranslator]
TransformationGroup=urlalias_compat
```


But even with these settings, the script tries to regenerate all URL aliases.
After some searches, I found that
[eZURLAliasML::storePath()](http://pubsvn.ez.no/doxygen/trunk/LS/html/classeZURLAliasML.html#afdf3f7497b70fe5df1c15856510b9629)
takes most of the time by calling several times
[eZURLAliasML::convertToAlias()](http://pubsvn.ez.no/doxygen/trunk/LS/html/classeZURLAliasML.html#a36da9f2bcd7e9ba46777e4243d33ed45)
on strings that are in my case already URL aliases ! This behaviour can be
avoided by setting the $cleanupElements parameters to false (its default value
is true) in the code of updateniceurls.php. eZURLAliasML::storePath() also calls
[eZURLAliasML::strtolower()](http://pubsvn.ez.no/doxygen/trunk/LS/html/classeZURLAliasML.html#ad907dc8d4109acdd7f2196d33fb6cb50)
several times. This method uses
[eZCharTransform](http://pubsvn.ez.no/doxygen/trunk/LS/html/classeZCharTransform.html)
to do an advanced strtolower but in my case with my existing ASCII URL aliases,
there's no need of it. I has just replaced this code with a simple [PHP
strtolower()](http://fr.php.net/strtolower) (**don't forget to remove this hack
after upgrade !**).


With those hacks, eZURLAliasML::storePath() takes about 0.02 second per URI
where the original code took between 0.6 and 10 seconds !

By following [the upgrade
documentation](http://ez.no/doc/ez_publish/upgrading/upgrading_to_3_10/from_3_9_x_to_3_10_0),
the rest of the upgrade was, as always, quite easy.
