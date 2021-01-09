---
title: "How to override a default eZ Publish template operator"
tags: ez publish, php, extension, template
updated: 2010-11-26T22:10:38.000Z
node: "68977"
remoteId: "4af9aa2688a8a03073ff09b127214d92"
published: 2010-11-26T23:06:28+01:00
---

I answered this question by email some weeks ago, it's not a good practice but sometimes it's the only solution… In fact, overriding a default eZ Publish template operator is possible since [eZ Publish](/tag/ez-publish) Fuji (4.4) with a patch I proposed in [the issue #16265](http://issues.ez.no/16265). It removes the [include_once](http://www.php.net/include_once) calls to let eZ Publish uses the autoload system. So it's now possible to override the PHP class that provides one or several template operators like any other class in the system. Here's a quick tutorial on how to override a template operator :


1. Enable the kernel override by putting the following line in the <code>config.php</code>
 file in the eZ Publish root:
    ``` php
    define( 'EZP_AUTOLOAD_ALLOW_KERNEL_OVERRIDE', true );
    ```
2. In an extension, copy the PHP class that provides the template operator you want to override. To easily find the class, you can have a look at [eztemplateautoload.php in kernel/common](https://github.com/ezsystems/ezpublish-legacy/blob/master/kernel/common/eztemplateautoload.php) or [the one in lib/templates](https://github.com/ezsystems/ezpublish-legacy/blob/master/lib/eztemplate/classes/eztemplateautoload.php)
3. Make your modification in the copy of the class
4. Generate the kernel override autoload array with the following command :
    ``` bash
    php bin/php/ezpgenerateautoloads.php -o
    ```


And that's all folks ;-)

