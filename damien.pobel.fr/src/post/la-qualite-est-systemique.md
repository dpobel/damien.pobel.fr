---
title: "La qualité est systémique"
tags: veille, métier, bonnes pratiques, qualité, code, architecture, unit test, ingénierie logicielle
lang: fr
published: 2024-03-23
photos:
    - images/feuille.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/feuille.jpg" alt="Photo d'une feuille mettant en évidence sa structure">
    <footer>Photo de <a href="https://unsplash.com/fr/@ohutcherson">Olivia Hutcherson</a></footer>
</figure>

Je suis tombé aujourd'hui sur [Quality is
systemic](https://jacobian.org/2022/sep/9/quality-is-systemic/) de [Jacob
Kaplan-Moss](https://jacobian.org/) que je trouve particulièrement juste.

Traduction rapide du premier paragraphe :

> La qualité logicielle est plus le résultat d'un système conçu pour produire de
> la qualité et pas tellement le résultat de performances individuelles.
> C'est-à-dire : un groupe de programmeurs médiocres travaillant avec une
> structure conçue pour produire de la qualité produira un meilleur logiciel
> qu'un groupe de programmeurs fantastiques travaillant dans un système conçu
> pour d'autres objectifs.

En d'autres termes pour obtenir de la qualité il faut une organisation
construite pour la produire. L'auteur donne quelques exemples de
caractéristiques systémiques permettant de produire de la qualité :

* une organisation et une culture qui permettent et encouragent [l'écriture de
  bons tests](/post/bon-test-unitaire-integration-fonctionnel/) ;
* une culture qui ne pousse pas à mettre en production du code qui n'est pas
  prêt ou [qui est inutile](/post/au-cas-ou/) ;
* une cadence de développement qui permet de correctement architecturer le code
  et de le documenter ;
* un environnement de travail où les personnes se sentent en sécurité et
  n'hésitent pas à demander de l'aide au besoin ;
* une culture où les échecs sont analysés sans chercher de coupable et où le
  système est amélioré pour éviter les échecs similaires.

Je trouve ce dernier point particulièrement important. À titre personnel c'est
quelque chose que je m'attache à toujours faire mais j'ai vu relativement peu
d'organisations où c'était une démarche systématique.

Et il existe probablement des tas d'autres paramètres comme une culture qui
permet une forme d'auto-organisation et offre une certaine liberté, une
organisation où on ne travaille que sur un seul sujet à la fois ou encore une
culture qui célèbre autant voire plus la suppression de code que l'ajout… Tout
ceci fait largement écho à [Maximiser l'efficacité des
développeur·ses](/post/maximiser-efficacite-developpeurs/) sous un angle plus…
systémique.
