---
title: "Exemple d'utilisation de Leaflet avec une couche IGN / Géoportail"
lang: "fr"
noMenu: "true"
updated: 2014-11-12T22:57:39.000Z
---

# Exemple d'utilisation de Leaflet avec une couche IGN / Géoportail

Exemple d'utilisation d'une couche WMTS de l'IGN dans une carte gérée par
Leaflet comme expliquée dans le billet [Cartographie avec les couches Géoportail/IGN et
Leaflet](/post/cartographie-api-geoportail-ign-leaflet).

<div id="map"></div>
<link rel="stylesheet" href="https://unpkg.com/leaflet@0.7.3/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@0.7.3/dist/leaflet.js"></script>
<style>
#map {
    width: 100%;
    height: 350px;
}
</style>

<script>
(function (global, L) {
    "use strict";
    var layer;

    function layerUrl(key, layer) {
        return "https://wxs.ign.fr/" + key
            + "/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&"
            + "LAYER=" + layer + "&STYLE=normal&TILEMATRIXSET=PM&"
            + "TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg";
    }

    layer = L.tileLayer(
        layerUrl(
            "edg4e42kavupobo7kvcrrr09", "GEOGRAPHICALGRIDSYSTEMS.MAPS"
        ),
        {attribution: '&copy; <a href="http://www.ign.fr/">IGN</a>'}
    );

    L.map('map', {
        layers: [layer],
        zoom: 15,
        center: [46.383661, 5.349518],
    });
})(window, L);
</script>
