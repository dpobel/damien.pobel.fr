---
title: "Chouette, SNCF TER Mobile est un lecteur PDF"
tags: sncf, ter, mobile, ux, android, ergonomie, humeurs
description: Exemple de problèmes récurrents rencontrés avec l'application SNCF TER Mobile sur Android.
lang: "fr"
published: 2015-12-23T22:23:57+01:00
---

La SNCF produit une application mobile à destination des usagers des <acronym
title="Train Express Régional">TER</acronym> sobrement appelé [SNCF TER
Mobile](https://play.google.com/store/apps/details?id=com.ter.androidapp&hl=fr).
Il y a quelques années j'avais même écrit un bon commentaire avec une note de 4
sur 5 sur le Google Play Store au sujet de cette application:

> Très agréablement surpris par cette nouvelle app! Manque juste un widget pour
> avoir les prochains trains sur une recherche d'itinéraire au lieu de
> uniquement les départs/arrivées dans une gare!

Le widget est toujours manquant mais avec le recul, je me demande bien ce qui me
passait par la tête ce jour là ou alors l'application a radicalement changé.
Aujourd'hui, j'ai plus envie de dire que c'est une usine à bug, qu'elle fournit
un service de piètre qualité et que l'expérience utilisateur est globalement mauvaise. Par
exemple, en appuyant sur le widget listant les trains d'une gare, l'application
plante 3 fois sur 4 sur mon Google Nexus 4 à jour (on peut pas dire que ce soit
une configuration très exotique...).

Aujourd'hui, par chance, l'application n'a pas (trop)
planté, j'ai donc été capable de prendre quelques captures d'écran et je peux
donc illustrer ma mauvaise expérience récurrente en cas de perturbations.

Aujourd'hui donc, comme presque tous les jours, je suis parti de chez moi à 7h37
et je suis arrivé en gare à 7h43 pour prendre mon train à 7h45. Jusque là tout
va bien, sauf que 10 mètres avant d'arriver sur le quai je reçois cette
notification:

<img src="/images/660x/notification-retard-ter.png" title="Pas très informative cette notification" alt="Notification dans l'application SNCF TER Mobile">

**Premier raté&nbsp;:** Le texte de la notification est tronqué avant que
l'information qui m'intéresse (retard ou suppression) puisse être affichée.
Android sait pourtant faire des notifications interactives [depuis la version 4.1 sortie en
2012](https://developer.android.com/about/versions/android-4.1.html#UI). La
notification permet de lancer l'application qui affiche alors&nbsp;:

<img src="/images/330x/application-ter-mobile.png" alt="Application TER Mobile" title="Euh je voulais les informations d'un train">

**Deuxième raté&nbsp;:** l'application m'affiche sa page d'accueil... À la base
j'étais intéressé par mon train, bon je vais me
débrouillé. Au passage, je suis un utilisateur régulier, j'ai enregistré les 2
ou 3 gares qui m'intéressent. Il serait sans doute judicieux de les lister
directement sur cet écran, il y a de très fortes chances que ma recherche porte
sur ces gares, non&nbsp;?

Il se trouve qu'à ce moment là le train est annoncé avec 15 minutes de retard,
c'est vraiment *gentil* de la part de la SNCF de m'annoncer **2 minutes avant
l'heure d'arrivée normale** que le train aura finalement 15 minutes de retard. C'est
d'autant plus stupide que ma gare est le deuxième arrêt de la ligne, si le
train a du retard au départ, il n'aura pas le temps de combler ce retard.

Un peu plus tard, je reçois une nouvelle notification qui cette fois m'emmène
sur l'écran suivant&nbsp;:

<img src="/images/330x/application-ter-mobile-info-train.png" alt="Application TER Mobile information sur un train" title="Toujours pas le droit à une information complète">


**Troisième raté&nbsp;:** le message est encore tronqué, il semble décidément
compliqué d'afficher une phrase de plus de 10 mots dans cette application! En
utilisant "Voir" on passe à l'écran suivant&nbsp;:

<img src="/images/330x/application-ter-mobile-info-train-encore.png" alt="Application TER Mobile continuer à être informé" title="Je suppose que oui ?">

On progresse, mais je suis un peu dubitatif sur la question. Mais elle s'affiche
en entier, on peut pas tout avoir dans le vie... Je me demande ce qu'il se passe
si je dis "Non" alors que j'ai fait "Voir" juste avant&nbsp;? Mais finalement,
*miracle* le retard de mon train s'affiche&nbsp;!

<img src="/images/330x/application-ter-mobile-train-retard.png" alt="Application TER Mobile train en retard" title="Application TER Mobile train en retard">

Là encore, l'écran me laisse dubitatif, on peut y lire la phrase suivante&nbsp;:

> Les horaires proposés tiennent compte des perturbations

Pourtant, l'horaire affiché pour ma gare (St-Paul-de-Varax) est l'heure normale
(7h44), chez moi 7h44 + 25 minutes de retard ça fait plutôt 8h09...

Bon voila un court aperçu des bugs et des manques récurrents de cette application. Et à
côté de ça, dans les nouveautés de la dernière version on peut lire&nbsp;:
*Visualisation des PDF dans Ter Mobile*... Dis Père Noël SNCF, je peux avoir une
application qui donne les retards des trains maintenant qu'elle sait afficher les
PDF&nbsp;?
