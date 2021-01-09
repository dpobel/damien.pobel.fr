---
title: "Participer à la traduction d'eZ Publish en français"
tags: traduction, ez publish, template, git, php, xml
updated: 2011-03-14T08:18:02.000Z
lang: "fr"
node: "69053"
remoteId: "588487c5322bce9d367a9ccc6917d9fc"
published: 2011-03-08T14:08:12+01:00
---

[eZ Publish 4.5beta1 est sortie le 22 février 2010](http://share.ez.no/blogs/ez/ez-publish-community-project-matterhorn-4.5-beta-1). Cette sortie marque le début de la période dédiée à la localisation d'[eZ Publish](/tag/ez-publish) puisque plus aucun changement au niveau des chaînes de caractère utilisées dans le code ne doit apparaître d'ici la sortie de la version finale.


Comme je l'ai déjà écrit sur twitter, [la traduction est **un effort communautaire**](http://twitter.com/#!/dpobel/status/32737451667628032). Ce billet s'adresse aux utilisateurs d'eZ Publish mais aussi (et en fait surtout) aux entreprises (agences, SSII,…). Vous utilisez et intégrez eZ Publish, vous aimez/aimeriez disposer d'un outil entièrement traduit dans la langue de Molière (voire dans d'autres…) pour vos clients et si possible avec une traduction de haute qualité ? Eh bien c'est le moment de contribuer par exemple en mobilisant un employé/stagiaire pendant ne serait ce que 2 heures ! En plus ça ne demande pas de connaissance technique vraiment avancée, au contraire c'est même l'occasion pour un débutant de découvrir comment fonctionne le système voire pour un utilisateur un peu plus avancé de découvrir certaines fonctionnalités bien cachées !


Actuellement, eZ Publish et [l'extension Online Editor sont traduits à 100%](https://github.com/ezsystems/ezoe/pull/4) mais ça ne signifie pas pour autant que ces traductions n'ont pas besoin d'attention. Pour les autres extensions, la situation est très inégale à cause ou plutôt grâce à quelques initiatives isolées. En tout cas, merci aux auteurs de ces traductions, il est maintenant temps d'intégrer tout cela dans les dépôts GIT officiels des extensions.


Bon très bien, mais dans la pratique comment faire ? En fait, il y a plusieurs manières de procéder selon votre niveau technique et/ou le temps dont vous disposez :

* Vous avez quelques notions techniques et êtes prêts à manipuler git et des fichiers XML : il vous suffit de suivre [le tutorial publié sur share.ez.no](http://share.ez.no/learn/ez-publish/translating-localizing-ez-publish-using-git) pour l'extension que vous souhaitez traduire. Les fichiers indiquant toutes les traductions (<code>translations/untranslated/translation.ts</code>
) de chaque extension sont maintenant à jour. Si aucune traduction en français n'a été initialisée c'est sur ce fichier qu'il faut partir en le copiant dans <code>translations/fre-FR/translation.ts</code>
. Sinon, [il faut mettre à jour le fichier existant avec ezlupdate](http://share.ez.no/forums/discussions/translating-localizing-ez-publish-using-git#comment66267) ou fusionner ces deux fichiers à la main éventuellement.
* Vous avez peu de notions technique ou pas envie de vous frotter à git : vous pouvez chasser les fautes d'orthographes, les incohérences, les tournures maladroites en testant eZ Publish 4.5beta1 ou en lisant les fichiers translations.ts existants notamment ceux d'[eZ Publish](https://github.com/ezsystems/ezpublish-legacy/raw/master/share/translations/fre-FR/translation.ts) et [de Online Editor](https://github.com/ezsystems/ezoe/blob/master/translations/fre-FR/translation.ts). Pour les retours, vous pouvez m'envoyer un mail ou mieux&nbsp;[répondre dans le sujet dédié sur le forum](http://share.ez.no/forums/translation/french/traduction-ez-publish-4.5).


Dans tous les cas, si vous avez besoin d'aide, si vous avez une question ou vous voulez signaler que vous travaillez sur la traduction d'une extension, [le forum dédié aux traductions en français est là pour ça](http://share.ez.no/forums/translation/french).

