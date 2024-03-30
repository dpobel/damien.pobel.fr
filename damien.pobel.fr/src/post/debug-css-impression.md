---
title: "Débuguer les styles d'impression"
tags: css, truc, pense bête, firefox, chrome, edge
lang: fr
published: 2021-01-08 22:53
photos:
    - images/firefox-devtools-media-print.png
---

Petite tâche du jour, faire en sorte qu'une page s'imprime correctement. Rien de
bien méchant mais après 20 aperçus avant impression, il est plus que temps de
trouver comment afficher cette fichue page directement avec les styles
d'impression 😀, c'est quand même nettement plus confortable pour itérer
facilement et inspecter la page avec les outils de développement (_devtools_)
pour trouver sur quel fichu élément se trouve cette bordure.

## Chrome

Pour Chrome, [la manipulation est
documentée](https://developers.google.com/web/tools/chrome-devtools/css/print-preview).
Pour faire simple (et en français), en étant dans les outils de développement,
il suffit d'utiliser le raccourcis `Control+Shift+P` (ou `Command+Shift+P` avec
un Mac), de chercher _rendering_ dans la liste qui s'affiche et de valider. Ceci
devrait faire apparaître un onglet _Rendering_ à côté de la console dans lequel
il est possible de forcer `print` comme _media type_ :

<figure class="object-centered bordered">
    <a href="/images/chrome-devtools-media-print.png"><img loading="lazy" src="/images/660x/chrome-devtools-media-print.png" alt="TODO"></a>
</figure>

Et voila, la page s'affiche quasiment comme elle sera imprimée et en plus le
réglage est persistant même après l'actualisation de la page.

À noter que cette opération est aussi possible dans
Microsoft Edge, seule différence le nom de l'onglet est traduit en _Rendu_ (mais
il faut toujours chercher _rendering_).

## Firefox

Pour Firefox, je n'ai pas trouvé la documentation en mais en fouillant un peu
dans l'interface, on peut trouver dans l'onglet _Inspecteur_ une petite icône
qui ressemble à un document et qui, d'après l'info-bulle, permet
d'activer _la simulation des règles media pour l'impression de la page_ :

<figure class="object-centered bordered">
    <a href="/images/firefox-devtools-media-print.png"><img loading="lazy" src="/images/660x/firefox-devtools-media-print.png" alt="TODO"></a>
</figure>

Bien plus simple qu'avec Chrome et là encore, le réglage persiste après
l'actualisation.

Dans les 2 cas, les styles d'impression sont bien appliqués mais pour tester
complètement l'impression, il faudra quand même utiliser l'aperçu pour
notamment vérifier [les marges de la
page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page) ou [les éventuels
sauts de pages](https://developer.mozilla.org/en-US/docs/Web/CSS/break-after).
