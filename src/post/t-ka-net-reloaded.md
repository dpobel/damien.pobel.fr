---
title: "t-ka.net reloaded !"
tags: solr, ez publish, cherry, ez find
lang: "fr"
node: "69033"
remoteId: "ed8a028a62e407d2c8ec2817f9933456"
published: 2011-02-26T12:33:33+01:00
---
<figure class="object-center"><a href="http://t-ka.net"><img src="/images/660x/copie-d-ecran-t-ka-net.jpg" alt="Copie d'écran t-ka.net">
</a></figure>


Après un peu de travail, voici donc [le nouveau t-ka.net](http://t-ka.net)... Bye bye, le très buggé [eZ Publish](/tag/ez-publish) 4.0.0 et bienvenue à deux nouveaux *siteaccess* sur la même instance eZ Publish 4.4 qui sert également ce blog. Ce sera toujours ça de moins à maintenir et à migrer [lors de la sortie prochaine d'eZ Publish 4.5](http://share.ez.no/blogs/ez/ez-publish-community-project-matterhorn-4.5-beta-1).


Techniquement parlant, la transformation d'une instance eZ Publish monosite en eZ Publish multisite était une tâche intéressante. Outre une modification de l'arborescence, il m'a fallu par exemple créer une extension pour regrouper les fonctionnalités communes entre pwet.fr et t-ka.net (flux RSS, commentaires, publication différée...). J'ai aussi mis en place une configuration plutôt inhabituelle pour séparer les médiathèques sur les deux sites :

```ini
[NodeSettings]
MediaRootNode=69023

[RelationAssignmentSettings]
ClassSpecificAssignment[]
ClassSpecificAssignment[]=image;k_vm_fr/media
ClassSpecificAssignment[]=video;k_vm_fr/media
ClassSpecificAssignment[]=file;k_vm_fr/media
```

Il manque encore pas mal de petites choses notamment un moteur de recherche, j'ai dans l'idée d'intégrer Solr/eZ Find sur tous mes sites eZ Publish mais ce sera pour un peu plus tard...

