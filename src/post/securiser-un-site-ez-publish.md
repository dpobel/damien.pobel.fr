---
title: "Sécuriser un site eZ Publish"
tags: cms, sécurité, ez publish, php, mysql, apache
lang: "fr"
node: "67073"
remoteId: "ce7018cbbfe9bdd39960cf5761bfc59b"
published: 2008-08-26T23:34:57+02:00
updated: 2016-02-10 22:33
---

[Clochix](http://www.clochix.net) a publié cette semaine deux articles à propos
de sécurité; [le premier sur les <abbr title="Content Management
System">CMS</abbr>  en
général](http://www.clochix.net/post/2008/08/13/Et-si-on-s-interressait-a-la-securite-des-CMS)
et [le second plus spécifiquement sur eZ
Publish](http://www.clochix.net/post/2008/08/20/Astuce-pour-securiser-l-affichage-d-un-site-eZ-Publish).
Le problème pointé est l'affichage par défaut de tous les objets dans [eZ
Publish](/tag/ez-publish) par les *templates* par défaut même lorsque cela ne
devrait pas arriver. La solution (simple) proposée est de faire des surcharges
s'appliquant en dernier et n'affichant rien pour éviter d'afficher tout ce qui
n'a pas été prévu. Évidemment il est toujours mieux de restreindre les droits,
mais c'est un bon dernier rempart à la divulgation d'informations…


Il y a évidemment d'autres éléments à considérer et j'en oublie probablement
d'ailleurs mais voici ceux qui me viennent à l'esprit.


Au niveau *template*, il faut toujours penser à utiliser [l'opérateur
wash()](http://ez.no/doc/ez_publish/technical_manual/4_0/reference/template_operators/strings/wash),
il permet de s'assurer que tous les caractères spéciaux sont échappés pour
produire du code XHTML valide mais aussi pour éviter [des attaques de type <abbr
title="Cross Site
Scripting">XSS</abbr>](http://fr.wikipedia.org/wiki/Cross_site_scripting) si
surtout votre site propose aux internautes de contribuer.


Au niveau système pour un site en production, seul le répertoire
<code>var</code> devrait permettre l'écriture au serveur web. On peut aussi
restreindre [les droits de l'utilisateur MySQL utilisé par eZ
Publish](/post/droits-necessaires-dans-mysql-pour-ez-publish) pour limiter la
portée d'une éventuelle mauvaise utilisation de ce compte.


On peut aussi penser à désactiver les modules et/ou les vues inutiles pour un
*siteaccess* donné. Par exemple, pour ce site, le fichier `site.ini.append.php` de
mon siteaccess correspondant au *front* comporte la configuration suivante :

``` ini
[SiteAccessRules]
Rules[]
Rules[]=access;enable
Rules[]=moduleall
Rules[]=access;disable
Rules[]=module;user/register
Rules[]=module;user/forgotpassword
Rules[]=module;user/activate
Rules[]=module;user/success
Rules[]=module;ezinfo
```

Ces quelques lignes désactivent quelques vues du module <code>user</code> ainsi
que le module <code>ezinfo</code> qui sont accessibles aux utilisateurs anonymes
alors qu'ils ne me sont pas nécessaires. La vue <code>ezinfo/about</code> en
particulier donne des informations sur les extensions activées et surtout sur la
version d'eZ Publish ce qui permet de savoir à quoi est potentiellement
vulnérable le site. Dans tous les cas, [il vaut mieux être à
jour](/post/upgrade-to-ez-publish-4-0-1), les versions 4.0.0, 3.10.0 et 3.9.4
sont [vulnérables à quelques failles
connues](http://share.ez.no/community-project/security-advisories).


Il faut aussi penser à nommer les fichiers de configuration en .ini.append.php
et à encadrer le contenu par des commentaires PHP ce qui évite toute possibilité
de lecture via un accès direct par le serveur web. À ce niveau, avoir [un site
eZ Publish en mode Virtual
Host](http://ez.no/doc/ez_publish/technical_manual/4_0/installation/virtual_host_setup)
devrait aussi apporter un gain en cachant presque complètement l'arborescence
&quot;physique&quot; du site.


Enfin au niveau des extensions il faut évidemment penser à échapper toutes les
données inconnues avant de l'utiliser dans une requête SQL (ça n'est pas
spécifique à eZ Publish !), [la méthode escapeString() de la classe
eZDBInterface](http://pubsvn.ez.no/doxygen/4.0/html/classeZDBInterface.html#743e3da0d8f956262e551b3da9fb3591)
est faite pour ça.
