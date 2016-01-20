---
title: "eZ Find, Solr and eZ Publish"
tags: ez find, ez publish, travail, php
updated: 2008-10-29T08:26:08.000Z
node: "66640"
remoteId: "336312ebbcd3b83f21a6811fffb6e387"
published: 2008-02-04T13:20:53+01:00
---

I'm working on a professionnal project using [eZ Find extension](http://ez.no/ezfind) and I must say that I'm very impressed by this extension and even more by [Solr](http://lucene.apache.org/solr/). [Last october at the developper day](/post/ez-publish-developer-day-a-paris-le-31-10-2007), [Paul Borgermans](http://walhalla.wordpress.com/) told us a lot of good points about Solr. I was a bit skeptical about the technological blend (PHP + Java) but the *search webservice* provided by Solr is a very clever solution much more efficient and scalable than the [Lucene extension](http://ez.no/developer/contribs/applications/lucene_java_search_plugin) with PHP Java bridge module and [its memory problems](http://ez.no/developer/contribs/applications/lucene_java_search_plugin#msg114857).


For the project, I added custom sorting on content object attributes or meta attributes and indexing of external contents (not in the [eZ Publish](/tag/ez-publish) database). [Solr is pretty well documented](http://wiki.apache.org/solr/) and it has an impressive number of options and can be use in any project. If you want to integrate Solr in a PHP project, there is [a good article in IBM developperWorks about Solr with PHP](http://www.ibm.com/developerworks/library/os-php-apachesolr/index.html?ca=drs-&amp;ca=dkw-php) where you can find a [PHP Solr Client](https://issues.apache.org/jira/browse/SOLR-341).

