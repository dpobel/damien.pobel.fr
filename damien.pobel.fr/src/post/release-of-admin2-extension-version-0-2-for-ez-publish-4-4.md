---
title: "Release of admin2++ extension version 0.2 for eZ Publish 4.4"
tags: ez publish, extension, javascript, ergonomie, performances, jquery, jqueryui
node: "68988"
remoteId: "405c0b321a47c16790c98a869e8f29a3"
published: 2010-12-19T19:32:17+01:00
updated: 2016-02-12 12:21
---

[As I said on Twitter](http://twitter.com/dpobel/status/8137642751295488), I
started again to develop the admin2++ eZ Publish
extension, and the result is **the release of
the version 0.2**. As I
previously wrote in [Frontend performance enhancements with admin2++ eZ Publish
extension](/post/frontend-performance-enhancements-with-admin2-ez-publish-extension)
and in [GUI enhancements with admin2++ eZ Publish
extension](/post/gui-enhancements-with-admin2-ez-publish-extension), I try to
reach two goals with this extension:

* Improve the performance frontend of the admin interface
* Provide some missing GUI features and ease the use of the admin interface

The following screencast shows most of the available features of the admin2++ extension version 0.2:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Oobs5j3Jckw?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

As you can see, the biggest new feature of this release is the preview available
in the popup menu. Instead of loading a new page with the preview, admin2++
provides a view of the object in the front end *siteaccesses* without any page
refresh. I also made a big work to preload as much components as possible on the
login form to fill the browser's cache. With the use of the right Apache
configuration,
this has a great impact on the page loading time.
