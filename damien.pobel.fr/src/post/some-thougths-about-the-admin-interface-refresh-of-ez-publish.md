---
title: "Some thougths about the admin interface refresh of eZ Publish"
tags: ez publish, template, performances, ergonomie, javascript
node: "68047"
remoteId: "015840092d2d622282b9a0db2a0dc088"
published: 2009-11-26T23:23:15+01:00
updated: 2016-02-11 14:09
---

The big new feature of the eZ Publish 4.3 roadmap is a new admin interface. The work on it
has started with [a requirements
document](https://github.com/ezsystems/ezpublish-legacy/blob/master/doc/specifications/4.3/admin_refresh/functional_requirements.txt)
and [a prototype of a
page](https://github.com/ezsystems/ezpublish-legacy/tree/master/doc/specifications/4.3/admin_refresh/concepts)
(download it locally if you want to see it in your browser). jQuery is used in
the prototype, I don't know if it's a definitive choice, but as I have already
said on that topic, a choice of a framework is better than no real choice (even
if jQuery is not my preferred JavaScript framework). I think that most of the
big needs are already covered in the document but there are some small details
that miss in the current admin interface that I would like to see in the future
one:

* Labels of each field should be linked to their related input with the <code>for</code> attribute. That's a very small
addition but I find it more than useful in web applications.
* The focused
<code>input</code> should be highlighted with a different colour. This is
another very small improvement which can greatly improve users experience.
* Buttons in the admin interface should be of a different colour depending on the
action they trigger. For instance cancel buttons can be orange, publish buttons
blue, remove buttons red,… The main key here is to be consistent over all the
interface.

The edit interface of each datatype should also be considered individually to
provide the best interface. For instance, the edit template of a datetime
attribute should provide a JavaScript calendar (like with the ezwebin package),
the template of a time attribute a button to fill inputs field with the current
time, the keyword datatype an *autocomplete* input (like with the
ezkeywords_autocomplete
extension),… Beside an advanced edit interface for each attribute, the data
entered in the edit form should also be checked with JavaScript (required or
not, valid syntax,…). In case of errors, fields that do not validate should
be highlighted with a message until a new valid value is entered. Obviously, if
JavaScript is disabled, a server side check should do the same thing. On this
topic, there's also a very old feature request in the issue tracker about the
ability to add an help text in the class definition
that would be displayed under the edit interface of the attribute.


Finally, a great improvement would be to apply [general rules on performances
frontend](/post/livre-high-performances-web-sites). I think of packing and
minifying CSS et JavaScript files (with
ezjscore!), using CSS Sprites for design
images and use optimized PNG files instead of GIF files. This would improve the
user experience by speeding up response time and making the admin interface
usable with a slow Internet line
