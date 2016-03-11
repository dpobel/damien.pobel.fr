---
title: Discovering Polymer (and Web Components)
tags: standards, web, polymer, javascript, github, travis ci, unit test
published: 2016-03-01 08:49
lang: en
photos:
    - images/polymer.png
---

<figure class="object-left bordered">
    <img src="/images/220x/polymer.png" alt="Polymer project logo">
</figure>
[Polymer](https://www.polymer-project.org/1.0/) is a library (developed by
Google) to ease the creation of *components* or more precisely of [Web
Components](http://webcomponents.org/). I really like the idea of being able to
build my own element in **a standard way** and to use it in a web page like any
other HTML element. Unfortunately, at the moment, Chrome is the only browser to
really implement [the 4 specifications behind the term Web
Components](https://github.com/w3c/webcomponents/#web-components). In others
browsers, [the support varies from inexistent to
experimental](http://caniuse.com/#search=web%20components) and then [Web
Components polyfills](http://webcomponents.org/polyfills/) are the only way to
have a better support in current browsers. [Polymer version 1.0 was released in
May last
year](https://blog.polymer-project.org/announcements/2015/05/29/one-dot-oh/) and
is said to be *production ready*. [The version 1.3 was released
lately](https://github.com/Polymer/polymer/releases/tag/v1.3.0).

While it's possible to build a single page application with Polymer, it's
probably easier to start by writing a single component. As anybody, I started
with [the Build your first Polymer element
tutorial](https://www.polymer-project.org/1.0/docs/start/first-element/intro.html)
which is a simple way to start but maybe a bit too simple. In any case, the best
way to learn a technology is to really experiment it. That's why I decided to
build a component called `github-user-events` which displays the public events of
a user on Github after fetching them with [the Gitub Events
API](https://developer.github.com/v3/activity/events/). The idea behind this
exercice is also to do it the right way&trade; with the tools, the documentation,
the unit tests and almost everything I would do in a real project. As [the demo
shows](http://dpobel.github.io/github-user-events/components/github-user-events/demo/),
the component is working :-) [The code is on
Github](https://github.com/dpobel/github-user-events) but if I don't
really plan to maintain nor further develop that project.

## In Practice

So in practice, the documentation to follow is [Create a reusable
element](https://www.polymer-project.org/1.0/docs/start/reusableelements.html).
The requirements to start working on your Web Component are quite low and that's
a damn good thing. [bower](http://bower.io),
[polyserve](https://github.com/PolymerLabs/polyserve), your favorite text editor
and basically you are good to start coding.

In the JavaScript code, one of the most important task is [to define the
properties of your
component](https://www.polymer-project.org/1.0/docs/devguide/properties.html).
The properties are a big part (if not 100%) of your component public API. The
properties starting with an underscore are considered private and the same goes
with the methods.

Polymer offers [a catalog of ready to use
elements](https://elements.polymer-project.org/) which can serve as a basis for
your element. For instance, in `github-user-events` I use several [Paper
elements](https://elements.polymer-project.org/browse?package=paper-elements)
(`paper-card`, `paper-item` and `paper-spinner`) which allow to easily follow
[Google's Material Design
recommendations](https://www.google.com/design/spec/material-design/introduction.html).
In my component, I also use another element called
[`iron-ajax`](https://elements.polymer-project.org/elements/iron-ajax). As its name
suggests, it allows to do an AJAX request. At first, in an HTML document,
writing something like:

```xml
<dom-module id="github-user-events">
  <!-- ... -->
  <iron-ajax auto handle-as="json" loading="{{ loading }}"
    on-response="_buildEventList" last-error="{{ error }}"></iron-ajax>
  <script>
    // some JS using Polymer
  </script>
</dom-module>
```

was a bit odd. I guess it's because we are used to see a direct result of a tag
either in the document structure or even the rendered version. Still, this is
very handy and somehow I now see that as the injection of a dependency to do an AJAX
request. After thinking about it, I've also come to the conclusion that I should
have divided my component into two different components: one to deal with the
Github API and an other one to display the event list.

One last handy detail, [the
`seed-element`](https://github.com/polymerelements/seed-element) (the
recommended starting point for a reusable element) provides an index page that
directly generates [an API documentation for the
element](http://dpobel.github.io/github-user-events/components/github-user-events/)
thanks to [the `iron-component-page`
element](https://elements.polymer-project.org/elements/iron-component-page).
That's a good incentive to write some API documentation from day one!

## Unit tests

Unit testing is of course important. By definition, writing small and focused
component should make this step easier but the efficiency in this area is also a
matter of tooling.

The recommended way to unit test a Polymer component is to use [Web Component
Tester](https://github.com/Polymer/web-component-tester). It provides a command
to run unit tests in an environment where several libraries like
[Sinon.JS](http://sinonjs.org/), [Chai](http://chaijs.com/),
[Lodash](https://lodash.com/) or [Mocha](http://mochajs.org/) are already
loaded. Again, that's very handy as this reduces the work *overload* to write
unit tests to a minimum. When running `wct`, the tests are executed in *real*
browsers available on the system. It's at the same time a good and a not so good
thing.  Testing in an environment close to the real execution environment is
interesting but on the other hand, that's quite slow, at least slower than using
a headless browser like [phantomjs](http://phantomjs.org/). Also, while writing
this blog post, I've figured out that Web Component Tester needs a network
access to be executed.

The [Test your elements
page](https://www.polymer-project.org/1.0/tools/tests.html) describes well how
to actually write the unit tests. The only thing I struggled with was that most
of my tests have to be written in the *asycnrhonous way* because of some
internal Polymer optimizations.

[Travis-CI can easily be set up to automate those
tests](https://github.com/dpobel/github-user-events/blob/master/.travis.yml) at
least in Chrome and/or Firefox. For others browsers, it seems like
[SauceLabs](https://saucelabs.com/) is a solution, but I did not test that yet.

## Conclusion

The developer experience is very positive. I managed to build my component quite
quickly with unit tests, a Travis-CI integration and an online demo. I still
have tons of questions on various details and tasks about the component creation
with Polymer but that will be for an other blog post. I think I'll also try to
build a simple but complete Single Page Application because I'm quite curious on
how such application can be architectured but that will also be for an other
blog post.
