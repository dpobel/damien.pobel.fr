---
title: "Nettoyage des sessions dans eZ Publish (bug #10431)"
tags: ez publish, hébergement, php, debian
updated: 2007-07-12T21:32:44.000Z
lang: "fr"
node: "65191"
remoteId: "90bbd0255c8d40e5161c5e830dd7a7cd"
published: 2007-05-01T14:39:16+02:00
---
 
J'ai remarqué que sur plusieurs sites que la table *ezsession* chargée de stocker les données de session dans [eZ Publish](/tag/ez-publish) n'est jamais nettoyée, les données de session expirée s'accumulent. Selon la fréquentation du site, on obtient à plus ou moins long terme une table avec des millions d'enregistrements ce qui provoque au choix des ralentissements, des vérifications ([mysqlcheck](http://pwet.fr/man/linux/commandes/mysqlcheck)) interminables, des problèmes pour faire les backups ([mysqldump](http://pwet.fr/man/linux/commandes/mysqldump) de plusieurs gigas) voire carrément une corruption de la base de données. J'ai d'ailleurs rapporté [ce bug](http://issues.ez.no/10431) il y a quelques temps en proposant un script de 8 lignes (dont 4 inutiles…:-) à lancer via le système [de cronjobs d'eZ Publish](http://ez.no/doc/ez_publish/technical_manual/3_8/features/cronjobs). Je ne suis visiblement pas le seul à avoir rencontré ce problème. Dans [un fil du forum sur le même sujet](http://ez.no/community/forum/general/ezsession_table_size_700_mb), [Xavier Dutoit propose d'utiliser le script update/common/scripts/cleanup.php](http://ez.no/community/forum/general/ezsession_table_size_700_mb#msg121981) pour supprimer les sessions expirées. Markus Bader a créé l'extension [Session Cleanup](http://ez.no/community/contribs/cronjobs/session_cleanup) pour régler ce problème.

 
Mais quel est la vraie origine de ce problème ? [Richard Bayet apporte la lumière](http://issues.ez.no/10431#Comment252422) sur ce problème en citant [un commentaire de la documentation PHP officiel sur une spécificité de Debian](http://fr.php.net/manual/fr/function.session-set-save-handler.php#69763). Pour résumer, eZ Publish intègre son propre gestionnaire de session pour stocker les données en base plutôt que dans des fichiers. Or, sous Debian et dérivés, le nettoyage (Garbage collector) des anciennes sessions est assurées par un script shell lancé régulièrement par cron plutôt que par la fonction gc définit avec [session_set_save_handler](http://fr.php.net/manual/fr/function.session-set-save-handler.php) pour plus de sécurité dans l'utilisation du gestionnaire par défaut qui travaille avec des fichiers. Évidemment ce script est incapable de supprimer les sessions en base… Le lancement d'un script spécifique de manière asynchrone est donc nécessaire pour Debian et dérivés. Tout s'explique donc.

