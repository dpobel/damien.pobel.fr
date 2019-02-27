---
title: "Quand de mauvaises pratiques causent un bug"
tags: php, bonnes pratiques, métier, code, qualité
lang: fr
published: 2019-02-25
photos:
    - images/charancon.jpg
---

On parle souvent de bonnes ou mauvaises pratiques dans l'écriture du code mais
plus rarement de leurs conséquences concrètes. Pourtant, pour le dire très
clairement, certaines mauvaises pratiques sont une cause profonde de bugs ou à
l'inverse, certaines bonnes pratiques rendent ces problèmes impossibles. Ici, il
s'agit de l'utilisation de `null` pour représenter une donnée *métier* et de
l'absence de constructeur qui rend le code et les contraintes plus difficiles à
comprendre.

<figure class="object-center bordered">
    <img src="/images/660x/charancon.jpg" alt="Un charançon posé sur une feuille">
</figure>

## Le bug

Pour illustrer mon propos, je vais prendre l'exemple d'un dysfonctionnement que
[_mon_ équipe](/post/travail-d-equipe/) devait corriger dernièrement. Ce bug
s'exprimait sur notre API REST dans la réponse de la ressource qui liste les
droits de l'utilisateur·rice avec un message d'erreur du type&nbsp;:

```
Argument 1 passed to Namespace\\ACLService::buildACLValue() must be of the type string, null given, called in /path/to/file on line 63
```

Comme le message l'indique, une méthode n'acceptant que des chaînes de
caractères en paramètre recevait `null`. Ce type d'erreur est ultra classique et
le signe que certains cas plus ou moins limites sont mal ou pas gérés
correctement.

## Sous le capot

L'application est découpée en plusieurs zones sur lesquelles un·e
utilisateur·rice peut avoir ou non un rôle ce qui se traduit ensuite par des
droits. La combinaison de rôles est ce qu'on appelle le profil utilisateur et il
était représenté par la classe suivante&nbsp;:

```php
final class UserProfile
{
    const ROLE_SUPER_ADMIN = 'superadmin';
    const ROLE_ADMIN = 'admin';
    const ROLE_READONLY = 'readonly';

    /**
     * @var string
     */
    public $zone1Role;

    /**
     * @var string
     */
    public $zone2Role;
}
```

Par soucis de brièveté, elle est peu simplifiée mais je n'ai rien omis
d'essentiel. Dans cette classe, rien n'indiquait clairement que les rôles sont
optionnels et à l'utilisation, en fonction de comment le profil est créé, les
rôles peuvent avoir une valeur reconnue mais aussi `null` (et même n'importe
quelle chaîne de caractère…). Ensuite, ces rôles se retrouvent passer en
paramètre où le *type hint* force le type `string` et… 💣 boom&nbsp;! Pour la
petite histoire, cette classe a été écrite il y a un bon moment alors que la
ressource REST où le bug est visible est très récente, au delà de la technique
pure, la classe `UserProfile` n'a visiblement pas communiqué clairement les
contraintes de l'application.

## Corrections

Comme souvent, il existe plusieurs manières de corriger ce bug, en voici deux.

### Accepter `null` et annoter les rôles correctement

La première solution qui vient généralement à l'esprit consiste à faire accepter
`null` à la méthode d'où part l'erreur avec un changement qui ressemble à&nbsp;:

```diff
-    private function buildACLValue(string $role): ACLValue
+    private function buildACLValue(string $role = null): ACLValue
     {
+        if ($role === null) {
+            // default behavior ?
+        }
        // read a config file to retrieve ACL for the $role
     }
```

Une fois défini le comportement lorsque `null` est passé, la correction devrait
être efficace. Il est aussi possible de gérer `null` dans la méthode publique
qui appelle cette méthode privée mais le raisonnement reste le même. Pour être
un peu plus complet dans ce type de solution, il faudrait complèter
`UserProfile` pour explicitement documenter/annoter ses attributs comme acceptant
`null` avec quelque chose comme&nbsp;:

```diff
@@ -7,12 +7,12 @@ class UserProfile
     const ROLE_READONLY = 'readonly';

     /**
-     * @var string
+     * @var string|null
      */
     public $zone1Role;

     /**
-     * @var string
+     * @var string|null
      */
     public $zone2Role;
 }
```

Ces deux patchs ne corrigent finalement que les symptômes du bug, si
`UserProfile` est utilisé ailleurs ou suite à un *refactoring*, un problème
similaire a toutes les chances de revenir même si les annotations devraient à la
fois permettre à un·e développeur·se de comprendre qu'un rôle est optionnel et
à un analyseur statique de code comme
[PHPStan](https://github.com/phpstan/phpstan) de les détecter plus rapidement.
Il est possible de faire mieux.

### Définir explicitement l'absence de rôle

En plus d'être un peu superficielle, la correction précédente ne facilite pas la
compréhension du code. Pire, l'absence de rôle étant représentée par `null`,
`null` est en réalité une valeur *magique* avec un signification particulière
dans ce contexte qui n'a rien d'évidente et qui devra être gérée un peu partout
avec le risque inhérent d'oubli.

Ainsi, pour à la fois corriger le bug, empêcher qu'il revienne sous une forme ou
une autre et améliorer l'expressivité du code, il vaudrait peut-être mieux se
débarrasser de ce `null` et le remplacer par une valeur explicite représentant
l'absence de rôle. Plutôt que d'appliquer les patchs précédents, la classe
`UserProfile` peut être changée de la manière suivante&nbsp;:

```diff
@@ -5,6 +5,7 @@ class UserProfile
     const ROLE_SUPER_ADMIN = 'superadmin';
     const ROLE_ADMIN = 'admin';
     const ROLE_READONLY = 'readonly';
+    const NO_ROLE = 'norole';

     /**
      * @var string
@@ -15,4 +16,20 @@ class UserProfile
      * @var string
      */
     public $zone2Role;
+
+    public function __construct(
+        string $zone1Role = self::NO_ROLE,
+        string $zone2Role = self::NO_ROLE
+    ) {
+        $this->validateRoleValue($zone1Role);
+        $this->zone1Role = $zone1Role;
+        $this->validateRoleValue($zone2Role);
+        $this->zone2Role = $zone2Role;
+    }
+
+    /**
+     * @throws \InvalidArgumentException
+     */
+    private function validateRoleValue(string $role)
+    {
+        // ...
+    }
 }
```

Au passage c'est l'occasion de définir un constructeur pour contrôler la manière
dont les instances sont créées et s'assurer de la cohérence de ces instances.
(oui bon ok les attributs sont publics…) Le constructeur communique également
les informations nécessaires ou non à la création d'une instance valide ainsi
que la valeur par défaut pour les rôles, en d'autres termes il suit les
contraintes du métier. La possibilité d'erreur est réduite et surtout la notion
de rôle optionnel est clairement communiquée. Bref, il me semble que ce bout de
code a nettement gagné en expressivité. Pour rajouter un petite couche de
sécurité et comme [PHP ne supporte pas les types
énumérés](https://wiki.php.net/rfc/enum), le constructeur valide les valeurs des
rôles qui lui sont passées avec `validateRoleValue`, même si pour corriger le
bug ce n'est pas strictement nécessaire. Pour terminer la correction avec cette
approche, il reste à ajouter les droits (ou plus exactement l'absence de droits)
dans le fichier de configuration pour les utilisateurs·rices sans rôle sur
certaines zones et le tour est joué&nbsp;!

Je suis conscient que mon avis est forcément biaisé, mais il me semble que cette
seconde solution est largement meilleure sans être vraiment plus complexe et
tout en étant plus pérenne.

---

Voila, comment deux pratiques que je considère comme des *anti-patterns* mènent
à un bug et surtout comment les deux bonnes pratiques opposées permettent non
seulement de le corriger mais aussi d'améliorer la lisibilité/l'expressivité du
code tout en apportant une certaine protection vis-à-vis du bug initial et
d'autres de la même famille. Sans être absolument allergique à `null`, son
utilisation me rend méfiant, ce n'est pas pour rien si [Tony
Hoarse](https://en.wikipedia.org/wiki/Tony_Hoare), son inventeur dans le langage
ALGOL W, dit à propos de ce concept&nbsp;:

> I call it my billion-dollar mistake. It was the invention of the null
> reference in 1965.

Quant à l'absence de constructeur, je n'en vois aucune justification. En bref,
écrire des constructeurs et utiliser des valeurs explicites pour coller au
domaine me paraissent des conseils plus qu'avisés.
