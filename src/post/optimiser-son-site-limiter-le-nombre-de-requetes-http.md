---
title: "Optimiser son site : limiter le nombre de requêtes HTTP"
tags: html, css, javascript, design, performances, http, yahoo
updated: 2008-08-30T14:41:07.000Z
lang: "fr"
node: "67085"
remoteId: "a79fceabd6d54e9970be6cfce7da9c38"
published: 2008-08-30T15:36:20+02:00
---

Limiter le nombre de requêtes HTTP est la première règle (la plus efficace) pour [l'optimisation d'un site](/post/livre-high-performances-web-sites) bien avant [la configuration de l'entête d'expiration](/post/optimiser-son-site-sous-ubuntu-configurer-l-en-tete-expires) et [la compression gzip des contenus textuels](/post/optimiser-son-site-sous-ubuntu-et-ailleurs-compresser-avec-gzip), mais il peut aussi s'agir de la plus complexe à mettre en place. Si il est assez simple de rassembler les feuilles de style CSS et les fichiers Javascript pour limiter le nombre de téléchargements, le cas des images est un peu plus complexe. On peut appliquer [la technique dite des CSS Sprites](http://www.pompage.net/pompe/sprites/) sur les images utilisées pour la décoration *via* la propriété CSS <code>background</code>
. Cette technique consiste à rassembler les images en un seul fichier et à jouer avec la position pour n'afficher que la zone voulue. En effet un navigateur mettra moins de temps à télécharger 1 fichier que 6 petits fichiers de taille totale équivalente et en plus le fichier réunissant les 6 premiers est généralement plus petit, double bénéfice donc. Au niveau montage, il faut par contre savoir qu'une dimension doit nécessairement être fixée ou au moins *contrôlée* (par exemple le texte contenu est toujours le même), il ne me semble pas possible de remplacer des images qui se répètent sur les axes X et Y à la fois.


J'ai donc expérimenté cela sur ce site dont le design est suffisamment simple. Le design utilise 8 images via la feuille de style, mais 2 restent un peu à part :

* [le logo RSS](extension/pwet2/design/pwet2/images/rss.png) est un PNG 24 bit pour que les arrondis soit vraiment arrondis, il restera donc seul
* [l'image utilisée en fond des citations](extension/pwet2/design/pwet2/images/quote.png) est assez large alors que toutes les autres le sont beaucoup moins ou sont répètées sur l'axe horizontale, elle reste intacte également.


Les 6 images restantes sont à l'origine des GIF, j'en ai profité pour les convertir en PNG pour comparer les tailles des différents agencements, ce qui donne le tableau récapitulatif suivant (les tailles sont en octets) :

<table class="data"><tr><th>Technique</th>
<th>Image(s)</th>
<th>CSS *gzippée*</th>
<th>Total</th>
<th>Ratio</th>
</tr>
<tr><td>6 GIF</td>
<td>1915</td>
<td>3067</td>
<td>4982</td>
<td>100%</td>
</tr>
<tr><td>6 PNG</td>
<td>1754</td>
<td>3067</td>
<td>4822</td>
<td>97%</td>
</tr>
<tr><td>[1 GIF](extension/pwet2/design/pwet2/images/p.gif)</td>
<td>3154</td>
<td>3068</td>
<td>6222</td>
<td>124%</td>
</tr>
<tr><td>[1 PNG](extension/pwet2/design/pwet2/images/p.png)</td>
<td>1379</td>
<td>3068</td>
<td>4447</td>
<td>89%</td>
</tr>

</table>

Je suis très étonné par la taille du GIF rassemblant les 6 images d'origine. Pour le reste, le PNG est légèrement plus efficace presque partout et le CSS Sprites à base de PNG est 11% plus petit que les 6 GIF originaux (et presque autant avec les 6 PNG), j'ai aussi l'impression que l'affichage du site est un peu plus rapide avec ou sans cache navigateur. Il faut quand même noter que cette technique fait légèrement grossir la feuille de style mais comme celle-ci est compressée l'augmentation est plus que faible (1 octet !) et en m'y replongeant j'ai trouvé quelques optimisations qui ont largement compensées cet écart et je n'ai pas encore réellement *minifié* la feuille de style...


Finalement sur ce site rien de très compliqué, la mise en page est très simple, le plus dur étant d'ordonner correctement les images pour ne pas se retrouver avec une belle mosaïque. Pour voir un exemple un peu plus complexe, on peut étudier le montage du site Yahoo.fr par exemple même si il ne s'agit pas non plus de la page la plus complexe du monde...

