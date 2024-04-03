---
title: "eZ Find, Solr and eZ Publish"
tags: ez find, ez publish, travail, php
node: "66640"
remoteId: "336312ebbcd3b83f21a6811fffb6e387"
published: 2008-02-04T13:20:53+01:00
updated: 2016-02-10 22:40
lang: "en"
---

I'm working on a professionnal project using eZ Find
extension and I
must say that I'm very impressed by this extension and even more by
[Solr](http://lucene.apache.org/solr/). [Last october at the developper
day](/post/ez-publish-developer-day-a-paris-le-31-10-2007), Paul
Borgermans told us a lot of good points about
Solr. I was a bit skeptical about the technological blend (PHP + Java) but the
*search webservice* provided by Solr is a very clever solution much more
efficient and scalable than the Lucene
extension with PHP Java
bridge module and its memory problems.


For the project, I added custom sorting on content object attributes or meta
attributes and indexing of external contents (not in the [eZ
Publish](/tag/ez-publish) database). [Solr is pretty well
documented](http://wiki.apache.org/solr/) and it has an impressive number of
options and can be use in any project.
