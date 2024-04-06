---
title: "Pourquoi utiliser des hooks sur-mesure dans vos composants React"
tags: veille, bonnes pratiques, react, javascript, code, ingénierie logicielle
lang: fr
published: 2021-03-15
photos:
    - images/funny-box.jpg
---

<figure class="object-center bordered">
    <img loading="lazy" src="/images/660x/funny-box.jpg" alt="Une boîte de laquelle sort un mouton en peluche rigolo">
    <footer>Photo de <a href="https://pixabay.com/users/alexas_fotos-686414/">Alexas_Fotos</a></footer>
</figure>

[useEncapsulation or Why Your React Components Should Only Use Custom
Hooks](https://kyleshevlin.com/use-encapsulation) par Kyle Shevlin donne une
excellente explication :

> […] These custom hooks give us a little more context to what they mean, and we
> don't have the implementation details of our state handler functions sitting
> in the middle of our component function.

que je traduis grossièrement par :

> […] Ces hooks sur-mesure donnent un peu plus de contexte sur leur
> signification et permettent de ne pas mélanger leurs détails d'implémentation
> avec la fonction qui sert de composant.

ou autrement dit, cette approche permet de séparer la logique purement
d'affichage de la logique disons _métier_ (même si les exemples sont simplistes)
à laquelle il est obligatoire de donner un nom. Le bénéfice est immédiat : **une
bien meilleure lisibilité**.

Ce n'est pas mentionné dans l'article, mais en bonus cette approche donne
l'opportunité de tester unitairement cette logique _métier_ et d'éventuellement
laisser de côté l'affichage (ou de le tester différemment) et également de
pouvoir composer d'autres composants avec cette même logique.

Dernier point, quand je regarde ce hook sur-mesure :

```js
function useInput(initialState = '') {
  const [state, setState] = React.useState(initialState)

  const handlers = React.useMemo(
    () => ({
      handleInputChange: e => {
        setState(e.target.value)
      },
      resetInput: () => {
        setState(initialState)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}
```
Même si cette fonction renvoie un tableau, je dois dire que j'y vois ni plus ni
moins qu'une structure avec les méthodes pour la manipuler, c'est à dire quelque
chose qui ressemble sérieusement à… [un objet au sens de la programmation
orientée
objet](https://fr.wikipedia.org/wiki/Programmation_orient%C3%A9e_objet#Objet_(attributs_et_m%C3%A9thodes)) !
Ce qui est plutôt ironique pour une approche qui se veut fonctionnelle 😇
