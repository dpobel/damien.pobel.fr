---
title: "Veille de la semaine #2 de 2018"
weeklyTech: true
tags: veille, conférence, php, code, bash, shell, csp, npm, sécurité, performances, react, chrome, web, javascript
lang: fr
published: 2018-01-11T11:12:09Z
photos:
    - images/veille_2.jpg
---
* [Comment différer l'exécution d'un script ?](https://borisschapira.com/2017/12/comment-differer-l-execution-d-un-script/) (fr)&nbsp;: Plusieurs techniques complémentaires pour éviter qu'une balise `<script>` ne bloque le rendu d'une page.
* [Chrome is turning into the new Internet Explorer 6](https://www.theverge.com/2018/1/4/16805216/google-chrome-only-sites-internet-explorer-6-web-standards) (en)&nbsp;: avec une différence majeure quand même: profitant de sa position dominante, Microsoft ne faisait que (lentement) corrigé les bugs de sécurité
* [How to greatly improve your React app performance](https://medium.com/myheritage-engineering/how-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6) (en)&nbsp;: Pour résumer&nbsp;: utiliser `shouldComponentUpdate`, contrôler les changements apportés au DOM et éviter les appels infinis aux *callbacks* avec *debounce*/*throttle*
* [Improve User Experience with Proper Webfont Loading](https://calendar.perfplanet.com/2017/improve-ux-proper-webfont-loading/) (en)&nbsp;: Trois stratégies pour améliorer le chargement des polices web (*web fonts*). Deux d'entre elles consistent tout de même à ne pas utiliser la police sur la première page chargée par l'utilisateur. On peut donc se demander si dans ce cas là, la police est tellement indispensable…
* [I’m harvesting credit card numbers and passwords from your site. Here’s how.](https://medium.com/@david.gilbertson/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) (en)&nbsp;: Une courte fiction (enfin espérons) sur comment il serait relativement facile de voler des informations confidentielles (noms d'utilisateur, mots de passe, numéros de carte bancaire, …) &nbsp;sur une grande quantité de sites web en partant d'un paquet npm. Une solution partielle pour limiter ce risque est de mettre en place une [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). Reste que la seule vraie solution est de vérifier de quoi on dépend ou de ne dépendre de rien au moins sur les parties sensibles.
* [Ten Things I Wish I’d Known About bash](https://zwischenzugs.com/2018/01/06/ten-things-i-wish-id-known-about-bash/) (en)&nbsp;: 10 trucs bien utiles avec bash. Petite subtilité supplémentaire sur le point 9 pour les utilisateurs de MacOS, l'application Terminal ne lance que des shells de login, résultat `~/.bashrc` n'est jamais lu par défaut.
* [This is not the DRY you are looking for](https://medium.com/@nicolopigna/this-is-not-the-dry-you-are-looking-for-a316ed3f445f) (en)&nbsp;: Le principe DRY (Do not Repeat Yourself) est souvent mal interprété et surtout appliqué de manière dogmatique ce qui pousse à grouper/coupler plusieurs bouts de code qui n'ont rien à voir. Cet article parle de code en PHP mais s'applique en fait à n'importe quel langage.
* [Le Programme du PHP Tour 2018 à Montpellier](https://event.afup.org/phptourmontpellier2018/programme/) (fr)&nbsp;: vraiment un chouette programme!

(En plus du [flux RSS global](/rss.xml), les billets *veille*
et uniquement ceux là sont listés dans le [flux RSS *veille*](/rss/veille.xml))
