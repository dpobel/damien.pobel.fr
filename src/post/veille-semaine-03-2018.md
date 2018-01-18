---
title: "Veille semaine #3 2018"
tags: veille, sécurité, composer, php, architecture, microservice, cqrs, javascript, performances, react, redux, dns, symfony, conférence, code, bash, shell, csp, npm, chrome, web
lang: fr
published: 2018-01-18T11:12:10Z
---
* [Comment différer l'exécution d'un script ?](https://borisschapira.com//2017/12/comment-differer-l-execution-d-un-script/) (fr)&nbsp;: Plusieurs techniques complémentaires pour éviter qu'une balise `&lt;script&gt;` ne bloque le rendu d'une page.
* [Chrome is turning into the new Internet Explorer 6](https://www.theverge.com/2018/1/4/16805216/google-chrome-only-sites-internet-explorer-6-web-standards) (en)&nbsp;: avec une différence majeure quand même: profitant de sa position dominante, Microsoft ne faisait que (lentement) corrigé les bugs de sécurité
* [How to greatly improve your React app performance](https://medium.com/myheritage-engineering/how-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6) (en)&nbsp;: Pour résumer&nbsp;: utiliser `shouldComponentUpdate`, contrôler les changements apportés au DOM et éviter les appels infinis aux *callbacks* avec *debounce*/*throttle*
* [Improve User Experience with Proper Webfont Loading](https://calendar.perfplanet.com/2017/improve-ux-proper-webfont-loading/) (en)&nbsp;: Trois stratégies pour améliorer le chargement des polices web (*web fonts*). Deux d'entre elles consistent tout de même à ne pas utiliser la police sur la première page chargée par l'utilisateur. On peut donc se demander si dans ce cas là, la police est tellement indispensable...
* [I’m harvesting credit card numbers and passwords from your site. Here’s how.](https://medium.com/@david.gilbertson/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) (en)&nbsp;: Une courte fiction (enfin espérons) sur comment il serait relativement facile de voler des informations confidentielles (noms d'utilisateur, mots de passe, numéros de carte bancaire, ...) &nbsp;sur une grande quantité de sites web en partant d'un paquet npm. Une solution partielle pour limiter ce risque est de mettre en place une [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). Reste que la seule vraie solution est de vérifier de quoi on dépend ou de ne dépendre de rien au moins sur les parties sensibles.
* [Ten Things I Wish I’d Known About bash](https://zwischenzugs.com/2018/01/06/ten-things-i-wish-id-known-about-bash/) (en)&nbsp;: 10 trucs bien utiles avec bash. Petite subtilité supplémentaire sur le point 9 pour les utilisateurs de MacOS, l'application Terminal ne lance que des shells de login, résultat ~/.bashrc n'est jamais lu par défaut.
* [This is not the DRY you are looking for](https://medium.com/@nicolopigna/this-is-not-the-dry-you-are-looking-for-a316ed3f445f) (en)&nbsp;: Le principe DRY (Do not Repeat Yourself) est souvent mal interprété et surtout appliqué de manière dogmatique ce qui pousse à grouper/coupler plusieurs bouts de code qui n'ont rien à voir. Cet article parle de code en PHP mais s'applique en fait à n'importe quel langage.
* [Le Programme du PHP Tour 2018 à Montpellier](https://event.afup.org/php-tour-montpellier-2018/programme/) (fr)&nbsp;: vraiment un chouette programme!
* [17 Tips for Using Composer Efficiently](https://blog.martinhujer.cz/17-tips-for-using-composer-efficiently/) (en)&nbsp;: En fait 20 trucs intéressants avec composer. La parallèlisation des installations avec [le plugin prestissimo](https://github.com/hirak/prestissimo) mérite d'être testé.
* [The end of Silex](http://symfony.com/blog/the-end-of-silex) (en)&nbsp;: la fin de vie (maintenance) de Silex est prévu pour juin 2018.
* [PHP et les résolveurs DNS](https://jolicode.com/blog/php-et-les-resolveurs-dns) (fr)&nbsp;: où comment un DNS lent peut nuire aux performances d'une application (PHP dans ce cas).
* [React, Redux and JavaScript Architecture](https://jrsinclair.com/articles/2018/react-redux-javascript-architecture/) (en)&nbsp;: Une très bonne introduction à React et Redux avec surtout des réponses à *pourquoi* ces choix et de bonnes explications sur les intérêts de ces 2 technologies.
* [JavaScript Start-up Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/) (en)&nbsp;: Un article sur le triple coût de JavaScript : le téléchargement, l'analyse / la compilation et l’exécution
* [Simple CQRS - reduce coupling, allow the model(s) to evolve](https://matthiasnoback.nl/2018/01/simple-cqrs-reduce-coupling-allow-the-model-to-evolve/) (en)&nbsp;: une bonne introduction au *pattern* CQRS (Command Query Responsibility Segregation) en PHP
* [The Death of Microservice Madness in 2018](http://www.dwmkerr.com/the-death-of-microservice-madness-in-2018/) (en)&nbsp;: Un point de vue intéressant sur les architectures à base de Microservices. Pour faire simple, ce type d'architecture vient avec une complexité qui est souvent sous-estimée.
* [Documenting Composer scripts](http://raphaelstolt.blogspot.fr/2018/01/documenting-composer-scripts.html) (en)&nbsp;: Billet expliquant comment composer 1.6 permet de documenter les scripts avec une nouvelle entrée dans le fichier composer.json.
* [GDPR : impact sur l'ensemble de vos développements](https://wodric.com/gpdr-impact-sur-vos-developpements/) (fr)&nbsp;: Le point sur la future réglementation européenne sur la protection des données personnelles (GDPR ou General Data Protection Regulation).

Et un peu hors-sujet&nbsp;:

* [Obsolescence programmée : tous responsables](http://www.lutopik.com/article/obsolescence-programmee-tous-responsables) (fr)&nbsp;: oui vraiment tous et toutes...

* [Voici les pires intitulés de job du secteur de la tech](https://m.usbeketrica.com/article/recrutement-perle-rare-pas-besoin-ninja-ou-sorcier) (fr)&nbsp;: pour rigoler un peu. Je suis étonné de ne pas voir &quot;Jedi&quot; dans les intitulés. Mais je fais effectivement parti de ceux qui auraient tendance à fuir les annonces avec des intitulés de ce genre.

(En plus du [flux RSS global](/rss.xml), les billets *veille*
et uniquement ceux là sont listés dans le [flux RSS *veille*](/rss/veille.xml))
