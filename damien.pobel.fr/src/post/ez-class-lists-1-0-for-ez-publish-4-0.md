---
title: "eZ Class Lists 1.0 for eZ Publish 4.0"
tags: ez class lists, ez publish, php
node: "67321"
remoteId: "46100695b46115117cfc148d002db5e4"
published: 2008-11-10T20:58:55+01:00
updated: 2016-02-11 13:44
lang: en
---

Today I released eZ Class Lists
1.0. This is
the first version dedicated to [eZ Publish](/tag/ez-publish) 4. eZ Class
Lists is an extension that adds a new tab
in the administration interface where you can browse your content by content
classes.

<figure class="object-center"><a href="/images/ez-class-lists-1-0.png"><img loading="lazy" src="/images/660x/ez-class-lists-1-0.png" alt="eZ Class Lists 1.0"> </a></figure>


This version adds three main features:

* you can now sort the list by one of the common content object meta attributes
(but not by a content attribute for the moment).
* if JavaScript is enabled,
<abbr title="Asynchronous Javascript And XML">AJAX</abbr>  is used to display
the list when you change an option
* you can limit the content classes showed in
the left menu in lists.ini

This release also adds many small bug fixes. I also tried to stick to [the eZ
Publish coding
standards](https://github.com/ezsystems/ezcs) as I
often use this extension as an example for my professional trainings.
