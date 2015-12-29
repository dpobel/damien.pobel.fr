---
title: "Exemple d'utilisation de Leaflet avec une couche IGN / Géoportail"
lang: fr
noMenu: true
updated: 2014-11-12T23:57:39+01:00
---

# Exemple d'utilisation de Leaflet avec une couche IGN / Géoportail

Exemple d'utilisation d'une couche WMTS de l'IGN dans une carte gérée par
Leaflet comme expliquée dans le billet [Cartographie avec les couches Géoportail/IGN et
Leaflet](/post/cartographie-api-geoportail-ign-leaflet).

<div id="map"></div>

<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css">
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
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
        return "http://wxs.ign.fr/" + key
            + "/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&"
            + "LAYER=" + layer + "&STYLE=normal&TILEMATRIXSET=PM&"
            + "TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fjpeg";
    }

    layer = L.tileLayer(
        layerUrl(
            "uohuygcpn5772t43fh8350g3", "GEOGRAPHICALGRIDSYSTEMS.MAPS"
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
