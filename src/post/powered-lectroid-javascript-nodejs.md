---
title: "Powered by Lectroid, JavaScript and Node.js"
tags: javascript, blog, lectroid, node.js
published: 2013-03-06T21:40:40+01:00
---

[This blog is now powered by Lectroid](/post/console-log-hello-world), a very
nice blog engine found by chance on
[Github](https://github.com/rgrove/lectroid). In short:

* it is written in JavaScript for Node.js
* it does not need any database
* it is small enough (~800 JavaScript lines without my changes) that I've read and understood every single line of code
* it is easy to extend
* the posts can be written in Markdown (or HTML)
* it is damn **fast**

Lectroid does not have any administration interface. That might sound a bit old
school but that's actually a strong asset (at least for a geek like me :)). I
can completely write my post offline with my favorite text editor, and when I'm
done, I commit and push on a private git repository. Then, a git post receive
script mirrors the changes in the directory watched by Lectroid and it does the
rest!

I also added some features and that was very easy thanks to some great node
modules:

* a system to resize images with [IMGR](https://npmjs.org/package/imgr)
* a custom CSS management system to merge and minify (with
  [clean-css](https://npmjs.org/package/clean-css)) the stylesheets in the
  production environment while still keeping the development easy
* the syntax highlighting of the code snippets with
  [highlight.js](https://npmjs.org/package/highlight.js)

I'm quite happy with the result even if I still have to polish stuff here and
there.
