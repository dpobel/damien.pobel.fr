---
title: "eZ Publish et l'accessibilité"
tags: accessibilité, cms, ez publish, online editor, template
updated: 2008-10-24T07:26:52.000Z
lang: "fr"
node: "67020"
remoteId: "f66cf1cd27808519e03cf761c913bd80"
published: 2008-08-17T16:06:10+02:00
---

Plusieurs études ont été réalisées cet été sur l'accessibilité du <abbr title="Content Management System">CMS</abbr> [eZ Publish](/tag/ez-publish) :

* [Comparatif de l'accessibilité des CMS par Temesis](http://blog.temesis.com/2008/07/10/331-rmll-cms-accessibilite-suite) accessible via [un compte Opquast](http://mon.opquast.com/)
* [Audit d'accessibilité de l'interface d'administration du CMS eZ Publish 4.0](http://freemi.fr/ez_publish/backoffice_accessibilite.html)
* [Étude sur l'accessibilité des contenus générés par les éditeurs WYSIWYG du CMS eZ publish 4.0](http://freemi.fr/ez_publish/wysiwyg_accessibilite_ez.html)

Je passe rapidement sur le premier qui pour moi a une valeur toute relative quand on parle d'eZ Publish (et même de la plupart des autres CMS d'ailleurs) puisque l'étude se penche sur les *templates* par défaut. Mais qui utilise les *templates* par défaut d'eZ Publish ?


Les deux suivantes ont été réalisées par [Rémi Farrot](http://freemi.fr/) et sont déjà nettement plus intéressantes. La première au sujet de l'accessibilité du *backoffice* montre que celui ci n'est pas si mal de ce point de vue même si quelques points sont améliorables. Le plus gros problème dans le *backoffice* est semble t il posé par les menus contextuels sur les icônes (fonctionnalité ultra pratique cela dit). Parmi les autres points faibles relevés, on trouve aussi l'absence de l'attribut &quot;for&quot; sur les balises label, je viens de créer [un rapport de bug sur ce point](http://issues.ez.no/13503), c'est tellement pratique de cliquer sur les labels pour avoir le focus sur le champs associé !


La seconde étude de Rémi Farrot porte sur le code produit par les éditeurs <abbr title="What You See Is What You Get">WYSIWYG</abbr>  disponibles avec eZ Publish. La situation est nettement moins bonne dans ce registre, [Online Editor 4.x](http://ez.no/doc/extensions/online_editor/4_x) comme [le nouvel éditeur basé sur TinyMCE](/post/the-new-online-editor-for-ez-publish-beta) sont plutôt mauvais. Malgré tout, beaucoup de points peuvent être corrigés avec une configuration adéquate et encore plus avec le nouvel éditeur. Ce sera peut être l'objet d'un prochain billet...

