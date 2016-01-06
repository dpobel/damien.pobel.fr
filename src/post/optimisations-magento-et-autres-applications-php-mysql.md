---
title: Optimisations Magento (et autres applications PHP/MySQL)
tags: magento, stupides, web, php, mysql, performances
updated: 2009-01-08T12:21:39.000Z
lang: fr
node: 67413
remoteId: 69ac6166cd53cd7f97d5a31134fbe249
published: 2009-01-08T13:09:00+01:00
---

Cherchant des méthodes pour optimiser une boutique en ligne utilisant [Magento](http://www.magentocommerce.com), je suis tombé sur le billet [Performance is Key! - Notes on Magento’s Performance](http://www.magentocommerce.com/blog/comments/performance-is-key-notes-on-magentos-performance/) sur le blog officiel de Magento. Sur le fond, rien d'extraordinaire mais de bons conseils valables pour la plupart des applications <abbr title="Linux Apache MySQL PHP">LAMP</abbr>  :

* [Utiliser un cache d'opcode](/post/benchmark-between-ez-publish-4-and-ez-publish-3-10-with-or-without-a-php-opcode-cache) (APC, XCache, eAccelerator, ...)
* Bien configurer son Apache (KeepAlive, ...)
* [Bien configurer son MySQL](http://dev.mysql.com/tech-resources/articles/mysql-query-cache.html) (query cache, ...)
* Utiliser un système de fichier de type <code>tmpfs</code>
 pour les données en cache sur le disque fréquemment utilisées

En revanche, sur la forme je suis *un grand fan* des captures d'écran pour montrer les configurations optimales avec en prime le correcteur orthographique activé :-)

