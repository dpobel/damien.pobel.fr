---
title: customcss, un plugin RoundCube pour inclure ses propres feuilles de style
tags: roundcube, php, extension, css
lang: fr
node: 68718
remoteId: 827376b972fcc1c4ea2b09a1950469bc
published: 2010-09-26T14:50:27+02:00
---

Le webmail [RoundCube](http://www.roundcube.net/) est mon client de messagerie principal depuis quelques temps déjà. Agrémenté [de quelques plugins](http://trac.roundcube.net/wiki/Plugin_Repository), celui-ci me convient presque parfaitement. La skin par défaut est plutôt pas mal, mais elle souffre selon moi de quelques problèmes de lisibilité (contraste, taille des polices, ...). Comme je n'ai pas trouvé le moyen dans la configuration de RoundCube d'inclure ma propre feuille de style et pour éviter des problèmes lors de futures mises à jour, j'ai écrit [customcss](/files/customcss-1.0.tar.gz). Ce plugin permet de configurer des fichiers CSS qui seront inclus dans toutes les pages générées par le webmail. Rien de bien compliqué (à peine 20 lignes de code), mais si ça peut servir à quelqu'un...

