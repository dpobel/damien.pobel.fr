---
title: "How to split components across domains with eZ Publish"
tags: ez publish, truc, performances, template, internet explorer, firefox
updated: 2011-02-23T15:43:42.000Z
node: "69024"
remoteId: "f4c1198bab74a1f833c3f4c7a574e0c4"
published: 2011-02-23T09:37:17+01:00
---

﻿The starting point of this post is [an interesting asking of Marty_Nim](http://twitter.com/MartY_NiM/status/39783968240971776) (aka [Nicolas Martinez](http://www.nicolas-martinez.info/)) on Twitter about the ability to split static components across domains with [eZ Publish](/tag/ez-publish) to improve frontend performances.


## Why split components across domains ?


Split components across domains is [one of the advices of the Yahoo! Exceptionnal Performances team](http://developer.yahoo.com/performance/rules.html#split). This advice is a consequence of the behaviour of browsers that are able to download a limited number of compoments on a given domain at the same time. Following [the RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.1.4), old browsers like Internet Explorer 6 or 7 are only able to download 2 components on a domain in parallel while modern browsers (Internet Explorer &gt;=8, Firefox &gt;=3.x, Chrome, …) are able [to download 6 or 8 ressources in parallel](http://www.stevesouders.com/blog/2008/03/20/roundup-on-parallel-connections/). Therefore, this rule is especially useful for those old browsers or if your pages use a lot of different components. It's also not recommended to use too much different domains because of the DNS resolution latency.


## In eZ Publish


In eZ Publish, it is very easy to implement this advice for JavaScript files and CSS stylesheets provided [the ezjscore operators](http://share.ez.no/learn/ez-publish/ezjscore-ez-publish-javascript-and-ajax-framework/) (<code>ezcss*</code>
 and <code>ezscript*</code>
) are used to include those files. In fact, the ezjscore extension allows [to specify a custom hosts](http://doc.ez.no/Extensions/eZ-JS-Core/Settings#eztoc113939_2_8) depending the extension of the included files. For instance, it's possible to write the following settings in an override of ezjscore.ini file :

``` ini
[Packer]
CustomHosts[.js]=http://media1.pwet.fr
CustomHosts[.css]=http://media2.pwet.fr
```


With those settings, eZ Publish will include the JavaScript file(s) from <code>http://media1.pwet.fr</code>
, while CSS stylesheets will be included from <code>http://media2.pwet.fr</code>
. The later case has an interesting side effect, because the background images used in the CSS files will also be fetched from the custom host.

And what about others components that are directly embed in templates ? Currently, there's no out of the box solution, but as explained by [Gaetano on Twitter](http://twitter.com/gggeek/status/40067054245519360), [since eZ Publish 4.4, it's possible to override template operators](/post/how-to-override-a-default-ez-publish-template-operator) so it's possible to write something similar for images, flash, … embed with ezimage, ezdesign or ezroot template operators even if [this should probably be a native feature](http://issues.ez.no/18036).

