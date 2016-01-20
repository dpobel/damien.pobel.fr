---
title: "Faire une présentation avec l'extension Firefox Fullerscreen"
tags: xhtml, ez publish, mozilla, vim, css
updated: 2007-08-20T07:26:26.000Z
lang: "fr"
node: "65817"
remoteId: "c45e04d48e1e899974ee78b8f7129258"
published: 2007-07-01T23:12:10+02:00
---
 
À la fin de la semaine, je dois faire une présentation dans le cadre professionnel sur une partie de mon travail autour d'[eZ Publish](/tag/ez-publish). Mon contenu est prêt, il me reste donc à choisir les outils que je vais utiliser pour créer mes *slides*. Je ne suis clairement pas un fan des outils *a la* OpenOffice Impress ou Powerpoint. J'ai plutôt cette vieille habitude (qui semble bizarre de nos jours) de vouloir taper mes textes quelque soit leur sortie final avec [mon éditeur de texte préféré](/post/quelques-trucs-avec-vim-1).

 
Suivant régulièrement le [Glazblog](http://glazman.org/weblog/), je connais l'extension [Fullerscreen](https://addons.mozilla.org/fr/firefox/addon/4650) mais je n'avais jamais pris le temps de l'essayer. Je l'ai donc installée, j'ai regardé [la démonstration](http://disruptive-innovations.com/zoo/fullerscreen/samples/projection-test.html) et je me suis mis à faire ma présentation en XHTML. C'est du XHTML très simple puisque la plupart des *slides* se résument quelques titres et sous-titres, quelques listes et des paragraphes et on bénéficie de toutes les facilités de mises en page des CSS surtout qu'on a pas à se soucier de navigateurs un peu en retard sur ce point...

 
Finalement, le seul point un peu difficile pour moi a été l'insertion d'un numéro de page sur chaque slide. Au départ, je voulais utiliser [les compteurs en CSS](http://www.w3.org/TR/CSS21/generate.html#counters), mais il semble que ça ne puisse pas marcher puisque l'extension modifie la propriété display de chaque div servant de *slide* à none ce qui fait qu'en mode projection, le compteur reste constamment à un. J'ai donc été obligé d'insérer une petite fonction javascript comptant le nombre de div servant à l'insertion du compteur. À mon avis, il serait intéressant que cette fonctionnalité soit ajouter directement dans l'extension à moins qu'il existe déjà un moyen que je n'ai pas trouvé.

 
Si ça intéresse quelqu'un je met à disposition un modèle de présentation assez basique très inspiré de l'ancien style du site [eZ.no](http://ez.no) encore utilisé sur [projects.ez.no](http://projects.ez.no/) :

 * [Archive contenant le fichier HTML et les images](/files/Modele_Presentation.tar.gz)
 * [Démonstration en ligne](http://vrac.pwet.fr/presentation_fullerscreen/modele.htm) à utiliser une fois l'extension Fullerscreen installée (F11)
 


<figure class="object-center"><a href="/images/des-questions.png">![Des questions ?](/images/660x/des-questions.png)
</a></figure>




