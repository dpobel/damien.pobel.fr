---
title: "Using the eZ Publish REST API v2 with cURL"
tags: ez publish, rest, ez publish 5, http, shell
lang: "en"
published: 2013-04-18T23:08:38+02:00
---

Lately, I've been testing and fixing several issues with the eZ Publish REST API
v2. To manually test it, I use [cURL](http://curl.haxx.se/) ([man
curl](http://pwet.fr/man/linux/commandes/curl)) because it's widely available,
well documented, and like any other command line tool, you can use it together
with others text processing tools
([grep](http://pwet.fr/man/linux/commandes/grep),
[xmllint](http://pwet.fr/man/linux/commandes/xmllint),
[xsltproc](http://pwet.fr/man/linux/commandes/xsltproc), ...). I'm writing this
post as a memo for me but I'm sure some people will find it useful as well.

The whole REST API v2 is specified in [the ezpublish-kernel git
repository](https://github.com/ezsystems/ezpublish-kernel/blob/master/doc/specifications/rest/REST-API-V2.rst).
Yes, that's a huge document, because the REST API is huge :-) [A shorter
introduction/documentation is also available in the eZ Publish
documentation](https://confluence.ez.no/display/EZP/REST+API).

*Note: to keep this post short and readable, the command results are not in the
post itself but the whole command line session is available [on this
page](/page/ez-publish-rest-v2-calls-outputs)*

## Basic GET requests

Let's start with a simple GET request on the root of the API:

```
curl -u "admin:ezpublish" -i http://ezpublish5.loc/api/ezp/v2/
```

* `-u "admin:ezpublish"` allows to authenticate on the website with the Basic Auth
which is the default authentication method.
* `-i` tells the cURL to display the HTTP response headers

By default, the response is formatted in XML. If you prefer to get the result as
JSON, you have to specify it by setting the `Accept` header with the `-H` parameter:

```                                                                             
curl -u "admin:ezpublish" -i -H "Accept: application/json" \
http://ezpublish5.loc/api/ezp/v2/
```
Of course, it's possible to retrieve more useful data with the REST API, for instance
to read the metadata of the */Media* folder (id 41):

```
curl -u "admin:ezpublish" -i \
-H "Accept: application/vnd.ez.api.ContentInfo+json" \
http://ezpublish5.loc/api/ezp/v2/content/objects/41
```
If you want to get the whole Content with its attributes:

```
curl -u "admin:ezpublish" -i \
-H "Accept: application/vnd.ez.api.Content+json" \
http://ezpublish5.loc/api/ezp/v2/content/objects/41
```
The only difference between the last two calls is the `Accept` header which
allows to tell to the system what data I want.

The GET requests allow to read pretty much everything in the content repository.
That's cool but we can do cooler tasks provided we enrich our HTTP vocabulary
:-)

## Publish an image

To publish a content, we have to first create a draft and then to actually
publish it.

### Create the image draft

The creation of the draft is done with a POST request on
`/api/ezp/v2/content/objects` with a body containing the
required and structured data. As for the response, it's possible to use either
JSON or XML in input. In the following examples, I use the JSON way:

```
curl -u "admin:ezpublish" -i -H "Accept: application/json" \
-H "Content-Type: application/vnd.ez.api.ContentCreate+json" \
-H "Expect:" -X POST -d @createimage.json \
http://ezpublish5.loc/api/ezp/v2/content/objects
```

* `-X POST` tells cURL to do a POST request
* `-d @createimage.json` tells cURL to put the content of [the file
  `createimage.json`](/files/createimage.json) in the request body. Without the
  `@`, the value right after the `-d` switch is put in the request body.
* `-H "Content-Type: application/vnd.ez.api.ContentCreate+json"` indicates that the
  body of the request is a content create struct in JSON.

The `-H "Expect:"` might sound a bit weird. Actually, this is to prevent cURL
from automatically filling this header in a request with a body which is not
really useful in the context of a REST API. If you want to learn more on this
header, take a look at [the RFC 2616 which defines HTTP
1.1](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.20)

### Publish the draft

Our draft is now created, we just have to publish it, this is done by issuing a
PUBLISH request on the resources corresponding to the newly created draft (The
content id is taken from the response of the draft creation request).

```
curl -u "admin:ezpublish" -i -X PUBLISH \
http://ezpublish5.loc/api/ezp/v2/content/objects/135/versions/1
```

`PUBLISH` is a custom HTTP verb, depending on various configuration details,
this kind of request may not be accepted. In such case, it's possible to emulate
it with a POST request having the custom header `X-HTTP-Method-Override`
set to PUBLISH:

```
curl -u "admin:ezpublish" -i -X POST \
-H "X-HTTP-Method-Override: PUBLISH" \
http://ezpublish5.loc/api/ezp/v2/content/objects/135/versions/1
```

Both requests do exactly the same. After one of these commands, you should see a
new image under the */Media/Images/* called *eZ Systems logo created with the
REST API*.

<figure class="object-center"><img
src="/images/image-content-created-with-the-rest-api.png" alt="Screenshot of the
admin interface showing the image created with the REST
API" style="border: 1px solid #aaa"></figure>

## And then ?

Going over all available operations would be a tad long and useless. In any
case, the basics remain the same: with an HTTP request on a given resource
eventually with a structured body, you can do all operations on the content
repository. That's just awesome!
