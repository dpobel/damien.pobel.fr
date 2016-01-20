---
title: "GUI enhancements with admin2++ eZ Publish extension"
tags: ez publish, interface, extension, jquery, jqueryui, vidéo
updated: 2010-07-01T14:45:18.000Z
node: "68156"
remoteId: "13c17827eb870c4bc0d40b3cdbd73c21"
published: 2010-03-28T23:10:01+02:00
---

The blog post is the continuation of [﻿﻿Frontend performance enhancements with admin2++ eZ Publish extension](/post/frontend-performance-enhancements-with-admin2-ez-publish-extension) published a few days ago. This one is about the additions of the [admin2++ eZ Publish extension](http://projects.ez.no/admin2pp) in terms of <abbr title="Graphical User Interface">GUI</abbr>  and new features.


## Current features provided by admin2++ extension


admin2++ extension currently provides the following features by using [jQueryUI 1.8](http://blog.jqueryui.com/2010/03/jquery-ui-18/) in the new [eZ Publish](/tag/ez-publish) administration interface :

* it improves the dashboard to be easily configurable by each user (drag'n drop of blocks, ability to remove or add blocks)
* it adds some new dashboard blocks (System infos, Feed reader, Advanced search form)
* it replaces *View* link in context menus by a *Preview* link that loads a preview in AJAX
* it makes the right menu loadable in AJAX instead of requiring a page refresh when revealing it
* it adds the ability to resize the area dedicated to preview tabs, details tabs, ...
* it improves default stylesheet (colors in popup menu and dashboard blocks, round corners on all fields, yellow background to highlight currently focused field, ...)
* it adds a date picker for ezdate and ezdatetime attribute (based on jQuery instead of the default YUI2 one)

All those new features are visible in this screencast :


<div class="video">
	<object width="530" height="417" type="application/x-shockwave-flash" data="http://www.youtube.com/v/5QbXiNeSP9Y&amp;hl=fr_FR&amp;fs=1">
		<param name="movie" value="http://www.youtube.com/v/5QbXiNeSP9Y&amp;hl=fr_FR&amp;fs=1"></param>
		<param name="allowfullscreen" value="true"></param>
	</object>
</div>


## Future developments


I have a lot of ideas :

* [jQueryUI 1.8 now includes an Autocomplete widget](http://jqueryui.com/demos/autocomplete/) that would be useful to type keywords
* use of AJAX for the several operations (bookmark, add to notifications, ...)
* implement [JavaScript validation on edit form as written earlier here](/post/some-thougths-about-the-admin-interface-refresh-of-ez-publish)
* drag'n drop in content tree
* add new dashboard blocks (personal note, inline search, ...)
* improve style for [a more clear separations between areas](http://share.ez.no/forums/discussions/administration-interface-refresh-take-2-tell-us-more-of-what-you-think/(offset)/20#comment57448)
* ... and many more !
