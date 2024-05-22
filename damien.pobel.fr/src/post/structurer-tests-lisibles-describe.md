---
title: "Structurer les tests pour les rendre plus lisibles et maintenables"
published: 2024-04-09
tags: unit test, bonnes pratiques, qualité, code, javascript, typescript, ingénierie logicielle, behaviour driven development
photos:
    - images/structure.jpg
---

<figure class="object-center bordered">
  <img loading="lazy" src="/images/660x/structure.jpg" alt="Photo de la structure d'un pylone en acier vue de son pied">
  <footer>Photo de <a href="https://pixabay.com/users/didgeman-153208/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4459235">Thomas</a></footer>
</figure>


Si vous écrivez des tests en JavaScript / TypeScript, il est plus que probable
que vous ayez déjà croisé les fonctions `describe` et `it` . En effet, les
frameworks de test les plus populaires comme Jest, Mocha ou encore Jasmine
[s'inspirent tous de
RSpec](https://bignerdranch.com/blog/why-do-javascript-test-frameworks-use-describe-and-beforeeach/)
et mettent à disposition ces fonctions pour écrire et structurer les suites de
tests. Dans sa documentation, Mocha désigne cette API [l'interface <abbr
title="Behavior Driven Development">BDD</abbr>](https://mochajs.org/#bdd).

Un autre pratique courante pour structurer le code d'un cas de test est
d'utiliser des commentaires pour séparer les différentes étapes du test
notamment le triptyque `Given`, `When`, `Then` (inspiré de BDD encore) ou son
équivalent souvent abrégé `AAA`: `Arrange`, `Act`, `Assert`. Par exemple :

```javascript
describe('MyComponent', () => {
  const sut = new MyComponent();

  it('should do stuff when the input is something', () => {
    // Given
    const input = buildSomeInput();

    // When
    sut.doStuff(input);

    // Then
    expect(sut).toHaveDoneSomething();
  });
});
```

Ces commentaires peuvent être une aide pour structurer son code mais comme
d'habitude, [ils sont une bonne occasion de se demander si il n'est pas possible
de rendre le code plus expressif](/post/juste-dose-commentaires-dans-le-code/)
et _spoiler alert_, c'est le sujet de cet article 😉

On peut déjà remarquer que la ligne après `Given` est la mise en place de l'état
indiqué par `when the input is something` dans l'intitulé du test. Également,
quelque soit le framework de test utilisé, `describe` est non seulement une API
pour grouper des cas de tests mais cette fonction offre aussi la possibilité
d'utiliser des _hooks_ notamment pour déclencher des actions avant chaque cas de
test ou avant tous les tests inclus dans ce `describe`. Donc en combinant une
bonne description (le premier paramètre de `describe`) par exemple commençant
par _given_ et un _hook_ on obtient un code plus expressif qui incorpore ce
commentaire `Given` et lui associe le comportement correspondant. Reste `When`
et `Then`, mais sont ils bien utiles ? Systématiquement `When` sera destiné à la
première ligne du cas de test et vraisemblablement `Then` à tout le reste…

En d'autre termes, l'exemple ci-dessus peut-être réécrit de la manière
suivante :

```javascript
describe('MyComponent', () => {
  const sut = new MyComponent();

  describe('given the input is something', () => {
    let input;

    beforeEach(() => {
      input = buildSomeInput();
    });

    it('should do stuff', () => {
      sut.doStuff(input);

      expect(sut).toHaveDoneSomething();
    });
  })
});
```

Évidemment sur un exemple aussi simple, la différence est minime mais sur des
suites de tests combinant plusieurs états ce _pattern_ s'avère particulièrement
pratique, par exemple imaginons un composant dont la responsabilité est de
notifier un utilisateur en fonction de son profil et d'une configuration, la
suite de tests pourrait ressembler à :

```javascript
describe("Notifier", () => {
  const sut = new Notifier(/* some dependencies */);

  describe("given the user is a free user", () => {
    beforeEach(() => {
      // … setup the user as a free user
    })

    it("should not notify the user", () => {
      // …
    });
  })

  describe("given the user is a premium user", () => {
    beforeEach(() => {
      // … setup the user as a premium user
    })

    describe("given she has configured the notifications to be issued by SMS", () => {
      beforeEach(() => {
        // … setup user's notification to sms
      })

      it("should notify the user by sms", () => {
        // …
      });
    });

    describe("given she has configured the notifications to be issued by email", () => {
      beforeEach(() => {
        // … setup user's notification to email
      })

      it("should notify the user by email", () => {
        // …
      });
    });
  })
});
```

Cette structuration offre plusieurs avantages :

1. le couple systématique `describe("given …")` / `beforeEach` introduit une forme de
   cohésion, il est facile de voir si le _hook_ implémente réellement la
   description ou à l'inverse de comprendre ce qu'implique la pré-condition ;
1. la suite de tests est facile à faire évoluer, par exemple si demain une
   nouvelle configuration permet d'envoyer des notifications par Slack ou tout
   autre moyen, il suffit d'ajouter un bloc `describe` et le tour est joué ;
1. en lançant le test, on obtient une spécification du composant testé (en
   fonction du _reporter_ utilisé), dans cette exemple, quelque chose comme :
   ```txt
   Notifier
     given the user is a free user
       ✔ should not notify the user
     given the user is a premium user
       given she has configured the notifications to be issued by SMS
         ✔ should notify the user by sms
       given she has configured the notifications to be issued by email
         ✔ should notify the user by email
   ```
   ce qui s'avère bien pratique pour comprendre une base de code existante ;
1. lorsqu'un test échouera, la structure a toutes les chances de faciliter la
   compréhension de l'erreur et avec un peu de chance de faciliter
   l'identification du bug.

Et j'en oublie probablement !

En bref, l'utilisation de `describe` et de ses _hooks_ permet de structurer les
tests. Cette structure impose notamment d'isoler et surtout de nommer
correctement les différents états ce qui rend les tests plus lisibles et maintenables à
relativement peu de frais en [s'éloignant de quelques _antipatterns_
courants](/post/tests-antipatterns-agacants/#les-tests-incompréhensibles-car-rédigés-avec-des-termes-inconnus)
ou au contraire pour essayer [d'écrire de bons
tests](/post/bon-test-unitaire-integration-fonctionnel/#facile-à-interpréter-quand-il-échoue).
