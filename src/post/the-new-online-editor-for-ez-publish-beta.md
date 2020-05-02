---
title: "The new Online Editor for eZ Publish (beta)"
tags: ez publish, interface, online editor, php, internet explorer
node: "66665"
remoteId: "ba523002ccdfe9b3b56492e8ea74f056"
published: 2008-02-16T15:27:29+01:00
updated: 2016-02-10 08:45
---

For me it's probably one of the most expected feature in [eZ
Publish](/tag/ez-publish) after [the PHP5 port with eZ Publish
4](/post/ez-publish-4) ! It's only a beta release but it looks very promising.

<figure class="object-center"><a href="/images/online-editor-mce.png"><img src="/images/660x/online-editor-mce.png" alt="Online Editor MCE"> </a></figure>


It's based on [TinyMCE](http://tinymce.moxiecode.com/), so
Internet Explorer (including IE7 under Windows Vista), [browsers based on
Gecko](http://en.wikipedia.org/wiki/Gecko_%28layout_engine%29#Usage) (Firefox
...), Opera and Safari are now supported and unlike the old one, there are not
two code bases for two navigator families&nbsp;! It's also more flexible as we can
add or remove buttons and functionnalities (like an underline button). After
reading the document and a small test, there is one feature I would like to see,
it is the hability to easily customize the drop down list (paragraph,
preformatted, headings) with others styles / tags like [the style configuration
in
FCKEditor](http://docs.fckeditor.net/FCKeditor_2.x/Developers_Guide/Configuration/Styles).
It can probably be done with a Tiny MCE plugin but a simple setting in
eztinymce.ini file would be a simple but very useful tool !
