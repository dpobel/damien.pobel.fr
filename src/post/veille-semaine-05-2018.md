---
title: "Veille de la semaine #5 de 2018"
weeklyTech: true
tags: veille, html, javascript, react, rest, chrome, puppeteer, sécurité, pwa
lang: fr
published: 2018-02-01T11:28:17Z
photos:
    - images/veille_5.jpg
---
* [Deep-copying in JavaScript](https://dassur.ma/things/deep-copy/) (en)&nbsp;: Comment dupliquer un objet en JavaScript ? La question est simple, la réponse l'est beaucoup moins! Utiliser les API du navigateur comme `History`, il fallait déjà y penser. 
* [How to write a HOC (in 3 easy steps)](https://paulgray.net/how-to-write-a-hoc/) (en)&nbsp;: Un explication sur comment écrire un *High Order Component* (une fonction qui génère des composants ici pour React). Un introduction intéressante à une technique vraiment puissante mais attention à ne pas tomber dans [le DRY à tout prix](https://hackernoon.com/this-is-not-the-dry-you-are-looking-for-a316ed3f445f) au risque de coupler des composants qui n'ont pas grand chose en commun.
* [PWAs are coming to iOS 11.3: Cupertino, we have a problem](https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea) (en)&nbsp;: L'API [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) arrive dans Safari (en bêta) ! Excellente nouvelle pour faire des Progressive Web App (PWA) et donc bientôt avoir des application web au niveau des applications natives mais pour le moment il reste quelques problèmes.
* [Quand votre CPU parle trop : la faille Meltdown et ses conséquences](https://blog.octo.com/quand-votre-cpu-parle-trop-la-faille-meltdown-et-ses-consequences/) (fr)&nbsp;: vue d'ensemble sur les failles récentes, Meltdown et Spectre, découvertes au niveau des CPU.
* [Part 2: How to stop me harvesting credit card numbers and passwords from your site](https://hackernoon.com/part-2-how-to-stop-me-harvesting-credit-card-numbers-and-passwords-from-your-site-844f739659b9) (en)&nbsp;: La suite de [How to stop me harvesting credit card numbers and passwords from your site](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5), toujours aussi pertinent et un peu flippant à la fois.
* [Bad Month for the Main Thread](https://daverupert.com/2018/01/bad-month-for-the-main-thread/) (en)&nbsp;: Dans cette revue, la partie sur *All-In-JS* est vraiment intéressante et je suis d'accord avec l'auteur, on a(ura) sans doute besoin de quelque chose qui ressemble à [HTML Imports](https://www.w3.org/TR/html-imports/) que Firefox/Mozilla a malheureusement enterré.
* [Automatic visual diffing with Puppeteer](https://meowni.ca/posts/2017-puppeteer-tests/) (en)&nbsp;: Utilisation de Puppeteer (pilotage de Chrome version *headless*) pour faire des tests automatiser qui comparent des captures d'écran. Expérience intéressante, mais les cas où ce genre de tests est pertinent restent à définir car avoir des tests qui échouent au moindre changement de pixel me paraît un peu lourd à maintenir sur le long terme.
* [Don't Design A Query String You Will One Day Regret](http://www.bizcoder.com/don-t-design-a-query-string-you-will-one-day-regret) (en)&nbsp;: Pourquoi il vaut mieux résister à la tentation d'implémenter un grand nombre de paramètres d'URL (*Query String*) sur une API distante. Finalement, ce n'est que l'adaptation aux API distantes (REST) de principes de design d'API (tout court) où moins de paramètres signifie généralement un code plus simple, performant et maintenable.
* [React and HTML: Beware of the traps](http://blog.theodo.fr/2018/01/react-html-beware-traps/) (en)&nbsp;: Certains ne sont vraiment pas spécifiques à React. Ne pas utiliser de formulaires ou de vrais liens/buttons sont des problèmes malheureusement hyper courants.

Et un peu hors-sujet&nbsp;:

* [Faut-il créer un label « Internet bio » permettant aux services respectueux de faire la différence ?](https://www.nextinpact.com/news/106043-faut-il-creer-label-internet-bio-permettant-aux-services-respectueux-faire-difference.htm) (fr)&nbsp;: Et pourquoi pas tient :)
* [Un logiciel libre de gestion des cultures OpenJardin](https://linuxfr.org/news/un-logiciel-libre-de-gestion-des-cultures-openjardin) (fr)&nbsp;: Un logiciel pour organiser son jardin (rotation des cultures, voisinage, …). Pas encore testé mais la fin de l'hiver arrive, il va falloir bientôt penser au potager.
* [Les deux vitesses de la pensée et le "Bullshitomètre"](https://www.youtube.com/watch?v=eLLIm-GpJh4&list=WL&index=18) (fr)&nbsp;: Excellente vidéo sur le fonctionnement de notre cerveau et comment on peut (essayer) de trier les informations.

(En plus du [flux RSS global](/rss.xml), les billets *veille*
et uniquement ceux là sont listés dans le [flux RSS *veille*](/rss/veille.xml))
