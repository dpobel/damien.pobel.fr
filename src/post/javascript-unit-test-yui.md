---
title: "JavaScript unit tests with YUI Test"
tags: yui, unit test, javascript, frontend
lang: "en"
published: 2014-02-17T13:45:46+01:00
photos:
    - images/unit-test.gif
---

<figure class="object-left"><img loading="lazy" src="/images/unit-test.gif"
alt="Hey! Let's unit test!"><figcaption>Hey! Let's unit test!</figcaption></figure>

For some months now, I have been working on a single page application based on
[YUI](http://yuilibrary.com); it's not public yet, but hopefully, it should be
in a few months. Of course, each part of the application is unit tested and the
natural choice in this context is to use [YUI
Test](http://yuilibrary.com/yui/docs/test/). The documentation of the YUI Test
component is quite good but when I started the project, I missed a more *step by
step* tutorial on how to test a custom component and on which tools I need to
install. For those who are used to write unit tests for *backend code*, testing
frontend JavaScript code is not fundamentally different, you still need to write
code that can be tested and then you can write the tests and run them.

## Code example

First, we need some code to be tested. To keep this post simple, I wrote a very
simple [YUI view](http://yuilibrary.com/yui/docs/view/) called *Move it view*, it
does not do much:

1. when it is rendered, it adds a class on its container and it enables a button
1. when the user *taps* on the button, it disables the button and adds a class
   which makes it in movements.

You can test it on [my Github pages](http://dpobel.github.io/yui-test-example/)
and look at [the source code on Github as
well](https://github.com/dpobel/yui-test-example/blob/master/moveitview.js). I
know, the only way to stop the movement is to refresh the page, it's because *I
like to move it* ;-) More seriously, this small list of features gives us what
we'll have to test, the more you add features, the more you need to test.

## Writing the tests!

### Structure

The first thing to write is the HTML file which will be used to bootstrap the
tests. It can directly contain the test cases but I personnally prefer to put
the test cases in an external JavaScript file. Since the *Move it view*
enhances an existing markup, a simplified version of this markup (the `div
class="container"` here) needs to be embed in the HTML:

```xml
<!doctype html>
<html>
<head><title>Move it view tests</title></head>
<body>

<div class="container">
    <button disabled="disabled" class="moveit">Move!</button>
</div>

<script type="text/javascript" src="http://yui.yahooapis.com/3.14.1/build/yui/yui-min.js"></script>
<script type="text/javascript" src="moveitview-tests.js"></script>
<script>
    (function (win) {
        var filter = (win.location.search.match(/[?&]filter=([^&]+)/) || [])[1];
        YUI({
            coverage: ['moveitview'],
            modules: {
                "moveitview": {
                    requires: ['event-tap', 'node', 'view'],
                    fullpath: "../moveitview" + (filter ? "-" + filter : "") + ".js"
                }
            }
        }).use('moveitview-tests', function (Y) {
            Y.Test.Runner.run();
        });
    })(window);
</script>
</body>
</html>
```

Note: to be able run the test file online, I reference the YUI version hosted on
Yahoo's CDN but for performances sake and to be able to run the tests offline,
it's better to use a local version of YUI.

And then you'll have to write the `moveitview-tests.js` file which skeleton is:

```js
YUI.add('moveitview-tests', function (Y) {
    "use strict";
    var test;

    test = new Y.Test.Case({
        name: "Move it view tests",
        setUp: function () { /* run before each test */ },
        tearDown: function () { /* clean state between tests */},
        "Test render": function () { /* test the first feature above */ },
        "Test move it button": function () { /* test the button behavior */ },
    });

    Y.Test.Runner.setName("Move it view tests");
    Y.Test.Runner.add(test);
}, '0.0.1', {
    requires: [
        'test', 'moveitview', 'node-event-simulate'
        /* and others dependencies for the test */
    ]
});
```

Of course, it's possible to define several test cases to test different aspects
of a given component. It's also possible to organize the test cases into [test
suites](http://yuilibrary.com/yui/docs/test/#testsuites).

### `setUp` and `tearDown`

The purpose of `setUp` and `tearDown` is well explained in [the YUI Test
documentation](http://yuilibrary.com/yui/docs/test/#setup-and-teardown), `setUp`
is the place where you can store an instance of the object to test or
any data you'll need. In `tearDown`, you usually do the exact opposite of
`setUp`, the main point here is to make sure the initial state is
restored so that there's no hidden dependencies between tests which might hide
or trigger weird bugs!

So in the case of the *Move it view*, that's pretty simple, it's just a matter
of initializing the view and to make sure it's correctly destroyed:

```js
setUp: function () {
    this.view = new Y.my.MoveItView({
        container: '.container'
    });
},

tearDown: function () {
    this.view.destroy();
    delete this.view;
},

```

### Test methods

This is the **interesting** part! At this stage, each public method should have
at least one test. In the example of the *Move it view*, the `render` method can
be tested with the following code:

```js
"Test render": function () {
    var container = this.view.get('container');

    this.view.render();
    Y.Assert.isTrue(
        container.hasClass('is-moveitview-rendered'),
        "The view container should get the 'rendered' class"
    );
    container.all('button').each(function (button) {
        Y.Assert.isFalse(button.get('disabled'), "The button should be enabled");
    });
},
```

That's quite straighforward, `render` is supposed to add a class on the view
container and to enable to the button(s) inside the view so the test method
checks that. The basic assertions are described in [the YUI Test guide
page](http://yuilibrary.com/yui/docs/test/#assertions) and you can find others
more advanced assertions in [the API documentation of the `test`
module](http://yuilibrary.com/yui/docs/api/modules/test.html).

The handling of a `tap` event on the button is the second feature of the *Move
it view*. From a unit test point of view, that's a bit different since the event
handler is a protected method so in this case, we'll have to simulate the event
to reach the code and to test it. For that, YUI provides the `node-event-simulate`
module which allows [to simulate the DOM
events](http://yuilibrary.com/yui/docs/event/simulate.html) and even some custom
events like `tap`. For this one, it's worth mentioning that the
`simulateGesture` method is asynchronous so [the usage of
`wait()`/`resume()`](http://yuilibrary.com/yui/docs/test/#asynctests) becomes
mandatory (it took me a while to figure that out):

```js
"Test move it button": function () {
    var container = this.view.get('container'),
        button = container.one('.moveit');

    this.view.render();
    button.simulateGesture('tap', Y.bind(function () {
        this.resume(function () {
            Y.Assert.isTrue(
                button.get('disabled'),
                "The button should be disabled"
            );
            Y.Assert.isTrue(
                container.hasClass('moveitview-shake'),
                "The container should have the 'shake' class"
            );
        });
    }, this));
    this.wait();
},
```

[The full source of the test can be found on
Github](https://github.com/dpobel/yui-test-example/blob/master/tests/moveitview-tests.js)

## Running the tests

[The tests can be run in a regular
browser](http://dpobel.github.io/yui-test-example/tests/moveitview.html), since
I did not add [a YUI Console](http://yuilibrary.com/yui/docs/test-console/), you
need to open the browser's console to see the results. But the point of unit
tests is to automate their running on a CI server (and it's very useful to be
able to run them quickly on the developer's machine).

To do that, first, you need to [install Node.js](http://nodejs.org/download/)
and [PhantomJS](http://phantomjs.org/download.html) and then you can install
[grover](https://github.com/yui/grover) with the following command (you need to
be root to install it globally):

```
# npm install -g grover
```

Once installed, you can then run the unit tests with:

```
$ grover --server tests/moveitview.html 
Starting Grover on 1 files with PhantomJS@1.6.0
  Running 15 concurrent tests at a time.
  starting grover server
  assuming server root as /home/dp/dev/perso/yui-unit-test
✔ [Move it view tests]: Passed: 2 Failed: 0 Total: 2 (ignored 0) (0.056 seconds)
----------------------------------------------------------------
✔ [Total]: Passed: 2 Failed: 0 Total: 2 (ignored 0) (0.056 seconds)
  [Grover Execution Timer] 0.848 seconds
```

Woohoo! All passed! ;-)

grover runs PhantomJS which is a headless browser based on Webkit so it behaves
more or less like Chrome or Safari. There's an equivalent for Gecko (the engine
behind Firefox) called [SlimerJS](http://slimerjs.org/) which can also be used
through grover thanks to the `--phantom-bin` option:

```
$ grover --server --phantom-bin path/to/slimerjs tests/moveitview.html
```

Unlike, PhantomJS, SlimerJS is not yet completely headless, so by default some
white windows will appear. [As mentioned in the SlimerJS
documentation](http://docs.slimerjs.org/current/installation.html#having-a-headless-slimerjs),
it's possible to use `xvfb-run` to avoid that.

And what if you want to run automated tests in *real* browsers? That's also
possible thanks to a tool called [Yeti](http://yeti.cx/) but that will be for a
next post as this one is already too long.

In the YUI world, You might also have heard about a tool called
[yogi](http://yui.github.io/yogi/). It does a lot more than just running the
unit tests and [when it runs
tests](http://yui.github.io/yogi/testing/index.html), it actually calls grover,
but you need to follow the YUI module directory structure to use it. [This blog
post](http://bretkikehara.wordpress.com/2013/03/21/yui3-yogi-module-creation-and-tests/)
explains how to set it up if you want to follow this convention.

## Code coverage

Maybe, you've noticed in the test HTML file, the `coverage` option passed to the
`YUI` function and the small trick on the `moveitview` module's full path. This
is to configure the test in *coverage mode* when the URI of the test page has a
query string containing `filter=coverage`.

grover also has some options to generate
a code coverage report in different format but to do this, you first have to
install [Istanbul](https://github.com/gotwarlost/istanbul) and  to *instrument*
your JavaScript code with it.

Installation of Istanbul:

```
# npm install -g istanbul
```

Then to instrument the code, you can run:

```
$ istanbul instrument moveitview.js > moveitview-coverage.js
```

Of course, in a real project with several files, this step would be automated
with a build script like [Grunt](http://gruntjs.com/) or
[Gulp](http://gulpjs.com/) for instance.

And after that, the coverage can be generated with:

```
$ grover --server --coverage -S '?filter=coverage' tests/moveitview.html 
[…]
--------------------+-----------+-----------+-----------+-----------+
File                |   % Stmts |% Branches |   % Funcs |   % Lines |
--------------------+-----------+-----------+-----------+-----------+
   yui-unit-test/   |       100 |       100 |       100 |       100 |
      moveitview.js |       100 |       100 |       100 |       100 |
--------------------+-----------+-----------+-----------+-----------+
All files           |       100 |       100 |       100 |       100 |
--------------------+-----------+-----------+-----------+-----------+

=============================== Coverage summary ===============================
Statements   : 100% ( 6/6 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 6/6 )
================================================================================
----------------------------------------------------------------
✔ [Total]: Passed: 2 Failed: 0 Total: 2 (ignored 0) (0.051 seconds)
  [Grover Execution Timer] 0.716 seconds
```

Woohoo, 100% coverage! ;-) That said, having a high coverage does not mean the
code is well tested, it just means that every single code part is called during
the test. For instance, if in the tests, I remove all the assertions, the
coverage will still be 100%!

grover is also able to generate a fully browseable HTML coverage with the
`--coverdir` option. [The report for the *Move it view* is available in the
Github
pages](http://dpobel.github.io/yui-test-example/coverage/lcov-report/yui-unit-test/).

## The end (for now)

I originally planned to add a tips part on various topics (mock, asynchronous
test,…) in this post, but it's already too long so that will be for a next
post. I hope you found this article helpful; you now have no excuse to not unit
test your YUI based JavaScript code ;-)
