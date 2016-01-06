---
title: "Des erreurs fréquentes avec eZ publish"
tags: ez publish, hébergement, truc, apache, pense bête
updated: 2006-11-14T22:05:48.000Z
lang: "fr"
node: "61985"
remoteId: "4a057d93662b6f9a983a379dfb1bd9e8"
published: 2006-10-16T23:58:14+02:00
---
 
Durant mes divers développements avec eZ publish, il m'est souvent arrivé de commettre des erreurs ou des oublis et en consultant les forums, je repère fréquemment des erreurs que j'ai moi aussi commises.

  
## Dépassement du temps d'éxécution à l'installation

 
Pour moi ce problème venait de la non activation du module [PHP domxml](http://fr2.php.net/domxml) ce qui a pour résultat d'effectuer l'ensemble des opérations sur les fichiers XML avec du code entièrement écrit en PHP plutôt que par l'API compilé dans l'interprèteur PHP ce qui est évidemment beaucoup moins efficace. L'erreur lors de l'installation ressemble à la suivante :

 ``` 
Fatal error: Maximum execution time of 60 seconds exceeded in foobar.php on line 300
Fatal error: eZ publish did not finish its request

The execution of eZ publish was abruptly ended, the debug output is present below.
```

 
La solution est simple, il suffit d'activer l'extension domxml et de redémarrer le serveur web (Apache dans mon cas). Si cela n'est pas possible, l'allongement du paramètre [max_execution_time](http://fr2.php.net/manual/fr/ref.info.php#ini.max-execution-time) est une autre solution qui peut fonctionner.

   
## En réactivant les différents caches, le site ne fonctionne plus

 
Pour se simplifier la vie lors du développement, il est possible de désactiver les caches avec les directives suivantes dans le [site.ini.append.php](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini) correspondant au *siteaccess* :

 ``` ini
[ContentSettings]
ViewCaching=disabled

[TemplateSettings]
NodeTreeCaching=disabled
TemplateCompile=disabled
ProcessCaching=disabled
TemplateCache=disabled
```

 
Avec cette configuration, il est seulement nécessaire de vider les caches lors de l'ajout d'un nouvel *override* ou d'un nouveau *template* inclu avec [include](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_functions/miscellaneous/include). Par contre, cette configuration a comme effet de bord (en plus d'occasionner des performances médiocres) de rendre disponible la variable *$node* dans le *pagelayout.tpl*[ce qui ne devrait pas arriver](http://ez.no/doc/ez_publish/technical_manual/3_8/templates/the_pagelayout/variables_in_pagelayout). Si on utilise cette variable dans le *pagelayout.tpl* tout fonctionne jusqu'à ce que les caches soient réactivés. Ce bug devrait être corrigé [dans le prochain eZ publish 3.9](http://pubsvn.ez.no/websvn/filedetails.php?repname=nextgen&amp;path=/trunk/doc/features/3.9/no_more_node_in_pagelayout.txt&amp;rev=0&amp;sc=1).

   
## Un *fetch* correct syntaxiquement ne retourne rien

 
Le langage de *template* d'eZ publish est assez simple mais vu le nombre d'accolades, parenthèses et virgules nécessaires, il arrive fréquemment de faire des erreurs de syntaxe. Ces erreurs peuvent être facilement découvertes en activant [le mode debug](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/configuration_files/site_ini/templatesettings/debug) qui ajoute un pavé d'nformations très utiles en bas de chaque page. Mais il arrive parfois qu'un [fetch](http://ez.no/doc/ez_publish/technical_manual/3_8/reference/template_fetch_functions), tout à fait correct, ne renvoie rien alors qu'il devrait. En fait le problème peut venir d'un soucis dans les permissions accordées à l'utilisateur utilisant le *siteaccess* car *fetch* vérifie les permissions (à moins d'utiliser le paramètre limitations).

 