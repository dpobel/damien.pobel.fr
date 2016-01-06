---
title: "eZ publish et PHP5"
tags: php, ez publish, debian
updated: 2007-03-30T12:17:55.000Z
lang: "fr"
node: "61149"
remoteId: "5e2ba29ae78a2b1b89a6a76b17adbc86"
published: 2006-09-08T00:24:48+02:00
---
 
Une remarque que l'on voit fleurir de plus en plus dans [les forums sur eZ publish](http://ez.no/community/forum/suggestions/ezp_4_should_still_support_php5) ou [dans la communauté Francophone](http://ezpublish-france.fr/index.php/fr/forums/questions_techniques/date_de_sortie_compatibilite_php5) est [sa non compatibilité avec PHP5](http://ez.no/products/ez_publish/info/requirements_for_ez_publish) et le fait qu'[eZ publish 4 devrait lui aussi encore nécessiter PHP4](http://ez.no/community/articles/platform_and_solutions_strategy/ez_publish). En effet, de plus en plus de distributions Linux fournissent et supportent officiellement PHP5 au travers de leur système de paquets comme Ubuntu ou Suse ce qui fait que l'administration d'un serveur LAMP4 (Linux [Apache](http://pwet.fr/man/linux/administration_systeme/apache)[MySQL](http://pwet.fr/man/linux/commandes/mysql) PHP4) peut s'en trouver plus difficile voire pénible en nécessitant des recompilations à chaque sortie d'une nouvelle version de PHP4 corrigeant éventuellement des failles de sécurité. Alors que l'utilisation de paquets permet pratiquement d'administrer son serveur les yeux fermés ;-)

 
Cette demande est tellement forte que [Kristof Coomans](http://blog.coomanskristof.be/), un modérateur [des forums sur eZ publish](http://ez.no/community/forum), s'est lancé dans [une tentative de portage d'eZ publish 3.8.4 en PHP5](http://ez.no/community/forum/developer/ez_publish_3_x_on_php_5) et il semble avoir un prototype qui commence à tourner. Évidemment la somme de travail pour avoir un portage parfait de quelques 420000 lignes de code PHP est tout simplement monstrueuse et cet essai ne semble pas vouloir [faire changer d'avis eZ systems sur une éventuelle compatibilité eZ publish / PHP5 dans un futur proche](http://ez.no/community/forum/developer/ez_publish_3_x_on_php_5#msg109182). Mais il pourrait bien déboucher sur une version PHP5 d'un eZ publish communautaire.

 
Personnellement ou plutôt professionnellement, en utilisant Debian Sarge, eZ publish 3.7 était déjà un (mini) problème puisqu'à partir de cette version eZ publish nécessite PHP4.4 ou plus en raison principalement du changement dans la manière dont sont gérées les références alors que seule [la version 4.3.10 est officiellement incluses dans Debian Sarge](http://packages.debian.org/stable/web/php4) ce qui oblige soit à compiler PHP et tous ses modules à partir des sources soit à utiliser [des backports de PHP4](http://dotdeb.org/).

 
Au final, je trouve que la décision d'eZ systems de se concentrer sur un eZ publish 3.x et 4 ultra stable en PHP4 et de préparer son successeur pour l'horizon [PHP6](http://www.php.net/~derick/meeting-notes.html) avec [eZ plateform](http://ez.no/community/articles/platform_and_solutions_strategy/ez_platform) plutôt que de se lancer dans un portage potentiellement long et difficile est le bon choix. En tout cas c'est le choix de raison ; l'application du vieille adage : *reculer pour mieux sauter*.

