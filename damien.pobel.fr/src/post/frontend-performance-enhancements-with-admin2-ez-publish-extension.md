---
title: "Frontend performance enhancements with admin2++  eZ Publish extension"
tags: ez publish, javascript, performances, html, jquery, jqueryui
node: "68149"
remoteId: "a019a5023a3dd93426de2ec128037d5b"
published: 2010-03-23T14:29:41+01:00
updated: 2016-02-12 12:15
---

About a month ago, I created a new project called admin2++ on
projects.ez.no. As written in the project page,
the purpose of this project is to go further in the administration interface
refresh both on the frontend performance and on the features for users to
achieve [what I wrote last november on the admin interface refresh of eZ
Publish](/post/some-thougths-about-the-admin-interface-refresh-of-ez-publish).
On the frontend performance side, changes are quite hidden but are there, so
it's time to do some advertising :-) In fact, it's more or less an application
of [my talk in Geneva on frontend performance with eZ
Publish](/post/frontend-performance-with-ez-publish-slides-are-online).


## Current enhancements on frontend performance


The admin2++ extension provides the following enhancements to [eZ
Publish](/tag/ez-publish) admin2 interface :

* the twenties background images have been incorporated into three sprites
  images [to decrease the number of HTTP
  requests](/post/optimiser-son-site-limiter-le-nombre-de-requetes-http). This
  also decreases the total background images size from about 30Kb to 6Kb.
* PNG Content class icons and PNG admin2 design images have been optimized. Here
  again the total size of icons and images is decreased from about 200Kb to
  147Kb.
* the admin2++ extension provides parts of Apache2 config
    files
  to [enable GZip
  compression](/post/optimiser-son-site-sous-ubuntu-et-ailleurs-compresser-avec-gzip)
  and set [a far future Expires
  header](/post/optimiser-son-site-sous-ubuntu-configurer-l-en-tete-expires)
  where possible
* I also replaced the code using YUI3
  (drag'n drop of sub-items when sorting with priority) or
  YUI2 (Date picker) JavaScript frameworks
  by a code based on [jQuery](http://jquery.com/) and
  [jQueryUI](http://jqueryui.com/) as jQuery is used for most features of admin2
  and jQueryUI is used for others features provided by the extension. This
  avoids loading three JavaScript frameworks.
* Most of the JavaScript code executed in page has been deferred to DOM ready
  event instead of DOM load.
* The login page preloads the most used images and all the JavaScript files
  needed by the admin interface. I tried to configure eZ Publish/eZJSCore so
  that the JavaScript pack file generated by eZJSCore
  operators
  is the same on all pages. The browser downloads the JavaScript on the login
  page and then it always uses its cache on others pages. I'm happy to see that
  [a part of this has been ported in the eZ Publish
  trunk](https://github.com/ezsystems/ezpublish-legacy/commit/26c71b2f84f2f3a3b381501a3cc3f586ba71d492)
  :-)

## What is missing, future developments ?


I wanted to override
`ezdesign`
and
`ezimage`
operators to automatically add the last modification date of a ressource in file
URI so a far future header can be set on all design ressources without any
browser cache issue. Unfortunately, overriding template operators is not
possible for the moment. Currently, the expires is
set to only seven days in expires.conf provided in the extension for most
design
ressources.


In addition, a lot of others small improvements would be possible like minifying
inline JavaScript code or part of the HTML itself,… and as usual, it lacks
some documentation on how to set it up.