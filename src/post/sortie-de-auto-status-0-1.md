---
title: "Sortie de Auto status 0.1"
tags: twitter, ez publish, extension, php, zend framework
lang: "fr"
node: "68020"
remoteId: "ed4e7501514071653e26f44b7bb8eb83"
published: 2009-10-31T17:55:25+01:00
updated: 2016-02-12 13:33
---

[Auto status](http://projects.ez.no/autostatus) est une extension [eZ
Publish](/tag/ez-publish) qui permet de mettre à jour son statut sur les réseaux
sociaux Twitter ou Identi.ca en fonction de la publication d'un objet dans eZ
Publish. Techniquement parlant, cette extension fournit un [workflow event
type](http://ezpedia.org/en/ez/workflow_event_type) destiné à se déclencher
après la publication d'un objet et qui va utiliser un attribut de l'objet pour
mettre à jour le statut. La mise à jour sur Twitter est faite grâce à
[Zend_Service_Twitter](http://framework.zend.com/manual/1.12/en/zend.service.twitter.html),
Identi.ca est également supporté grâce [quelques
adaptations](https://github.com/dpobel/autostatus/blob/master/classes/autostatusidentica.php)
de cette classe également. Si vous voulez ajouter le support pour d'autres
réseaux, [n'hésitez pas à rejoindre le
projet](http://projects.ez.no/autostatus/team/members).

<figure class="object-center"><a href="/images/configuration-du-workflow-event-type-auto-status.png"><img src="/images//configuration-du-workflow-event-type-auto-status.png" alt="Configuration du workflow event type Auto status">
</a></figure>


J'ai installé cette extension sur [pwet.fr](http://pwet.fr), normalement [mon
statut sur Twitter](http://twitter.com/dpobel) devrait être mis à jour avec le
titre et l'URL de ce billet :-) J'ai également créé un compte Twitter pour le
Planet eZ Publish.fr et installé cette
extension sur le planet, il s'agit donc d'un
nouveau moyen de suivre les mises à jour du Planet *via* Twitter.
