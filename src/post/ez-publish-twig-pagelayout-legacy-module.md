---
title: "Twig pagelayout pour les modules legacy dans eZ Publish 5"
tags: twig, ez publish, ez publish 5, template, symfony 2
lang: "fr"
published: 2013-05-01T12:59:44+02:00
updated: 2016-02-12 12:50
---

([English version available on share.ez.no](http://share.ez.no/blogs/damien-pobel/twig-pagelayout-for-legacy-modules-in-ez-publish-5))

Je suis en train de mettre à jour [le Planète eZ
Publish.fr](http://www.planet-ezpublish.fr) à la dernière version d'eZ Publish 5.
J'en profite pour passer en revue les problèmes ou les fonctionnalités
manquantes que j'avais recontrés lors de [la mise en place de la version avec eZ
Publish 5 en décembre
dernier](/post/planet-ez-publish-fr-mis-sur-orbite-par-ez-publish-5). [L'un de
ces problèmes](https://github.com/dpobel/planet-ezpublish.fr/issues/20)
concernait les différences entre les pages générées par les modules legacy
([ezinfo/about](http://www.planet-ezpublish.fr/ezinfo/about), planet/search, ...) et le reste du site. En effet, en 5.0, [il
n'était pas possible d'utiliser un pagelayout Twig avec un module
legacy](https://jira.ez.no/browse/EZP-20576), et donc le résultat de ces modules
étaient toujours injectés dans le bon vieux `pagealyout.tpl`. À partir des n
[2013.4](http://share.ez.no/blogs/community-project-board/ez-publish-community-project-2013.4-report)
et 5.1, il est maintenant possible d'utiliser un pagelayout Twig avec les
modules legacy. Il s'agit d'une fonctionnalité intéressante dans l'optique d'une
mise à jour progressive vers la nouvelle stack, mais certains éléments autour de
cette fonctionnalités sont intéressants.

Pour commencer, la version initiale a été ajoutée par [Joe
Kepley](http://partialcontent.com/) *via* [une pull
request](https://github.com/ezsystems/ezpublish-kernel/pull/264). Il mérite un
grand bravo pour ça :-)

Ensuite, en travaillant [sur une amélioration](https://jira.ez.no/browse/EZP-20518), j'ai ajouté la possibilité [de
définir ce pagelayout par siteaccess ou groupe de
siteaccess](https://github.com/ezsystems/ezpublish-kernel/pull/277). Il n'y a pas [de configuration sémantique](http://symfony.com/doc/current/cookbook/bundles/extension.html), donc pour configurer le
pagelayout à utiliser avec les modules legacy, il faut écrire la configuration
suivante dans `ezpublish.yml`&nbsp;:

```yml
parameters:
  ezpublish_legacy.planete.module_default_layout: PlanetBundle::pagelayout.html.twig
```

Dans cet exemple, `planete` est le nom du siteaccess et la valeur est évidemment
le chemin vers le template.

Enfin, avec quelques changements, le même pagelayout peut être utilisé pour les
modules legacy comme pour le reste du site. Le principal changement et
potentiellement le seul à apporter concerne le block `content` pour qu'il tienne
compte de l'éxécution d'un module legacy. Une simple condition sur la variable
`module_result` permet de détecter le contexte&nbsp;:

```django
<!DOCTYPE html>
<html lang="fr-FR">
<!-- ... -->

<body>
{% block content %}
    {% if module_result %}
        {# we are in a legacy rendered module #}
        {{ module_result.content|raw }}
    {% endif %}
{% endblock %}
</body>
</html>
```

Rien de compliqué, non&nbsp;? Il s'agit là d'un des nombreux ponts entre eZ
Publish legacy et la nouvelle stack eZ Publish 5. Vous voulez en apprendre
plus&nbsp;? Si j'étais vous, je m'inscrirais à la prochaine [eZ UnConference #2](http://ezuncon.ez.no/).
Sans conteste, le moyen le plus rapide de tout apprendre ou presque sur eZ
Publish 5!

Mise à jour à 14h30: [cette fonctionnalité est
documentée](https://confluence.ez.no/display/EZP/Legacy+template+fallback#Legacytemplatefallback-Modulelayout) avec un exemple
utilisant l'héritage de template Twig.
