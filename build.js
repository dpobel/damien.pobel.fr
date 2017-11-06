#! /usr/bin/env node

var metalsmith = require('metalsmith'),
    conf = require('./build.json'),
    ms,
    source = conf.source,
    destination = conf.destination,
    consolidate = require('consolidate'),
    nunjucks = require('nunjucks'),
    assetsRev = process.env.ASSET_REV,
    renamedCss,
    styleRenamePlugin = function () {
        return function (files, metalsmith, done) {
            done();
        };
    },

    collectPhotos = require('./lib/metalsmith/collect-photos'),
    imageVariation = require('./lib/metalsmith/image-variation'),
    fileToMetadata = require('./lib/metalsmith/file-to-metadata'),
    tagLangFeed = require('./lib/metalsmith/tag-lang-feed'),

    renamer = require('metalsmith-renamer'),
    htmlMinifier = require('metalsmith-html-minifier'),
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
    permalinks = require('metalsmith-permalinks'),
    pdfize = require('metalsmith-pdfize'),

    pluginsConfList;

console.log('Adding custom Nunjucks filters');
consolidate.requires.nunjucks = nunjucks.configure();
require('./lib/nunjucks/filters')(consolidate.requires.nunjucks);

conf.tags.slug = function (tag) {
    return tag.replace(/ /g, '-');
};

if ( assetsRev ) {
    renamedCss = "style-" + assetsRev + ".css";
    console.log('Preparing style.css renaming to ' + renamedCss);

    styleRenamePlugin = renamer;
    conf.styleRenamePlugin = {
        'style.css': {
            "pattern": conf.define.css,
            "rename": renamedCss,
        }
    };
    conf.define.css = renamedCss;
}

conf.feed.postCustomElements = require('./lib/metalsmith/feed-postcustomelements.js');
conf.tagLangFeed.postCustomElements = conf.feed.postCustomElements;

pluginsConfList = [
    [define, conf.define],
    [assets, conf.assets],
    [fileToMetadata, conf.fileToMetadata],
    [myth, conf.myth],
    [ignore, conf.ignore],
    [msMoment, conf.moment],
    [tags, conf.tags],
    [collections, conf.collections],
    [pagination, conf.pagination],
    [fileMetadata, conf.fileMetadata],
    [metallic],
    [markdown],
    [collectPhotos, conf.collectPhotos],
    [permalinks, conf.permalinks],
    [feed, conf.feed],
    [tagLangFeed, conf.tagLangFeed],
    [styleRenamePlugin, conf.styleRenamePlugin],
    [layouts, conf.layouts],
    [imageVariation, conf.imageVariation],
    [htmlMinifier],
    [pdfize, conf['cv-pdf'].pdfize],
    [renamer, conf['cv-pdf'].rename],
];

console.log('Generating the site');
ms = metalsmith(__dirname)
    .source(source);

pluginsConfList.forEach(function (pluginConf) {
    ms.use(pluginConf[0](pluginConf[1]));
});

ms.destination(destination)
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
