---
title: Cartographie avec les couches Géoportail/IGN et Leaflet
tags:
    - ign
    - cartographie
    - sig
    - javascript
    - performances
    - vtt
lang: fr
---

<figure class="object-center">
    <img src="/images/660x/leaflet-ign-geoportail.jpg" alt="Carte de la descente de
Rosy">
    <figcaption>Carte de [la Descente de
Rosy](http://vtt.revermont.bike/single-tracks/descente-de-rosy/), un [single du
Revermont](http://vtt.revermont.bike/single-tracks/) vraiment sympa :)</figcaption>
</figure>

Comme je le mentionnais dans [mon dernier billet](/post/vtt-revermont), les
cartes sont un élément central dans mon
dernier projet personnel sur [le VTT dans le
Revermont](http://vtt.revermont.bike/) et j'ai cherché (et je cherche encore) à
soigner au maximum cet aspect. J'ai donc choisi d'utiliser les fonds de carte
fournis par l'IGN / Géoportail pour la précision mais je me suis tourné vers
[Leaflet](http://leafletjs.com/) pour l'affichage des cartes, rien de bien
compliqué même si il faut gérer certaines subtilités.

## Pourquoi pas l'API Géoportail&nbsp;?

J'ai parcouru [la
documentation](http://api.ign.fr/tech-docs-js/fr/webmaster/js/integration_js.html),
regardé [quelques exemples](http://api.ign.fr/tech-docs-js/examples/) construits
avec l'API Géoportail et je n'ai vraiment pas été convaincu. Je trouve l'API en
elle-même plutôt compliquée et le résultat final vraiment pas très flatteur
visuellement et ergonomiquement. En plus d'un point de vue performances
*frontend*, l'API Géoportail telle que servie par api.ign.fr n'est pas loin de
la catastrophe, par exemple avec la version *minimale*&nbsp;: 320 Ko de code
JavaScript (en gzip, 1,1 Mo sinon, oui c'est la bien version
**minimale**&nbsp;!), pas d'entête d'expiration, des feuilles de styles non
compressées et non minifiées,&nbsp;... Bref, à moins d'avoir des besoins pointus
couverts uniquement par l'API Géoportail, Leaflet me paraît une bien meilleure
alternative.

## Leaflet et les *layers* IGN

[L'API de Leaflet](http://leafletjs.com/reference.html) est hyper simple et bien
pensée, visuellement le résultat est simple et plutôt sympa, le tout dans 33 Ko
(gzippé et qu'il est facile d'héberger pour faire [toutes les optimisations
nécessaires](/tag/performances)). Bien sûr, Leaflet offre par défaut beaucoup
moins de possibilités mais c'est pas loin d'être suffisant pour mon cas et pour
le reste, il y a pas mal [de plugins](http://leafletjs.com/plugins.html).

Reste donc à afficher les *layers* IGN dans Leaflet. La documentation de l'API
Géoportail propose [un exemple un peu périmé avec Leaflet
0.5](http://api.ign.fr/tech-docs-js/examples/geoportalLeaflet.html) en incluant
la version minimale de l'API (les 320ko de code mentionnés un peu plus haut...)
mais il y a beaucoup plus léger car l'IGN a la bonne idée de diffuser ses layers
[au format WMTS](http://georezo.net/wiki/main/standards/wmts) ce que Leaflet
supporte nativement. Au final en simplifiant un peu le code, ça donne quelque
chose comme&nbsp;:

```javascript
(function (global, L) {
    "use strict";
    var layer;

    function layerUrl(key, layer) {
        return "http://wxs.ign.fr/" + key
            + "/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&"
            + "LAYER=" + layer + "&STYLE=normal&TILEMATRIXSET=PM&"
            + "TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg";
    }

    layer = L.tileLayer(
        layerUrl(
            "MyIGNAPIKey", "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        ),
        {attribution: '&copy; <a href="http://www.ign.fr/">IGN</a>'}
    );

    // there should be element in the DOM with the id "map"
    // and this element should have a width and a height
    // otherwise nothing will be displayed
    L.map('map', {
        layers: [layer],
        zoom: 15,
        center: [46.381661, 5.349518],
        // and maybe some others options see
        // http://leafletjs.com/reference.html#map-options       
    });
})(window, L);
```

[Le résultat est visible en ligne](/page/exemple-leaflet-layer-ign-geoportail)
et il devrait normalement afficher une carte de [mon village
natal](http://vtt.revermont.bike/tags/coligny/) à un niveau de zoom où le fond
de carte est le même que les cartes IGN Top25. C'est d'ailleurs un truc pénible
avec la couche *WMTS-Géoportail - Cartes IGN* (`GEOGRAPHICALGRIDSYSTEMS.MAPS`),
en fonction du niveau de zoom, le rendu est complètement différent. À partir de
15 (comme dans l'exemple), on a le rendu type carte Top25 hyper précis mais à 14
ou en dessous, le rendu s'apparente plus à une vieille carte routière plutôt
laide avec peu de détails. Il est bien sûr possible d'utiliser [d'autres
couches](http://api.ign.fr/tech-docs-js/fr/webmaster/layers.html#Noms_harmoniss_des_ressources_Goportail)
(avec [un sélecteur](http://leafletjs.com/reference.html#control-layers) par
exemple) et notamment [les SCAN
Express](http://professionnels.ign.fr/pyramide-scan-express) qui sont plus
*régulières* en fonction du niveau de zoom, malheureusement elles ne proposent
pas autant de détails que *WMTS-Géoportail - Cartes IGN* (chemins balisés,
points d'intérêt, ...).

## Les clés

Sans surprise, il faut s'enregistrer pour obtenir *une* clé d'API (le
`MyIGNAPIKey` dans l'exemple) et pouvoir utiliser les couches de l'IGN mais à ce
niveau là aussi il y a quelques subtilités. Comme l'indique [la
documentation](http://api.ign.fr/tech-docs-js/fr/developpeur/geodrm.html), il
existe deux types de clé&nbsp;:

* les clés (mal nommées) dites de *développement* que l'on peut obtenir sur
  [api.ign.fr](http://api.ign.fr/);
* les clés liées à une licence d'exploitation dont le prix varie en fonction de
  l'utilisateur (gratuit pour les particuliers) et de l'utilisation que l'ont
peut obtenir sur [professionnels.ign.fr](http://professionnels.ign.fr).

Les clés de *développement* sont en fait dédiés aux tests ou au prototypage. En
d'autres termes, ces clés ne servent qu'à initialement tester l'API avec les
exemples de la documentation ou à prototyper une application très limitée mais
pour tout usage sérieux, il faut une clé (ou des clés) liée à une licence
d'exploitation même pour un environnement de développement d'autant plus que les
clés de développement ne permettent l'accès qu'à une toute petite partie des
couches réellement disponibles&nbsp;!

Dernier point, l'interface pour définir l'URL du site où sera utilisée la clé
liée à une licence d'exploitation
laisse supposer qu'une clé n'est dédiée qu'à un domaine&nbsp;:

<figure class="object-center">
<img src="/images/ui-ign-cle-multi-domaine.png" alt="Interface de modification
d'une clé IGN" style="border: 1px solid #ccc">
    <figcaption>Interface de modification d'une clé IGN</figcaption>
</figure>

En réalité, il est parfaitement possible d'avoir une clé fonctionnant sur
plusieurs domaines en les séparant par une virgule, mieux, il est également
possible d'utiliser des *wildcards* dans ce champs.  Ainsi dans l'exemple de la
capture d'écran ci-dessus, la clé est valide pour `vtt.revermont.bike`, pour
tous les sous-domaines de `vtt.revermont.bike` (que j'utilise pour tester
facilement les évolutions du site) et `local.revermont.bike` (l'adresse que
j'utilise son post de développement). Une clé unique, voila qui simplifie pas
mal de choses (pourvu qu'on ne dépasse pas le quota de transactions).

Finalement, avec quelques compromis et petites astuces, il est assez simple
de mettre en place une cartographie alliant précision, légèreté et performance
 en utilisant les données de l'IGN et le projet Leaflet.
