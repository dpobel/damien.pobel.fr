---
title: eZ Publish REST v2 calls and outputs
noMenu: true
---

# eZ Publish REST v2 calls and outputs

This page provides the details of the REST calls showed in the post [Using the eZ
Publish REST API v2 with cURL](/post/ez-publish-rest-curl).

<ul>
    <li>
        <a href="#get">Basic GET requests</a>
        <ul>
            <li><a href="#xml">Root request as XML</a></li>
            <li><a href="#json">Root request as JSON</a></li>
            <li><a href="#metadata">Metadata of a Content</a></li>
            <li><a href="#load">Load content</a></li>
        </ul>
    </li>
    <li>
        <a href="#image">Publish an image</a>
        <ul>
            <li><a href="#create">Create the image draft</a></li>
            <li><a href="#publish">Publish the draft</a></li>
        </ul>
    </li>
</ul>

## <span id="get">Basic GET requests</span>

### <span id="xml">Root request as XML</span>

```
$ curl -u "admin:ezpublish" -i http://ezpublish5.loc/api/ezp/v2/
HTTP/1.1 200 OK
Date: Thu, 18 Apr 2013 16:26:41 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Cache-Control: private
Transfer-Encoding: chunked
Content-Type: application/vnd.ez.api.Root+xml

<?xml version="1.0" encoding="UTF-8"?>
<Root media-type="application/vnd.ez.api.Root+xml">
 <content media-type="" href="/api/ezp/v2/content/objects"/>
 <contentTypes media-type="application/vnd.ez.api.ContentTypeInfoList+xml" href="/api/ezp/v2/content/types"/>
 <users media-type="application/vnd.ez.api.UserRefList+xml" href="/api/ezp/v2/user/users"/>
 <roles media-type="application/vnd.ez.api.RoleList+xml" href="/api/ezp/v2/user/roles"/>
 <rootLocation media-type="application/vnd.ez.api.Location+xml" href="/api/ezp/v2/content/locations/1/2"/>
 <rootUserGroup media-type="application/vnd.ez.api.UserGroup+xml" href="/api/ezp/v2/user/groups/1/5"/>
 <rootMediaFolder media-type="application/vnd.ez.api.Location+xml" href="/api/ezp/v2/content/locations/1/43"/>
 <trash media-type="application/vnd.ez.api.Trash+xml" href="/api/ezp/v2/content/trash"/>
 <sections media-type="application/vnd.ez.api.SectionList+xml" href="/api/ezp/v2/content/sections"/>
 <views media-type="application/vnd.ez.api.RefList+xml" href="/api/ezp/v2/content/views"/>
</Root>
```

### <span id="json">Root request as JSON</span>

```
$ curl -u "admin:ezpublish" -i -H "Accept: application/json" http://ezpublish5.loc/api/ezp/v2/
HTTP/1.1 200 OK
Date: Thu, 18 Apr 2013 19:34:30 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Cache-Control: private
Transfer-Encoding: chunked
Content-Type: application/vnd.ez.api.Root+json

{"Root":{"_media-type":"application\/vnd.ez.api.Root+json","content":{"_media-type":"","_href":"\/api\/ezp\/v2\/content\/objects"},"contentTypes":{"_media-type":"application\/vnd.ez.api.ContentTypeInfoList+json","_href":"\/api\/ezp\/v2\/content\/types"},"users":{"_media-type":"application\/vnd.ez.api.UserRefList+json","_href":"\/api\/ezp\/v2\/user\/users"},"roles":{"_media-type":"application\/vnd.ez.api.RoleList+json","_href":"\/api\/ezp\/v2\/user\/roles"},"rootLocation":{"_media-type":"application\/vnd.ez.api.Location+json","_href":"\/api\/ezp\/v2\/content\/locations\/1\/2"},"rootUserGroup":{"_media-type":"application\/vnd.ez.api.UserGroup+json","_href":"\/api\/ezp\/v2\/user\/groups\/1\/5"},"rootMediaFolder":{"_media-type":"application\/vnd.ez.api.Location+json","_href":"\/api\/ezp\/v2\/content\/locations\/1\/43"},"trash":{"_media-type":"application\/vnd.ez.api.Trash+json","_href":"\/api\/ezp\/v2\/content\/trash"},"sections":{"_media-type":"application\/vnd.ez.api.SectionList+json","_href":"\/api\/ezp\/v2\/content\/sections"},"views":{"_media-type":"application\/vnd.ez.api.RefList+json","_href":"\/api\/ezp\/v2\/content\/views"}}}
```

### <span id="metadata">Metadata of a Content</span>

```
$ curl -u "admin:ezpublish" -i -H "Accept: application/vnd.ez.api.ContentInfo+json" http://ezpublish5.loc/api/ezp/v2/content/objects/41
HTTP/1.1 200 OK
Date: Thu, 18 Apr 2013 19:40:34 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Accept-Patch: application/vnd.ez.api.ContentUpdate+json
Cache-Control: private
Transfer-Encoding: chunked
Content-Type: application/vnd.ez.api.ContentInfo+json

{"Content":{"_media-type":"application\/vnd.ez.api.ContentInfo+json","_href":"\/api\/ezp\/v2\/content\/objects\/41","_remoteId":"a6e35cbcb7cd6ae4b691f3eee30cd262","_id":41,"ContentType":{"_media-type":"application\/vnd.ez.api.ContentType+json","_href":"\/api\/ezp\/v2\/content\/types\/1"},"Name":"Media","Versions":{"_media-type":"application\/vnd.ez.api.VersionList+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/versions"},"CurrentVersion":{"_media-type":"application\/vnd.ez.api.Version+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/currentversion"},"Section":{"_media-type":"application\/vnd.ez.api.Section+json","_href":"\/api\/ezp\/v2\/content\/sections\/3"},"MainLocation":{"_media-type":"application\/vnd.ez.api.Location+json","_href":"\/api\/ezp\/v2\/content\/locations\/1\/43"},"Locations":{"_media-type":"application\/vnd.ez.api.LocationList+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/locations"},"Owner":{"_media-type":"application\/vnd.ez.api.User+json","_href":"\/api\/ezp\/v2\/user\/users\/14"},"lastModificationDate":"2003-08-12T15:37:37+02:00","publishedDate":"2003-08-12T15:37:37+02:00","mainLanguageCode":"eng-GB","alwaysAvailable":"true"}}
``` 

### <span id="load">Load content</span>

```
$ curl -u "admin:ezpublish" -i -H "Accept: application/vnd.ez.api.Content+json" http://ezpublish5.loc/api/ezp/v2/content/objects/41
HTTP/1.1 200 OK
Date: Thu, 18 Apr 2013 19:44:02 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Accept-Patch: application/vnd.ez.api.ContentUpdate+json
Cache-Control: private
Transfer-Encoding: chunked
Content-Type: application/vnd.ez.api.Content+json

{"Content":{"_media-type":"application\/vnd.ez.api.Content+json","_href":"\/api\/ezp\/v2\/content\/objects\/41","_remoteId":"a6e35cbcb7cd6ae4b691f3eee30cd262","_id":41,"ContentType":{"_media-type":"application\/vnd.ez.api.ContentType+json","_href":"\/api\/ezp\/v2\/content\/types\/1"},"Name":"Media","Versions":{"_media-type":"application\/vnd.ez.api.VersionList+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/versions"},"CurrentVersion":{"_media-type":"application\/vnd.ez.api.Version+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/currentversion","Version":{"_media-type":"application\/vnd.ez.api.Version+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/versions\/1","VersionInfo":{"id":472,"versionNo":1,"status":"PUBLISHED","modificationDate":"2003-08-12T15:37:37+02:00","Creator":{"_media-type":"application\/vnd.ez.api.User+json","_href":"\/api\/ezp\/v2\/user\/users\/14"},"creationDate":"2003-08-12T15:37:30+02:00","initialLanguageCode":"eng-GB","languageCodes":"eng-GB","names":{"value":[{"_languageCode":"eng-GB","#text":"Media"}]},"Content":{"_media-type":"application\/vnd.ez.api.ContentInfo+json","_href":"\/api\/ezp\/v2\/content\/objects\/41"}},"Fields":{"field":[{"id":98,"fieldDefinitionIdentifier":"name","languageCode":"eng-GB","fieldValue":"Media"},{"id":99,"fieldDefinitionIdentifier":"short_description","languageCode":"eng-GB","fieldValue":{"xml":"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<section xmlns:image=\"http:\/\/ez.no\/namespaces\/ezpublish3\/image\/\" xmlns:xhtml=\"http:\/\/ez.no\/namespaces\/ezpublish3\/xhtml\/\" xmlns:custom=\"http:\/\/ez.no\/namespaces\/ezpublish3\/custom\/\"\/>\n"}},{"id":103,"fieldDefinitionIdentifier":"short_name","languageCode":"eng-GB","fieldValue":null},{"id":105,"fieldDefinitionIdentifier":"description","languageCode":"eng-GB","fieldValue":{"xml":"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<section\/>\n"}},{"id":109,"fieldDefinitionIdentifier":"show_children","languageCode":"eng-GB","fieldValue":false},{"id":597,"fieldDefinitionIdentifier":"call_for_action","languageCode":"eng-GB","fieldValue":"O:41:\"eZ\\Publish\\Core\\FieldType\\Page\\Parts\\Page\":4:{s:8:\"\u0000*\u0000zones\";a:0:{}s:12:\"\u0000*\u0000zonesById\";a:0:{}s:9:\"\u0000*\u0000layout\";N;s:10:\"attributes\";a:0:{}}"},{"id":609,"fieldDefinitionIdentifier":"tags","languageCode":"eng-GB","fieldValue":[]}]},"Relations":{"_media-type":"application\/vnd.ez.api.RelationList+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/versions\/1\/relations","Relation":[]}}},"Section":{"_media-type":"application\/vnd.ez.api.Section+json","_href":"\/api\/ezp\/v2\/content\/sections\/3"},"MainLocation":{"_media-type":"application\/vnd.ez.api.Location+json","_href":"\/api\/ezp\/v2\/content\/locations\/1\/43"},"Locations":{"_media-type":"application\/vnd.ez.api.LocationList+json","_href":"\/api\/ezp\/v2\/content\/objects\/41\/locations"},"Owner":{"_media-type":"application\/vnd.ez.api.User+json","_href":"\/api\/ezp\/v2\/user\/users\/14"},"lastModificationDate":"2003-08-12T15:37:37+02:00","publishedDate":"2003-08-12T15:37:37+02:00","mainLanguageCode":"eng-GB","alwaysAvailable":"true"}}
```

## <span id="image">Publish an image</span>

### <span id="create">Create the image draft</span>

[createimage.json](/files/createimage.json) contains the JSON structure needed to create the image draft.

```
$ curl -u "admin:ezpublish" -i -H "Accept: application/json" -H "Content-Type: application/vnd.ez.api.ContentCreate+json" -H "Expect:" -X POST -d @createimage.json  http://ezpublish5.loc/api/ezp/v2/content/objects
HTTP/1.1 201 Created
Date: Thu, 18 Apr 2013 19:56:45 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Accept-Patch: application/vnd.ez.api.ContentUpdate+json
Location: /api/ezp/v2/content/objects/135
Status: 201 Created
Cache-Control: no-cache
Transfer-Encoding: chunked
Content-Type: application/vnd.ez.api.ContentInfo+json

{"Content":{"_media-type":"application\/vnd.ez.api.ContentInfo+json","_href":"\/api\/ezp\/v2\/content\/objects\/135","_remoteId":"cf10e7dbb7de3c123fe64f681931ec0d","_id":"135","ContentType":{"_media-type":"application\/vnd.ez.api.ContentType+json","_href":"\/api\/ezp\/v2\/content\/types\/27"},"Name":"eZ Systems logo created with the REST API","Versions":{"_media-type":"application\/vnd.ez.api.VersionList+json","_href":"\/api\/ezp\/v2\/content\/objects\/135\/versions"},"CurrentVersion":{"_media-type":"application\/vnd.ez.api.Version+json","_href":"\/api\/ezp\/v2\/content\/objects\/135\/currentversion"},"Section":{"_media-type":"application\/vnd.ez.api.Section+json","_href":"\/api\/ezp\/v2\/content\/sections\/3"},"Locations":{"_media-type":"application\/vnd.ez.api.LocationList+json","_href":"\/api\/ezp\/v2\/content\/objects\/135\/locations"},"Owner":{"_media-type":"application\/vnd.ez.api.User+json","_href":"\/api\/ezp\/v2\/user\/users\/14"},"mainLanguageCode":"eng-GB","alwaysAvailable":"false"}}
```

### <span id="publish">Publish the draft</span>

```
$ curl -u "admin:ezpublish" -i -X PUBLISH http://ezpublish5.loc/api/ezp/v2/content/objects/135/versions/1
HTTP/1.1 204 No Content
Date: Thu, 18 Apr 2013 20:02:47 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Powered-By: PHP/5.3.10-1ubuntu3.6
Status: 204 No Content
Cache-Control: no-cache
Vary: Accept-Encoding
Content-Type: text/html; charset=UTF-8

```
