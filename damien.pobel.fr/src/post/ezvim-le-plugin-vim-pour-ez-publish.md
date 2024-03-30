---
title: "eZVim, le plugin vim pour eZ Publish"
tags: geek, ez publish, licence, vim, python, ezvim, logiciels libres
lang: "fr"
node: "65053"
remoteId: "3cf94b3f11299f93237f53a00b212ee3"
published: 2007-04-04T23:54:51+02:00
updated: 2016-02-10 22:54
---
 
Mon projet de plugin [Vim](/tag/vim/) pour [eZ Publish](/tag/ez-publish/) avance
doucement mais surement. Il faut dire qu'à la base je connais peu le langage de
script de Vim et [à peine plus Python](/post/vers-un-plugin-ezvim), je bute
parfois sur des choses toutes bêtes, mais c'est comme cela qu'on apprend… Mais
après quelques soirées, je suis assez content, car la partie *Classes View* qui
interface l'extension SmileClasses (la même utilisée par [le plugin pour
Eclipse](http://smile-ez-plugin.sourceforge.net/)) est en très bonne voie. Une
image vaut mieux qu'un long discours&nbsp;:

<figure class="object-center"><a href="/images/premiere-version-du-classes-view-pour-vim.png"><img loading="lazy" src="/images/660x/premiere-version-du-classes-view-pour-vim.png" alt="Première version du Classes View pour Vim">
</a></figure>

On voit les 4 groupes de classes, *Content* et *Users* sont *dépliés* et, dans
*Content,* la classe *Page* est elle aussi *dépliée*. Pour le moment,
l'affichage est géré par les raccourcis classiques de [Vim sur les
*fold*](http://vimdoc.sourceforge.net/htmldoc/usr_28.html).

 
Ce qu'il manque maintenant, c'est un peu de coloration syntaxique pour y voir
plus clair et quelques variables/paramètres pour la configuration (adresse du
site, largeur de la barre verticale,…). J'espère pouvoir aussi ajouter des
raccourcis pour ouvrir un navigateur directement sur les interfaces de
visualisation, d'éditions ou de documentation des différents éléments…

 
Ne cherchez pas de lien pour télécharger ce plugin, en l'état, il n'est pas
encore tout à fait utilisable, il y a quelques bidouilles à faire pour
l'utiliser mais ça devrait arriver rapidement et très probablement sous licence
GPL.
