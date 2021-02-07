---
title: "Maximiser l'efficacité des développeur·ses"
tags: veille, métier, bonnes pratiques
lang: fr
published: 2021-02-07
photos:
    - images/automatisation.jpg
---

Je viens de lire [Maximizing Developer
Effectiveness](https://martinfowler.com/articles/developer-effectiveness.html)
et comme souvent sur le site de Martin Fowler c'est un excellent article
(même si il n'en est pas l'auteur). Et je ne peux que vous conseillez chaudement
cette lecture.

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/automatisation.jpg" alt="Un jouet robot sur un tapis jaune">
    <footer>Photo de <a href="https://unsplash.com/@phillipglickman">Phillip Glickman</a></footer>
</figure>

Voici une traduction de la partie _Une journée dans un environnement hautement
efficace_ (qui fait un peu rêver mais c'est plus agréable à lire que l'exemple
de basse efficacité 😉):

> La développeuse ou le développeur :
>
> * consulte dans l'outil de gestion de projet et assiste au _standup_ où **les
>     tâches à accomplir sont sans ambiguïté**
> * constate que l'environnement de développement a été **automatiquement mis à
>     jour**, notamment les dépendances sont à jour et **cohérente avec la production**
>     et **les vérifications automatiques sur la CI/CD passent avec succès**
> * récupère la dernière version du code et fait des changements **incrémentaux** sur
>     le code qui sont **rapidement** vérifiés par des tests unitaires et déployés sur
>     un environnement local
> * en cas de dépendance avec une autre équipe, **la documentation et/ou les
>     spécifications des APIs sont facilement accessibles** sur un portail dédié. En
>     cas de nécessité, il ou elle peut facilement et **rapidement obtenir de l'aide
>     auprès de ses collègues** par exemple sur Slack
> * peut se concentrer sur **sa tâche** pendant plusieurs heures **sans interruptions**
> * **peut faire une pause**, prendre un café, aller faire un tour à pied ou jouer au
>     tennis de table avec les collègues
> * _commit_ les changements dans le code qui sont alors **examinés par des tests
>     automatisés** avant d'être déployés en production. Les utilisateur·rices
>     reçoivent les mises à jour progressivement, **ce processus est _monitoré_**.
>
> En bref, le développeur ou la développeuse est en capacité de faire **des
> changements incrémentaux dans une journée** et peut rentrer à la maison avec la
> satisfaction d'avoir progressé.

J'ai ajouté du gras sur les parties qui me semblent essentielles. Bien sûr
certains aspects dépendent fortement du contexte notamment _le déploiement en
production_ et _la réception des mises à jour par les utilisateur·rices_
correspondent bien au développement d'un logiciel de type <abbr title="Software as
a Service">SaaS</abbr> moins à un logiciel au sens plus traditionnel du terme.

En résumé, dans un environnement de haute efficacité :

* les tâches à réaliser sont _sans ambiguïté_, en d'autres termes elles
    ont été spécifiées et discutées pour avoir pour chacune, une vision claire
    du problème à résoudre, de la cible et des cas d'utilisation (_use cases_)
    et si en plus le périmètre a été réduit à son strict minimum, c'est
    parfait ;
* les tâches récurrentes et/ou celles où
    l'intervention humaine n'a aucune valeur ajoutée sont automatisées. Je pense
    bien sûr [aux tests](/post/bon-test-unitaire-integration-fonctionnel) mais
    également aux mises à jour de dépendances, au déploiement ou encore au
    formatage du code ;
* l'environnement de travail est performant autant en terme de matériel que sur
    la plateforme
    de <abbr title="Continuous Integration">CI</abbr>/<abbr title="Continuous
    Delivery">CD</abbr>. Le but étant d'avoir un certain confort mais surtout des
    boucles de _feedback_ les plus courtes possible ;
* chacun·e travaille sur un unique sujet à la fois mais [comme une vraie
    équipe](/post/travail-d-equipe/), le multitâche c'est pour les
    ordinateurs (et encore !) ;
* chacun·e peut se concentrer sans être interrompu ;
* les applications sont _monitorées_ correctement pour détecter au plus vite les
    soucis et avoir des données d'utilisation réelles et fiables ;
* les développements se font de manière incrémentale ce qui signifie notamment
    travailler systématiquement sur le plus petit périmètre possible et itérer
    jusqu'à obtenir un résultat satisfaisant (_Better done than perfect_) ;
* une certaine autonomie est laissée dans la manière de travailler (outils,
    rythme,…).

Cette liste ressemble à de l'enfonçage de portes ouvertes et pourtant, pour ce
qui me concerne, je crois pas avoir un connu d'environnement qui cochait toutes
les cases même si en général, mais pas toujours, la dynamique était plutôt dans
le bon sens.

Bref, tout ceci touche à ce qu'on appelle parfois la _Developer eXperience_
(<abbr>DX</abbr>) et qui, bien trop souvent, n'est pas prise en compte
suffisamment sérieusement.
