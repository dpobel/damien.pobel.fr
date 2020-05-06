---
title: "Creating a link to download a file with Online Editor in eZ Publish"
tags: ez publish, truc, interface, online editor
updated: 2007-09-27T08:10:00.000Z
node: "66099"
remoteId: "f368794b04a7ca2c700e41bb25f7bb7c"
published: 2007-08-02T01:21:42+02:00
---
 
I've read a good article in french showing [a way to insert direct download link to a file](http://blog.episode-2.com/2007/07/30/ezpublish-oe-inserer-aisement-un-lien-vers-un-fichier-a-telecharger/) in [eZ Publish](/tag/ez-publish) and [Online Editor](/tag/online-editor). This post explains how to add a target view in Online Editor and how to use the [Redirect Operator](http://ez.no/community/contribs/template_plugins/redirect_operators) in this view to be redirected to download a file. Although I used this method, I don't think it's a good practice even if it's probably the most obvious, because templates should only be used for presentation. So I thought about another solution without redirection that only uses two features of eZ Publish / Online Editor :

 * [the class attribute](http://ez.no/doc/extensions/online_editor/4_x/usage/formatted_text/the_class_parameter) of &lt;link /&gt; tag
 * an override of the template that creates links
 
First, [declare a class](http://ez.no/doc/ez_publish/technical_manual/3_9/reference/configuration_files/content_ini/name_of_xml_tag) for the &lt;link /&gt; tag with few lines like these in settings/override/content.ini.append.php :

 ``` ini
[link]
AvailableClasses[]
AvailableClasses[]=download
```

 
In extension/ezdhtml/settings/content.ini.append, I also add this :

 ``` ini
[link]
ClassDescription[]
ClassDescription[download]=Téléchargement
```

 
It's not required, but with these lines, Online Editor will display &quot;Téléchargement&quot; in the &quot;Class&quot; field which is more user friendly for french users ;-)

 
Then create an override of the template content/datatype/view/ezxmltags/link.tpl for example in override/templates/link_download.tpl in your design with the following code :

 ```
{def $n='' $attribute='' $url=false() $protocols=array('http', 'file', 'ftp', 'mailto', 'https')
}{if $protocols|contains( $href|explode(':')|extract_left(1))not()
    }{set $n=fetch(content, node, hash(node_path, $href))
    }{if and($n, $n.object.class_identifier|eq('file'))
    }{set $attribute=$n.data_map.file
    }{set $url=concat( '/content/download/', $attribute.contentobject_id, '/', $attribute.id,'/version/', $attribute.version , '/file/', $attribute.content.original_filename|urlencode )
    }{/if}{/if}{if $url|not()}{set $url=$href}{/if}<a href={$url|ezurl}{section show=$id} id="{$id}"{/section}{section show=$title} title="{$title}"{/section}{section show=$target} target="{$target}"{/section}{section show=ne($classification|trim,'')} class="{$classification|wash}"{/section}>{$content}</a>{undef $n $attribute $url $protocols}
```

 
Finally, just add this override condition in settings/&lt;your_siteaccess&gt;/override.ini.append.php :

 ``` ini
[download_link]
Source=content/datatype/view/ezxmltags/link.tpl
MatchFile=link_download.tpl
Subdir=templates
Match[classification]=download
```

 
After clearing the cache, the new template will be used if the link has &quot;download&quot; in the class attribute and if it's not a full link (with a scheme protocol), it will try to generate a link to download the file. It can probably be improved by putting some datas in settings (object class(es), protocols list, ...)... The indentation is weird in order to be more readable without inserting unnecessary space the HTML code.

 


<figure class="object-center"><a href="/images/creer-un-lien-vers-un-fichier-a-telecharger-dans-ez-publish-online-editor.png"><img loading="lazy" src="/images//creer-un-lien-vers-un-fichier-a-telecharger-dans-ez-publish-online-editor.png" alt="Créer un lien vers un fichier à télécharger dans eZ Publish / Online Editor">
</a></figure>




 
So with this configuration, if you want to insert a direct link to download a file in eZ Publish, you just have to choose the download class ( *Téléchargement* for me) and eZ Publish generates the right link to download.

