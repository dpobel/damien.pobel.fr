#! /usr/bin/env node

var metalsmith = require('metalsmith'),
    conf = require('./build.json'),
    source = conf.source,
    destination = conf.destination,

    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks');

metalsmith(__dirname)
    .source(source)
    .destination(destination)
    .use(collections(conf.collections))
    .use(permalinks(conf.permalinks))
    .use(markdown())
    .use(layouts(conf.layouts))
    .build(function (error, res) {
        if ( error ) {
            console.error("Build failed: " + error.message);
            console.log(error.stack);
            process.exit(1);
        }
        console.log('Build successful in ' + destination + ', wrote:');
        Object.keys(res).forEach(function (key) {
            console.log('- ' + key);
        });

    });
