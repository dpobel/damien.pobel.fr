---
title: "Livre : \"High Performances Web Sites\""
tags: performances, dns, ajax, livre, yahoo, http, css, javascript
updated: 2008-10-31T08:46:00.000Z
lang: "fr"
node: "66988"
remoteId: "2dd5b73b59d000b9df0dcc6204cad471"
published: 2008-08-11T00:29:22+02:00
photos:
    - images/couverture-du-livre-high-performances-web-sites.jpg
---
<blockquote>
Only 10-20% of the end user response time is spent downloading the HTML document. The other 80-90% is spent downloading all the components in the page.
</blockquote>


Traduction libre :

<blockquote>
Seulement 10 à 20% du temps de réponse ressenti par l'utilisateur provient du téléchargement du document HTML. Les 80 à 90% restant viennent du téléchargement des autres composantes de la page.
</blockquote>

<figure class="object-left"><a href="/images/couverture-du-livre-high-performances-web-sites.jpg"><img loading="lazy" src="/images/220x/couverture-du-livre-high-performances-web-sites.jpg" alt="Couverture du livre High Performances Web Sites">
</a></figure>


Voila la *Performance Golden Rule* qui sert de base à ce court mais excellent bouquin [High Performances Web Sites](http://oreilly.com/catalog/9780596529307/index.html) de [Steve Souders](http://stevesouders.com/) (employé chez Yahoo!) expliquant 14 règles pour améliorer la rapidité d'affichage d'un site web. En fait ce livre reprend les 14 premières [bonnes pratiques listées par Yahoo!](http://developer.yahoo.com/performance/rules.html) pour améliorer les performances générales d'un site web. Ces points sont applicables à quasiment tous les sites (à part peut être l'utilisation d'un [Content Delivery Network](http://fr.wikipedia.org/wiki/Content_Delivery_Network) qui est hors de porté du commun des mortels…) quelque soit la technologie employée puisqu'il s'agit essentiellement de configuration au niveau du serveur web ou dans la construction des pages.


Ces 14 règles sont les suivantes :

* [Limitez le nombre de requêtes HTTP](http://developer.yahoo.com/performance/rules.html#num_http)
* [Utilisez un *content delivery network*](http://developer.yahoo.com/performance/rules.html#cdn)
* [Ajoutez l'entête *Expires*](http://developer.yahoo.com/performance/rules.html#expires)
* [Compressez avec *gzip*](http://developer.yahoo.com/performance/rules.html#gzip)
* [Placez les feuilles de styles en haut de page](http://developer.yahoo.com/performance/rules.html#css_top)
* [Placez les scripts javascript en bas de page](http://developer.yahoo.com/performance/rules.html#js_bottom)
* [Évitez les expressions CSS](http://developer.yahoo.com/performance/rules.html#css_expressions)
* [Externalisez les feuilles de styles et les scripts Javascript](http://developer.yahoo.com/performance/rules.html#external)
* [Réduisez les résolutions DNS](http://developer.yahoo.com/performance/rules.html#dns_lookups)
* [Réduisez la taille les scripts Javascripts](http://developer.yahoo.com/performance/rules.html#minify)
* [Évitez les redirections](http://developer.yahoo.com/performance/rules.html#redirects)
* [Supprimez les scripts en double](http://developer.yahoo.com/performance/rules.html#js_dupes)
* [Configurez l'entête *ETags*](http://developer.yahoo.com/performance/rules.html#etags)
* [Rendez vos appels AJAX cachables](http://developer.yahoo.com/performance/rules.html#cacheajax)


En plus de ces règles, le livre explique succintement quelques concepts du [protocole HTTP](http://tools.ietf.org/html/rfc2616) liés aux performances et propose une analyse des 10 plus gros sites américains (MSN, Google, Yahoo!, CNN, Wikipedia, MySpace…). Si ces règles sont assez connues (et pour certaines de l'ordre du bon sens), l'intérêt principal du livre réside dans la quantification des gains éventuels ainsi que dans les explications amenant à ces règles sur le fonctionnement des navigateurs sur la construction d'une page, la parallélisation des téléchargements ou le cache DNS.


Bref, il s'agit vraiment d'un très bon livre pour tout développeur ou administrateur où la plupart des recettes sont applicables en quelques minutes seulement pour un résultat immédiat et assez spectaculaire.

