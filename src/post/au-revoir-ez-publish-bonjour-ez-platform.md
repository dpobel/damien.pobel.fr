---
title: "Au revoir eZ Publish, bonjour eZ Platform"
tags: ez publish, ez platform, ez systems, cms, php, symfony, online editor
lang: "fr"
published: 2016-01-08T10:36:07+01:00
description: Une version stable d'eZ Platform est sortie, eZ Publish va progressivement laisser la place à eZ Platform.
photos:
    - images/ez-platform-rocket-launch.png
---

<figure class="object-left">
    <img loading="lazy" src="/images/330x/ez-platform-rocket-launch.png" alt="eZ Platform
Rocket Launch">
</figure>

[eZ Platform 15.12 est sorti le 15
décembre](http://ez.no/Blog/Introducing-the-first-releases-of-eZ-Platform-and-eZ-Studio)&nbsp;!
La sortie d'une nouvelle version est toujours au moins un petit évènement mais
celle-ci représente *un peu* plus que ça. En effet, il s'agit de la première
version *stable* d'eZ Platform, techniquement il s'agit de [la
1.0.1](https://github.com/ezsystems/ezplatform/releases/tag/v1.0.1), eh **oui
1.0.x**&nbsp;!

Au dela de ce numéro symbolique, quelque part [eZ Publish est en
train de tirer sa
révérence](http://share.ez.no/blogs/ez/community-versions-of-ez-publish-no-longer-receiving-ez-support-patches)
après un bon paquet d'années de service. Et je dois dire que ce changement
signifie quelque chose pour moi, je suis [utilisateur d'eZ Publish depuis plus
de 10 ans maintenant](https://twitter.com/dpobel/status/656387581618298880) (!)
et ce blog était même à l'origine [une expérimentation autour de ce
CMS](/post/ouverture) qui s'appelait alors "eZ publish" :) Bon après, si on
gratte un peu, on peut voir qu'eZ Platform dépend notamment d'un (gros) paquet
appelé `ezpublish-kernel`, *la bête est encore vivante* ;-)

Plus sérieusement, [eZ Platform](/tag/ez-platform) est la réécriture d'eZ
Publish, en gros on a gardé les concepts mais ils sont mis en œuvre avec du code
moderne, de bien meilleur qualité, mieux découpé, testé et basé notamment sur
l'excellent Symfony.

Une nouvelle version est toujours qu'une étape vers les suivantes. Les
*Fast-Track Releases* vont maintenant se succèder tous les 2 mois. En toute
logique la prochaine sera la 16.02 et évidemment on travaille déjà dessus
notamment dans le but [d'améliorer l'éditeur de texte
riche](https://jira.ez.no/browse/EZP-25353), [de donner accès à la
corbeille](https://jira.ez.no/browse/EZP-25305), [de permettre la migration de
XmlText vers RichText](https://jira.ez.no/browse/EZP-25115) (de l'ancien *Field
Type* de texte riche vers le nouveau) et [de permettre la modification les droits des
utilisateurs](https://jira.ez.no/browse/EZP-24071). Attention&nbsp;: cette liste
n'est ni exhaustive, ni une promesse. Aussi, eZ Platform est un logiciel
libre, toutes les contributions (sur ces sujets comme sur d'autres) sont comme
toujours les bienvenues que ce soit par [un rapport de
bug](https://jira.ez.no/browse/EZP), un bout de code dans une *pull request* ou
simplement du *feedback* sur [la
documentation](https://doc.ez.no/display/TECHDOC), les rapports de bug existants
ou [sur
Slack](http://share.ez.no/blogs/ivo-lukac/faster-communication-with-ez-communtiy-on-slack-for-developers-who-just-love-slack)
par exemple. Alors, à vos claviers.
