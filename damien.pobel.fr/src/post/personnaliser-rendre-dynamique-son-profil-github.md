---
title: "Personaliser et rendre dynamique son profil GitHub"
published: 2024-05-22
tags: github, github actions, architecture, blog
photos:
    - images/fioles-apothicairerie.jpg
---

<figure class="object-center bordered">
  <img loading="lazy" src="/images/660x/fioles-apothicairerie.jpg" alt="Des fioles de l'Apothicairerie de Bourg-en-Bresse">
  <footer>Des fioles <a href="/post/apothicairerie-de-bourg-en-bresse/">de l'apothicairerie de Bourg-en-Bresse</a></footer>
</figure>

Dans le numéro de [JavaScript Weekly de la
semaine dernière](https://javascriptweekly.com/issues/688), on trouve notamment [Dynamic
GitHub profile with Bun and
Typescript](https://tduyng.github.io/blog/dynamic-github-profile-with-bun-typescript/)
où l'auteur explique comment il personnalise et surtout rend dynamique son
profil GitHub. Cet article m'a rappelé que j'avais dans mes brouillons un billet
sur le même sujet et comme j'utilise une approche un peu différente, c'est
l'occasion de le terminer de parler un peu ~de la plomberie~ l'envers du décor.

[La personnalisation d'un profil GitHub est simple à mettre en
place](https://docs.github.com/fr/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme),
il suffit de créer un dépôt nommé comme votre nom d'utilisateur
`username/username` et d'y ajouter un fichier `README.md` à la racine pour que
son contenu soit repris sur le profil. Pour moi, le `README.md` de
https://github.com/dpobel/dpobel se retrouve sur la page profile, ce qui donne
quelque chose comme :

<figure class="object-center bordered">
  <a href="/images/profil-github-personnalise.png">
  <img loading="lazy" src="/images/660x/profil-github-personnalise.png" alt="Capture d'écran de mon profil GitHub personnalisé">
  </a>
  <footer>Capture d'écran de mon profil GitHub avant publication de ce billet</footer>
</figure>

Il reste donc à mettre à jour régulièrement ce fichier pour que le profil
affiche des informations à jour. Dans mon cas, en plus d'une courte
introduction, je souhaite afficher les derniers billets publiés sur ce site
ainsi que quelques billets sélectionnés. Comme l'auteur de l'article cité plus
haut, je pourrais mettre un peu de code dans le dépôt `username/username` et
lancer régulièrement un script _via_ GitHub Actions (ou autre) pour mettre à
jour le `README.md` à partir de flux RSS. Néanmoins, je vois au moins deux
inconvénients dans cette approche (qui a quand même le mérite d'une certaine
simplicité) :

1. il faut nécessairement ajouter du code dans le dépôt `username/username`
  ce qui implique un peu de maintenance
1. l'action de mise à jour doit être configurée pour s'exécuter régulièrement
  quelque soit l'activité sur ce site, compte tenu des hauts et des bas des
  publications par ici, ce n'est probablement pas une utilisation de ressources
  très efficace 😉

Par ailleurs, au moment où j'ai voulu mettre en place cette personnalisation,
j'avais un besoin proche qui consistait à également tenir à jour
https://dpobel.github.io/ en fonction de l'activité ici. Là encore, j'aurais pu
mettre un peu de code dans le dépôt correspondant pour construire une page ce
qui aurait occasionné les mêmes inconvénients.

Bref, en cherchant une alternative, j'ai découvert que [GitHub expose une API
REST qui permet notamment de déclencher un _workflow_ GitHub
Actions](https://docs.github.com/fr/actions/using-workflows/manually-running-a-workflow#running-a-workflow-using-the-rest-api)
offrant ainsi une manière d'éliminer le second inconvénient. À partir de là,
j'ai réalisé que je pouvais facilement ajouter dans la construction de ce site
la génération du `README.md` pour le dépôt `username/username` et d'une page
HTML destinée à https://dpobel.github.io/ et qu'ensuite à l'issue du
déploiement, il suffisait de [déclencher un _workflow_ GitHub Actions par API
pour chacun de ces
dépôts](https://github.com/dpobel/damien.pobel.fr/blob/654a576227a853d00bd58133e7975eebc8e0197b/bin/deploy.sh#L14-L17)
qui peuvent se contenter de [télécharger un fichier et de le
_commiter_](https://github.com/dpobel/dpobel/blob/7f68525f980af68294c0dd0d0f3b6db1cbf27a0b/.github/workflows/main.yml).
De cette manière, l'essentiel de la logique est concentré dans la construction
de ce site qui pilote les mises à jour externes.

Pour résumer la recette de ma potion magique 🧙 :

1. générer le `README.md` sur son site pour qu'il soit déployé avec le
   reste (ou le rendre disponible à une URL connue si vous utilisez un CMS dynamique)
1. Configurer un _workflow_ GitHub Actions pour télécharger ce fichier et le
   _commiter_ sur le dépôt `username/username`
1. sur un évènement par exemple au déploiement ou si vous utilisez un CMS sur la
   publication d'un nouveau contenu, faire un appel API pour déclencher ce
   _workflow_.

Et hop la magie opère ✨️ La même mécanique est à l'œuvre pour la mise à jour de
https://dpobel.github.io/. Si j'en crois [l'historique des _commits_ du dépôt
pour le profil](https://github.com/dpobel/dpobel/commits/main/) et [de celui de
la page](https://github.com/dpobel/dpobel.github.io/commits/main/), la magie
opère depuis un peu plus de 3 ans sans quasiment aucune intervention manuelle
sur ces dépôts.
