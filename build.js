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

    opn = require('opn'),
    detect = require('detect-port'),
    spawn = require('child_process').spawn,
    pluginsConfList;

const DEV_ENV = process.argv.includes('--dev');
const DEV_PORT = 50112;

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
    [define, conf.define, 'define'],
    [assets, conf.assets, 'assets'],
    [fileToMetadata, conf.fileToMetadata, 'fileToMetadata'],
    [myth, conf.myth, 'myth'],
    [ignore, conf.ignore, 'ignore'],
    [msMoment, conf.moment, 'moment'],
    [tags, conf.tags, 'tags'],
    [collections, conf.collections, 'collections'],
    [pagination, conf.pagination, 'pagination'],
    [fileMetadata, conf.fileMetadata, 'fileMetadata'],
    [metallic, undefined, 'metallic'],
    [markdown, undefined, 'markdown'],
    [collectPhotos, conf.collectPhotos, 'collectPhotos'],
    [permalinks, conf.permalinks, 'permalinks'],
    [feed, conf.feed, 'feed'],
    [tagLangFeed, conf.tagLangFeed, 'tagLangFeed'],
    [styleRenamePlugin, conf.styleRenamePlugin, 'styleRenamePlugin'],
    [layouts, conf.layouts, 'layouts'],
    [htmlMinifier, conf.htmlMinifier, 'htmlMinifier'],
    [imageVariation, conf.imageVariation, 'imageVariation'],
    [pdfize, conf['cv-pdf'].pdfize, 'pdfize'],
    [renamer, conf['cv-pdf'].rename, 'renamer'],
];

function timedPlugin(plugin, name) {
    return function (files, metalsmith, done) {
        console.time(name);
        plugin(files, metalsmith, function () {
            console.timeEnd(name);
            done.apply(this, arguments);
        });
    };
}

console.log('Generating the site');
ms = metalsmith(__dirname)
    .source(source);

pluginsConfList.forEach(function (pluginConf) {
    ms.use(timedPlugin(pluginConf[0](pluginConf[1]), pluginConf[2]));
});

ms.destination(destination)
    .build(function (error, res) {
        if ( error ) {
            console.error("Build failed: " + error.message);
            console.log(error.stack);
            process.exit(1);
        }
        if ( DEV_ENV ) {
            detect(DEV_PORT, (err, port) => {
                if ( port === DEV_PORT ) {
                    spawn('npx', ['static-server', '-p', DEV_PORT], {
                        cwd: destination,
                        detached: true,
                        stdio: 'ignore',
                    }).unref();
                }
                opn(`http://localhost:${DEV_PORT}`, {wait: false});
            });
        }
        console.log('Build successful in ' + destination + ', wrote:');
        Object.keys(res).forEach(function (key) {
            console.log('- ' + key);
        });
    });
