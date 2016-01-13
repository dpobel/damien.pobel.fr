#! /usr/bin/env node

var metalsmith = require('metalsmith'),
    conf = require('./build.json'),
    source = conf.source,
    destination = conf.destination,
    consolidate = require('consolidate'),
    nunjucks = require('nunjucks'),

    collectPhotos = require('./lib/metalsmith/collect-photos'),
    imageVariation = require('./lib/metalsmith/image-variation'),

    ignore = require('metalsmith-ignore'),
    myth = require('metalsmith-myth'),
    assets = require('metalsmith-assets'),
    metallic = require('metalsmith-metallic'),
    define = require('metalsmith-define'),
    feed = require('metalsmith-feed'),
    msMoment = require('metalsmith-moment'),
    fileMetadata = require('metalsmith-filemetadata'),
    tags = require('metalsmith-tags'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
    pagination = require('metalsmith-pagination'),
    permalinks = require('metalsmith-permalinks');

console.log('Adding custom Nunjucks filters');
consolidate.requires.nunjucks = nunjucks.configure();
require('./lib/nunjucks/filters')(consolidate.requires.nunjucks);

console.log('Generating the site');
metalsmith(__dirname)
    .source(source)
    .destination(destination)
    .use(define(conf.define))
    .use(assets(conf.assets))
    .use(myth(conf.myth))
    .use(ignore(conf.ignore))
    .use(msMoment(conf.moment))
    .use(tags(conf.tags))
    .use(collections(conf.collections))
    .use(pagination(conf.pagination))
    .use(fileMetadata(conf.fileMetadata))
    .use(metallic())
    .use(markdown())
    .use(collectPhotos(conf.collectPhotos))
    .use(permalinks(conf.permalinks))
    .use(feed(conf.feed))
    .use(layouts(conf.layouts))
    .use(imageVariation(conf.imageVariation))
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
