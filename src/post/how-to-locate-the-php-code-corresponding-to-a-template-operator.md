---
title: "How to locate the PHP code corresponding to a template operator?"
tags: ez publish, template, extension, php
node: "69669"
remoteId: "66aac4df42a7c849b97dd24d1c29cd3b"
published: 2011-10-14T21:20:33+02:00
---

I've seen this question for [the <code>datetime</code>
 operator](http://doc.ez.no/eZ-Publish/Technical-manual/4.x/Reference/Template-operators/Formatting-and-internationalization/datetime) lately on Google+. This is a very common question that has an easy answer whenever you know how the eZ Publish template operators are working internally.


If you look at [the tutorial on how to write a template operator in an eZ Publish extension](http://share.ez.no/learn/ez-publish/an-introduction-to-developing-ez-publish-extensions/), you'll notice that you have to declare in an array that a given set of template operators is implemented by a given PHP class. This system is valid for extensions but in fact, it's also how the stock template operators are declared. The only difference is where the <code>eztemplateautoload.php</code>
 files are located. For the stock template operators, those files are in the directories listed in [site.ini/[TemplateSettings]/AutoloadPathList[]](http://doc.ez.no/eZ-Publish/Technical-manual/4.x/Reference/Configuration-files/site.ini/TemplateSettings/AutoloadPathList) and not in the <code>autoloads</code>
 sub-directory of each extension declared in [site.ini/[TemplateSettings]/ExtensionAutoloadPath[]](http://doc.ez.no/eZ-Publish/Technical-manual/4.x/Reference/Configuration-files/site.ini/TemplateSettings/ExtensionAutoloadPath).


Given that, it's easy to find where the <code>datetime</code>
 operator is declared for instance with the following command:

``` bash
$ find . -name eztemplateautoload.php -exec grep -il datetime {} \;
# looking for file named eztemplateautoload.php containing "datetime"
./lib/eztemplate/classes/eztemplateautoload.php
```


And by looking at this file, you can see that this template operator is implemented by the class [eZTemplateLocaleOperator](https://github.com/ezsystems/ezpublish-legacy/blob/master/lib/eztemplate/classes/eztemplatelocaleoperator.php) and the autoload file or your favorite IDE will then show you where it is located in the eZ Publish directory.

