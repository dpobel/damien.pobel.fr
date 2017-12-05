---
title: "Inclure une vidéo de DailyMotion, Youtube ou autre dans eZ publish"
tags: online editor, ez publish, truc, vidéo, blog, web
updated: 2007-03-06T17:09:41.000Z
lang: "fr"
node: "64219"
remoteId: "6aa1fd03ffc92cb054a7d95bf65549ad"
published: 2007-02-03T02:52:15+01:00
---
 
Tout à l'heure en rédigeant (c'est un bien grand mot) [It's not too late](/post/it-s-not-too-late) je me suis trouvé face à un problème courant dans le web actuel : inclure une vidéo avec son lecteur flash fournie par un service tier. Après une courte réflexion, j'ai trouvé deux solutions à ce problème :

* Créer une classe &quot;Video externe&quot; regroupant les informations nécessaires et utiliser la possibilité [d'inclure des objets eZ Publish dans un bloc XML](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/datatypes/xml_block/object_embedding) selon différentes vues avec la balise &lt;embed/&gt;
* Utiliser un [custom tag](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/datatypes/xml_block/custom_tags) avec les différents attributs nécessaires pour inclure la vidéo.
 
 
J'ai finalement choisi la deuxième solution pour deux raisons :

* Seuls 3 paramètres sont nécessaires à l'affichage du lecteur de vidéo (URL, largeur, hauteur), il est donc peu contraignant de remplir le formulaire d'insertion d'un custom tag.
* La première solution oblige à d'abord créer l'objet &quot;Video externe&quot; avant de pouvoir l'inclure dans le bloc XML à l'aide de Online Editor. Pas très pratique. Il serait peut être possible de créer automatiquement un objet de ce type directement dans l'éditeur comme on peut le faire pour un document à télécharger ou une image en détectant une adresse http mais cela me paraît trop complexe pour mon utilisation ponctuelle. **KISS!** (Keep It Simple Stupid)
 

La création d'un custom tag est assez simple. Je l'ai appelé *dailymotion* car il est à la base prévu pour inclure une video de [ce service](http://www.dailymotion.com), mais cela marche aussi pour [Youtube](http://www.youtube.com/) et certainement pour les autres... Pour cela, il suffit de modifier le fichier /settings/override/content.ini;append.php comme suit :

 ``` ini
[CustomTagSettings]
AvailableCustomTags[]=dailymotion
IsInline[dailymotion]=true
```

 
Il faut ensuite créer le *template* qui affichera le custom tag. Celui ci doit se nommer comme le tag et se trouver dans template/content/view/datatype/ezxmltags dans un des designs utilisés par le site. Dans ce template, la variable $content stocke le contenu du custom tag et les différents attributs sont accessibles par des variables du même nom. Mon fichier template/content/view/datatype/ezxmltags/dailymotion.tpl ressemble à :

 ``` smarty
<div class="video">
    <object width="{$width}" height="{$height}" type="application/x-shockwave-flash" data="{$content}">
        <param name="movie" value="{$content}"></param>
        <param name="allowfullscreen" value="true"></param>
    </object>
</div>
```

 
Pour que ce nouveau template soit pris en compte, il faut vider le cache, il n'est pas nécessaire de vider tous les caches mais seulement ceux liés aux overrides de template. Ce qui peut se faire avec le script ezcache.php avec la ligne suivante (à adapter selon votre configuration...) à la racine du site eZ Publish :

 ``` bash
$ php4 bin/php/ezcache.php -s plain_site_user --clear-id=template-override
```

 
Comme on peut le voir dans le template, mon custom tag *dailymotion* attend donc comme attributs la hauteur (height) et la largeur (width) du lecteur. Dans Online Editor, il faut donc remplir le formulaire comme ci-dessous :

 <figure class="object-center">![Custom tag dailymotion](/images//custom-tag-dailymotion.png)
</figure>

 
Et au final, on obtient :

 
<div class="video">
	<object width="400" height="342" type="application/x-shockwave-flash" data="https://www.dailymotion.com/swf/2v5NoyiC68nSC4tMV">
		<param name="movie" value="https://www.dailymotion.com/swf/2v5NoyiC68nSC4tMV"></param>
		<param name="allowfullscreen" value="true"></param>
	</object>
</div>

 
Easy ;-)

