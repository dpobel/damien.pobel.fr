---
title: "Install eZWebin Toolbar into an existing site"
tags: ez publish, online editor, interface, extension, template, design
node: "67061"
remoteId: "c38f247121f6a5a6f348e0d3133945e7"
published: 2008-08-23T19:45:12+02:00
updated: 2016-02-11 13:41
---

[eZWebin](http://ez.no/doc/extensions/website_interface) is an extension
providing a toolbar that lets you manage your content directly in the front-end
of an [eZ Publish](/tag/ez-publish) site. When [refreshing the design of this
site](/post/pwet-2-0), integrating the toolbar was one of my goals. Łukasz
Serwatka had already published a nice article on how to
create your own toolbar
extension (serwatka.net/blog/how_to_create_and_use_an_ez_publish_website_toolbar_extension, dead page :-()
by copying files from the ezwebin extension. I don't like this solution because
you have to copy again those files when the extension is upgraded (I'm lazy as
all developers!). That's why I use the following steps on my blog.

## Install and configure the ezwebin extension


If you don't have the ezwebin extension installed, you have to download and
install it. Retrieve [the ezwebin extension as a
package](http://packages.ez.no/ezpublish/4.0/4.0.0/ezwebin_extension.ezpkg) on
the eZ Publish 4.0 packages
page
(it should work with eZ Publish 4.0.1 to) and [install it through the admin
interface](http://ez.no/doc/ez_publish/technical_manual/4_0/features/packages/installing_packages)
and finally activate it. As I have my own design, I don't need the others
`ezwebin_*` packages. Then, you have to add ezwebin as an additional design, in
the site.ini.append.php of your front end siteaccess you should have something
like :

``` ini
[DesignSettings]
SiteDesign=your_design_name
AdditionalSiteDesignList[]=ezwebin

```


## Template modification


This step depends on your site. With most designs, you just need to add those lines of code in [the pagelayout template before the <code>{$module_result.content}</code>](http://ez.no/doc/ez_publish/technical_manual/4_0/templates/the_pagelayout#eztoc86799_4_1) :

``` smarty
{def $current_node_id = first_set( $module_result.node_id, 0 )
     $content_info = cond( is_set( $module_result.content_info ), $module_result.content_info, hash())}
{if and( $current_node_id,
         $current_user.is_logged_in,
         and( is_set( $content_info.viewmode ), ne( $content_info.viewmode, 'sitemap' )),
         and( is_set( $content_info.viewmode ), ne( $content_info.viewmode, 'tagcloud' )) )}
<style type="text/css">
@import url({"stylesheets/websitetoolbar.css"|ezdesign(no)});
</style>
{include uri='design:parts/website_toolbar.tpl'}
{elseif or( $uri_string|begins_with( 'content/versionview' ),
            $uri_string|begins_with( 'content/edit' ))}
<style type="text/css">
@import url({"stylesheets/websitetoolbar.css"|ezdesign(no)});
</style>
{/if}
{undef $current_node_id $content_info}
```


If you have several pagelayout templates, you can put this code in a template
file and include it. It only adds the toolbar and/or a stylesheet if you are
identified or if you edit or preview a content. The toolbar seems to be flexible
enough to be included without major layout problem.


## And then ?

These steps bring an easy to use interface to manage your content. You probably
need to adjust your stylesheet(s) to have a nice edit form.

<table class="table-centre"><tr><td><figure class="object-center"><a href="/images/ezwebin-toolbar.png"><img src="/images/330x/ezwebin-toolbar.png" alt="eZWebin Toolbar">
</a></figure></td>
<td><figure class="object-center"><a href="/images/front-end-interface.png"><img src="/images/330x/front-end-interface.png" alt="Front end interface">
</a></figure></td>
</tr>
</table>

I also have two small problems:

1. It's not possible to make [an override
condition](http://ez.no/doc/ez_publish/technical_manual/4_0/reference/template_override_conditions)
to use a special pagelayout for edit mode. Depending on your layout, you may
need to add some conditions to have only one column (or enough space) in edit
mode. For instance, the toolbar of [the new Online
Editor](/post/the-new-online-editor-for-ez-publish-beta) needs 750px to be
displayed on a single line (even if it works well when the toobar is displayed
on many lines)
1. [content/versionview has a bug](http://issues.ez.no/13529) when
it is used from the ezwebin toolbar. It doesn't use the right pagelayout if you
have some override rules on it. I propose a patch in the bug report which works
well for me.


Nevertheless, it works well and it's very convenient for a blog.
