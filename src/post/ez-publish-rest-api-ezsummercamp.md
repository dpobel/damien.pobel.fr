---
title: "eZ Publish REST API at the eZ Summer Camp 2013"
tags: ez publish, php, ezsummercamp, rest, http
published: 2013-09-09T08:20:03+02:00
---
After [the workshop on the eZ Publish Public
API](/post/ez-publish-public-api-ezsummercamp), I also animated a workshop on the
eZ Publish REST API at [the eZ Summer Camp 2013](http://ezsummercamp.com). As
for the previous one, [the slides are
online](http://dpobel.github.io/slides-ez/rest-api.html) on my github pages and
the
[SummerCamp2013RestApiBundle](http://github.com/dpobel/SummerCamp2013RestApiBundle)
is also available on my github account with the same branches system (`master`
and `workshop_solutions`). So for lazy people, [the
diff](https://github.com/dpobel/SummerCamp2013RestApiBundle/compare/master...workshop_solutions)
gives the expected `curl` command lines and the JavaScript code to complete the
rough admin interface prototype.

Unfortunately, it seems like [eZ Publish Community Project
2013.07](http://share.ez.no/downloads/downloads/ez-publish-community-project-2013.07)
is affected by the bug [EZP-21522](https://jira.ez.no/browse/EZP-21522) which
prevents any publication of a content with an image... That's why I also added
an alternative JSON file to use as the body of the create draft request so that
the publication actually works.
