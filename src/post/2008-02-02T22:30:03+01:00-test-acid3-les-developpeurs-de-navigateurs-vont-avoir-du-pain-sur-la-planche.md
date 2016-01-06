---
title: "Test Acid3 : les développeurs de navigateurs vont avoir du pain sur la planche"
tags:
    - formats
    - mozilla
    - microsofterie
    - standards
    - xhtml
    - internet explorer
    - web
updated: 2008-10-31T09:41:48+01:00
lang: fr
node: 66623
remoteId: 3a00c62141751221db6408f9af1e50bf
---

Vu chez [Laurent Jouanneau](http://ljouanneau.com/blog/2008/02/01/752-test-acid3), [un test Acid3 est en cours d'écriture](http://www.webstandards.org/action/acid3/). Pour rappel, les tests Acid visent à mettre à l'épreuve les navigateurs en mettant en évidence leurs lacunes en terme de support des standards du web à un moment donné. [Le premier test Acid](http://www.w3.org/Style/CSS/Test/CSS1/current/test5526c.htm) était focalisé sur les modèles de boîtes, [le deuxième sur le support du CSS et des images PNG](http://www.webstandards.org/files/acid2/test.html#top). [Le dernier en cours d'écriture](http://acid3.acidtests.org/) se focalisent sur quelques propriétés avancées de CSS2 et surtout sur le support du DOM en javascript (il y a plus de 3000 lignes de javascript dans le test...).

 

Aucun navigateur ne réussit ce test et c'est bien sûr fait exprès pour pousser les développeurs à corriger les bugs. Pour le moment, Firefox 2 et 3 s'en sortent les mieux avec à peine plus que la moyenne et comme d'habitude les Internet Explorer font partie des pires... Plutôt normal pour IE6, mais très décevant pour Internet Explorer 7. Je me souviens que la dernière fois que j'ai développé une application utilisant abondamment (abusivement ?) javascript et le DOM, IE était un vrai cauchemar dès qu'il s'agissait de faire des choses avancées, pire que dans le domaine du montage HTML/CSS... Consolons nous, Microsoft a annoncé qu'[une version interne du futur Internet Explorer 8 passait le test Acid2](http://blogs.msdn.com/ie/archive/2007/12/19/internet-explorer-8-and-acid2-a-milestone.aspx), avec un peu de chance cela aura des effets bénéfiques sur les fonctionnalités testées dans Acid3 et avec beaucoup de chance, ils auront le temps d'ajouter un support décent du DOM dans IE8...

