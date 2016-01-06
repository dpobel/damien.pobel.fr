---
title: "URL aliases transformed into numbers when upgrading to eZ Publish 3.10.0 ?"
tags:
    - ez publish
    - php
updated: 2008-10-29T09:25:31+01:00
node: 66506
remoteId: 30c19ce7094614a54e0dc690c13f01e6
---

After [the slowness of the PHP upgrade script](/post/upgrading-a-large-site-from-ez-publish-3-9-2-to-ez-publish-3-10) and [the disappearance of the URL Wildcard translation](/post/apache-rewrite-rules-to-replace-wildcard-based-url-translation-in-ez-publish-3-10-0) (these problems are corrected in [the future 3.10.1 release](http://pubsvn.ez.no/websvn/filedetails.php?repname=nextgen&amp;path=%2Fstable%2F3.10%2Fdoc%2Fchangelogs%2F3.10%2FCHANGELOG-3.10.0-to-3.10.1&amp;rev=0&amp;sc=1)), [eZ Publish](/tag/ez+publish) 3.10.0 gives me another problem when I try to upgrade [a 3.9.0 site](http://t-ka.net/blog). Running the updateniceurls.php PHP script transforms the nice URL aliases into numbers. Another developer seemed to have [the same problem in the forum](http://ez.no/developer/forum/install_configuration/upgrade_to_3_10_change_urls_to_numbers), but no solution was provided...


In fact, for this site I configured [one var directory](http://ez.no/doc/ez_publish/technical_manual/3_10/reference/configuration_files/site_ini/filesettings/vardir) for each siteaccess (I don't know why...), so when I cleared the cache using ezcache.php script only the cache of the default siteaccess was really cleared and obviously I specified the one with a dirty cache to run upgrade scripts ! That's why updateniceurls.php didn't find the URL transformation commands and made strange things...


We can sometimes read &quot; *Remember to clear the cache*&quot;, now I would say &quot; *Remember to clear the cache for all siteaccesses*&quot; :-)

