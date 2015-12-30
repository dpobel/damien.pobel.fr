#! /usr/bin/env node

var metalsmith = require('metalsmith'),
    conf = require('./build.json'),
    source = conf.source,
    destination = conf.destination,
    consolidate = require('consolidate'),
    nunjucks = require('nunjucks'),

    tags = require('metalsmith-tags'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
    pagination = require('metalsmith-pagination'),
    permalinks = require('metalsmith-permalinks');

console.log('Adding custom Nunjucks filters');
consolidate.requires.nunjucks = nunjucks.configure();
require('./lib/nunjucks/filters')(consolidate.requires.nunjucks);

metalsmith(__dirname)
    .source(source)
    .destination(destination)
    .use(tags(conf.tags))
    .use(collections(conf.collections))
    .use(pagination(conf.pagination))
    .use(markdown())
    .use(permalinks(conf.permalinks))
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
