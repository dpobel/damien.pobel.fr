---
title: "Some tips about the eZ Publish debug"
tags: ez publish, template, extension, ajax, truc
node: "67332"
remoteId: "911fce436dcbaf3174e0fd159f0cd8d8"
published: 2008-11-16T23:53:57+01:00
updated: 2016-02-12 09:32
---

The [eZ Publish](/tag/ez-publish) debug is probably one of the most useful tool
for the *eZ developer*. [It is recommended to always activate it during
development](http://suffandnonsense.blogspot.com/2008/10/10-tips-for-new-ez-publish-developers.html)
as you should read in it only debug or notice messages (and perhaps some
translations warnings).


## Enable the debug ouput


I usually activate it by putting those lines in the site.ini.append.php of the siteaccess I work on :

``` ini
[DebugSettings]
DebugOutput=enabled

[TemplateSettings]
ShowUsedTemplates=enabled

```

Those settings activate the debug and display the templates used to render the
page which is often a very useful information.

## Don't show debug to everybody


It is also possible to restrict the generation of the debug by IP or by user id.
This feature can be useful to monitor a live sites or to not annoy your
colleagues when developing a site. With the following settings, the debug is
only displayed for users visiting the site with the IP 10.2.2.157:

``` ini
[DebugSettings]
DebugOutput=enabled
DebugByIP=enabled
DebugIPList[]=10.2.2.157

```

Comment the line beginning by <code>DebugIPList</code>
 will make the debug disappear for everybody.

## What happen before the redirection ?


<code>DebugRedirection</code>
setting lets the developer read debug messages before an HTTP redirect. Instead
of being directly redirected, you have to click on a button to view the next
page. It can be useful to debug workflow events, content edit
handler (serwatka.net/index.php/blog/ez_publish_3_8_new_custom_edit_handler,
offline page…)
or extensions with modules and views…
It is also possible to specify paths in this setting to enable this feature for
only some pages, but this feature is undocumented
for the moment.

## Place the debug to not break your page


The default behaviour of eZ Publish is to replace the string <code>&lt;!--
DEBUG_REPORT --&gt;</code> by the debug output. If the string is not in the HTML
code of the page, the debug will be placed at the end of the page. So depending
on the HTML code, it's important to place correctly the string <code>&lt;!--
DEBUG_REPORT --&gt;</code> to not break the page with the debug.

## Disable the debug for some special pages

As seen just before, <code>&lt;!-- DEBUG_REPORT --&gt;</code> is replaced by the
debug output, so it's easy to comment <code>&lt;!-- DEBUG_REPORT --&gt;</code>
another time in the pagelayout so that the debug is commented in some special
pages for example in <abbr title="Asynchronous Javascript And XML">AJAX</abbr>
parts of a page or in [exports based on a special
layout](/post/des-fils-rss-sur-mesure-dans-ez-publish). More details in Disable
debug for custom layouts (/layout/set/xyz) topic in eZ.no forums.


## Output something in the debug from a template


debug-log is an undocumented template
operator(https://jira.ez.no/browse/EZP-12555) that lets the developer output a
variable and/or a message to the debug output. It's just an
eZDebug::writeDebug
call. It is sometimes easier to read and less obtrusive than using the
attribute()
operator,
I use it in [eZ Class Lists 1.0](/post/ez-class-lists-1-0-for-ez-publish-4-0) to
display the hash used to filter objects list with something like :

```
{debug-log msg='template fetch filter' var=$filter_hash}
```
