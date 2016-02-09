---
title: "Des fils RSS sur mesure dans eZ Publish"
tags: xml, xslt, ez publish, truc, rss, blog
lang: "fr"
node: "64671"
remoteId: "c1128bf222a49b5cd3941eac5d1ae81f"
published: 2007-02-27T23:52:14+01:00
updated: 2016-02-09 09:28
---
 
Ce billet aurait pu s'appeler *RSS and eZ Publish on Steroïd* ou bien *RSS ou
autres exports de contenu avec eZ Publish* ou encore *Utilisation de différents
layouts dans eZ Publish* ... La technique présentée dans ce billet a été
inspirée par le message de Bertrand Danes sur le forum eZ Publish
France (site mort depuis...)
et pour certains points techniques par [l'extension Google
Sitemap](http://ez.no/community/contribs/template_plugins/googlesitemaps_extension)
de Sergey Shishkin qui utilise aussi ce mécanimse.
 
Depuis un moment, j'avais envie de gérer plus finement et d'étendre les flux RSS
sur [pwet.fr](/) (et maintenant sur [t-ka.net](http://t-ka.net/blog) :-)). Les
principaux problèmes étant pour moi l'impossibilité de changer l'URL des items
et l'impossibilité d'aggréger plusieurs attributs dans la balise description. Il
est à noter aussi qu'eZ Publish n'inclut pas l'élément &lt;guid&gt; dans les
flux RSS, ce qui empêche la détection correcte de mises à jour par les lecteurs
RSS. J'avais aussi écrit [un petit *patch* pour pouvoir inclure un feuille de
style XSLT dans les fils RSS](http://issues.ez.no/9097) pour eZ Publish 3.8.x,
mais l'utilisation d'un *layout* et du système de *template* pour créer des fils
RSS rend complètement obsolète le *patch* en question... Et puis j'ai un petit
projet personnel en tête qui devrait utiliser assez intensivement cette
technique, enfin si il se concrétise un jour...

 
Pour en revenir, à cette technique, elle est assez simple à mettre en oeuvre (
*easy* comme toujours ;-)). Il suffit de créer un *layout* spécifique pour le
RSS. Mais qu'est ce qu'un *layout* ? Il s'agit en fait de spécifier quel fichier
est utilisé comme *template* de *pagelayout*. On peut aussi le faire [avec une
règle d'
*override*](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_override_conditions),
mais dans le cas d'un *layout*, il est également possible de spécifier le
&quot;Content-Type&quot; que générera celui-ci. Dans le cas de mes fils RSS, mon
[layout.ini.append.php](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/layout_ini)
contient une section qui ressemble à :

 ``` ini
[rss]
PageLayout=rss_pagelayout.tpl
ContentType=text/xml
```

 
Ces lignes signifient que les pages appelées via l'URL /layout/set/rss/ utiliseront comme *template pagelayout* le fichier design/&lt;mon_design&gt;/templates/rss_pagelayout.tpl et tout cela générera du XML. Le fichier en question est très simple et on retrouve le point central des *pagelayout* traditionnels (si je puis dire...) :

 ``` smarty
<?xml version="1.0" encoding="iso-8859-1"?>
<rss version="2.0">
    <channel>
        <language>fr-FR</language>
        {$module_result.content}
    </channel>
</rss>
```
 
Appeler l'URL /layout/set/rss/ revient à appeler le vue *full* du noeud racine
dans ce *pagelayout*, ce qui donnera probablement des résultats bizarres. Il est
par contre tout à fait possible d'appeler une vue personnalisée (au hasard
rss_full) sur un noeud quelconque (par exemple 119) via l'URL
/layout/set/rss/content/view/rss_full/119. Il reste alors à faire en sorte que
design/&lt;mon_design&gt;/templates/node/view/rss_full.tpl et ses éventuels
*override* génèrent du RSS et le tour est joué ! Pour améliorer les
performances, il vaut mieux rajouter cette vue dans la liste des vues à mettre
en cache dans le paramètre
[CachedViewModes](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/contentsettings/cachedviewmodes)
dans la section
[ContentSettings](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/contentsettings)
dans le
[site.ini.append.php](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini)
des *siteaccess* concernés.

 
Pour aller encore plus loin, on peut enfin utiliser [le traducteur d'URL d'eZ
Publish](http://ez.no/doc/ez_publish/technical_manual/3_8/concepts_and_basics/url_translation#eztoc23773_2_2)
pour donner des adresses plus sympas aux fils voire permettre l'utilisation d'un
node_id en paramètre pour avoir des fils RSS &quot;automatiques&quot;. Par
exemple, le fils RSS des commentaires du billets où je parlais de [l'inclusion
de vidéo de Dailymotion ou de Youtube dans eZ Publish via un custom
tag](/post/inclure-une-video-de-dailymotion-youtube-ou-autre-dans-ez-publish)
est disponible à l'adresse :
`pwet.fr/rss/feed/commentaires/64219`
qui correspond en fait à `pwet.fr/layout/set/rss/content/view/rssco/64219`.
Il ne reste donc plus qu'à adapter les templates pour ajouter les liens vers ces
fils RSS pour les rendre disponibles.
