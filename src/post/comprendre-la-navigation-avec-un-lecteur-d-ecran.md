---
title: "Il était une fois 2 pièces: comprendre la navigation avec un lecteur d'écran"
tags: accessibilité, lecteur d'écran, traduction
lang: fr
published: 2018-02-08 22:59
photos:
    - images/lampe.jpg
---

<p class="note">
Ce texte est une traduction de l'excellent
<a href="https://developer.paciellogroup.com/blog/2018/01/a-tale-of-two-rooms-understanding-screen-reader-navigation/">A Tale of Two Rooms: Understanding screen reader navigation</a>.
</p>

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/lampe.jpg" alt="Une lampe posée sur des pavés dans la pénombre">
</figure>

Pour ceux d'entre nous qui utilisent un lecteur d'écran comme JAWS, NVDA or
VoiceOver pour accéder au Web, l'expérience utilisateur peut être très
différente de celle et ceux qui peuvent visualiser le contenu. J'ai donné de
nombreuses formations sur l'accessibilité dont l'un des buts est d'aider les
stagiaires à mieux comprendre la navigation sur le web à l'aide d'un lecteur
d'écran.

Il est courant pour la plupart des gens de vouloir passer directement aux
détails techniques&nbsp;

* Quelles touches du clavier presser&nbsp;?
* Avec quel lecteur d'écran devrais je tester&nbsp;?
* Quel navigateur devrais je utiliser&nbsp;?

Ces considérations sont importantes mais il est préférable de prendre un peu de
recul et de se demander&nbsp;:

<p class="highlight">
À quoi ressemble cette expérience et comment puis je la simuler si je peux
voir l'écran&nbsp;?
</p>

À cette fin, je voudrais présenter plusieurs illustrations qui ont été efficaces
pour mieux appréhender cette situation.

## Une porte ouverte

Commençons par définir la scène de notre première histoire. Imaginez vous venez
d'ouvrir une porte et vous regardez dans une vaste salle de conférence. Au
centre de la pièce se trouve une grande table avec 10 chaises (5 de chaque côté
de la table). Deux hommes et deux femmes sont installées à cette table. Ces 4
personnes se trouvent du même côté de la table (ils et elles font face à la
porte où vous vous tenez). À l'autre bout de la pièce (derrière ces personnes)
se trouvent 3 grandes fenêtres qui donnent sur une cour avec des bancs, des
fleurs et de petits arbres. Sur la partie droite de la pièce, se trouvent un
comptoir avec une cafetière et un micro-onde. Sur la gauche, une écran plat est
fixé au mur.

En supposant que vous ne connaissiez pas la disposition de cette pièce, quelle
est la première chose que vous feriez en ouvrant la porte&nbsp;? Certains
balaieraient la pièce de gauche à droite. D'autres le feraient de droite à
gauche. D'autres encore regarderaient d'abord la table au centre puis
parcourraient les contours de la pièce. Peu importe comment vous le feriez, la
plupart balaieraient la pièce du regard pour avoir un rapide aperçu de la
disposition et du contenu de la pièce. Le balayage ne prendrait que quelques
secondes et la plupart d'entre vous le ferait sans même y penser. Ensuite, vous
vous pourriez vous concentrer sur certains points comme les personnes assises
autour de la table ou l'écran de télévision au mur.

## Une pièce plongée dans le noir

Maintenant, reprenons la même scène et cette fois, quand vous ouvrez la porte,
la pièce est totalement dans le noir. Aucune lumière n'est présente et par
conséquent vous ne pouvez absolument rien distinguer au premier coup d'œil. On
vous a donné une petite lampe de poche et en étant allumée, elle vous permet de
voir une toute petite zone. Cette zone visible est un petit cercle d'environ 60
centimètres de diamètre et rien en dehors de ce cercle n'est éclairé.

<p class="highlight">
Comment allez vous observer le contenu de cette pièce&nbsp;?
</p>

Certains d'entre vous feraient faire des allers-retours de gauche à droite à la
lampe en partant des pieds et en s'éloignant progressivement. Certains
commenceraient par le fond de la pièce avec la lampe face à eux alors que
d'autres pourraient pointer la lampe au hasard à différents endroits sans schéma
particulier. En déplaçant la lampe, il vous faudrait construire une carte
mentale ou une image de ce qui se trouve dans la pièce et de comment elle est
organisée. Construire cette image mentale prendra nettement plus de temps que de
balayer la pièce illuminée. En déplaçant la lampe, il vous faudra vous souvenir
de chaque chose et de comment elle se positionne par rapport aux autres. Si vous
oubliez l'emplacement de quelque chose, il vous faudra un certain temps pour la
retrouver.

<p class="highlight">
Le comptoir avec la cafetière était-il sur la droite ou au fond de la
pièce&nbsp;? Combien de personnes étaient assises autour de la table&nbsp;? 4 ou
peut-être 5&nbsp;?
</p>

Répondre à ces questions quand vous pouvez voir l'ensemble de la pièce en un
coup d'œil ne demande que peu d'effort mais y répondre quand vous ne pouvez voir
qu'une petite zone à la fois est beaucoup plus long.

## Un scénario analogue

Ce second scénario est analogue à comment un utilisateur ou une utilisatrice
d'un lecteur d'écran perçoit une page web ou un application pour smartphone.

Bien qu'une commande au clavier ou l'utilisation de l'écran tactile permette de
déplacer le lecteur d'écran sur la page, il n'est toujours possible de lire
qu'une chose à la fois. L'utilisateur ou l'utilisatrice malvoyante n'a aucun
moyen d'avoir un aperçu rapide (disons en 1 à 3 secondes) de la page comme une
personne qui peut voir l'écran.

Heureusement, des mécanismes techniques d'accessibilité comme des titres ou des
régions peuvent aider l'utilisateur ou l'utilisatrice d'un lecteur d'écran à se
concentrer sur certaines parties de la page.

De retour dans notre scénario avec la pièce sombre, imaginez qu'il y ait
maintenant un petit point rouge lumineux sur chaque élément important de la
pièce comme la table, le comptoir, la télévision et sur chaque personne autour
de la table. Vous auriez toujours besoin de la lampe de poche pour explorer la
zone mais les points rouges vous donneraient une idée de l'emplacement des
choses importantes.

Les changements dynamiques de contenu d'une page peuvent être un autre défi pour
les personnes utilisant un lecteur d'écran. Reprenons nos exemples de pièce
sombre et de lampe de poche. Imaginons maintenant qu'un des hommes se lève pour
se déplacer de l'autre côté de la table. Il y a maintenant 2 femmes et un homme
d'un côté de cette table et un homme de l'autre. Dans le scénario de la pièce
éclairée, vous remarqueriez très probablement le mouvement au moment où il se
produit. Même si vous n'étiez pas en train de regarder l'homme qui s'est
déplacé, vous auriez remarqué le déplacement du coin de l'œil et vous vous
seriez tourné pour regarder ce qui était en train de se produire. Dans le
scénario de la pièce plongée dans le noir, il serait très difficile de remarquer
que quelque chose s'est produit à moins d'avoir pointé la lampe de poche sur
l'homme en déplacement à au bon moment. Il est fort probable que vous n'auriez
remarqué son déplacement qu'après avoir pointé la lampe sur la chaise laissée
vacante.

C'est exactement ce qui se produit lorsque le contenu d'une page change sans
alerter le lecteur d'écran. L'utilisateur ou l'utilisatrice peut ne jamais voir
le changement à moins de se déplacer vers la nouvelle information et remarquer
la différence.

<p class="highlight">
Ce problème est soluble en s'assurant que les contenus dynamiques sont mis en
œuvre avec des techniques d'alerte ou de zones "live" ce qui permet au lecteur
d'écran d'annoncer la mise à jour à l'utilisateur ou l'utilisatrice.
</p>

Dans notre exemple de la pièce plongée dans le noir, l'homme pourrait annoncer
qu'il est en train de bouger de l'autre côté de la table. Même si la lampe de
poche n'était pas pointée vers lui, vous entendriez son annonce et vous pourriez
comprendre la situation.

Pour terminer, regardons du côté de la fenêtre qui donne sur la cour. Dans le
scénario de la pièce éclairée, vous pourriez voir rapidement que la fenêtre
s'ouvre sur la cour avec des bancs, des fleurs et des arbres. Alors que dans le
scénario de la pièce plongée dans le noir, même en pointant la lampe sur la
fenêtre, vous ne seriez absolument pas capable de distinguer ce qui se passe
dehors. Ceci illustre parfaitement ce qui se produit avec les éléments visuels
comme les images lorsqu'ils n'ont pas de libellé textuel associé. Par exemple,
un lecteur d'écran peut identifier qu'une image est présente dans une page mais
la seule information qu'il peut communiquer sur elle est son texte alternatif.
Sans ce texte, la personne utilisant le lecteur d'écran n'aura aucune idée de ce
que l'image représente. Dans l'exemple de la pièce plongée dans le noir, ce
texte pourrait être placé à côté de la fenêtre et pourrait décrire ce qu'il y a
dehors. En localisant la fenêtre avec la lampe de poche, vous pourriez alors
lire la description.

## Pour une meilleure compréhension

Une des meilleures manières de comprendre l'utilisation d'un lecteur d'écran est
d'essayer par vous-même. Il est probablement bénéfique d'essayer par vous même
de naviguer sur le web avec un lecteur d'écran. En plus de cela, voici un
exercice simple pour simuler les scénarios décris plus haut. (Je ne recommande
pas visiter au hasard des salles de conférence avec des gens en éteignant les
lumières&nbsp;!)

1. Imprimez une page web. Prenez plutôt une page pas trop grande mais contenant
   une large variété d'éléments comme du texte, des liens, des menus, …
1. Prenez une feuille blanche et faites un petit trou en son centre. Le trou
   devrait être de la taille de 2 ou 3 mots (15 millimètres de diamètre environ
   est généralement suffisant)
1. Placer la feuille avec le trou sur l'impression de la page de web et essayez
   de comprendre son contenu en déplaçant la feuille trouée.

La compréhension du contenu de la page sera probablement très compliquée et
prendra du temps mais cette expérience donne une bonne idée de l'utilisation
d'un lecteur d'écran (en particulier si aucune technique de navigation n'est
mise en œuvre).
