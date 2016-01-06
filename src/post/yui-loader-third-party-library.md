---
title: "Load a third party library with the YUI Loader"
tags: yui, javascript
lang: "en"
published: 2013-07-10T23:54:46+02:00
---

Today, I wanted to load a third party JavaScript library in a project based on
the YUI framework. The most obvious way of doing that is to statically include the
library with a regular `script` tag and then to rely on the global variable(s)
exported by it. Of course it's working but that's pity to not use [the Loader
included in YUI](http://yuilibrary.com/yui/docs/yui/loader.html).

This topic was mentionned in the [YUI Weekly for June 21st,
2013](http://www.yuiblog.com/blog/2013/06/21/yui-weekly-for-june-21st-2013/)
with [a demonstration](http://jsbin.com/akevej/3/edit) of [Ryan
Grove](http://wonko.com/) on how to include [Moment.js](http://momentjs.com/)
and [Three.js](http://threejs.org/) in YUI. While Ryan's code is working well,
it's not optimal because it relies on the `onProgress` event which is triggered
each time a dynamic `script` tag finishes to load, so depending on the amount of
modules you need, the `onProgress` function might be called several times.
`onSuccess` does not have this behaviour, so here's my version based on this
event:

```javascript
YUI({
    groups: {
        'cdnjs': {
            base : '//cdnjs.cloudflare.com/ajax/libs',
            modules: {
                'moment' : {
                    path: '/moment.js/2.0.0/moment.min.js'
                },
                'three': {
                    path: '/three.js/r58/three.min.js'
                }
            }
        }
    },
    onSuccess: function (e) {      
        for (var i = 0, len = e.data.length; i < len; ++i) {
            if ( e.data[i] === 'moment' ) {
                YUI.add('moment', function (Y){
                    Y.moment = moment;
                });
            } else if ( e.data[i] === 'three' ) {
                YUI.add('three', function (Y) {
                    Y.THREE = THREE;
                });
            }
        }
    }
}).use('moment', 'three', function (Y) {
    // Y.moment and Y.THREE are available
});
```

This example is available in [this JS bin](http://jsbin.com/inoyuf/2/edit) and
as you can see, the YUI Loader is perfectly able to load those external
libraries and with the small trick in `onSuccess`, the dependencies are cleanly
available in the YUI sandbox.
