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
    postcss = require('metalsmith-postcss2'),
    assets = require('metalsmith-assets'),
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
    brotli = require('metalsmith-brotli'),
    gzip = require('metalsmith-gzip'),

    zlib = require('zlib'),
    open = require('open'),
    detect = require('detect-port'),
    spawn = require('child_process').spawn,
    pluginsConfList;

const DEV_ENV = process.argv.includes('--dev');
const DEV_PORT = 50112;

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

conf.feed.preprocess = require('./lib/metalsmith/feed-postcustomelements.js');
conf['feed-no-veille'].preprocess = conf.feed.preprocess;
conf.tagLangFeed.preprocess = conf.feed.preprocess;

const filterOutVeilleFn = require('./lib/metalsmith/filter-collection.js').excludeWithMetadataFn('weeklyTech');

conf.collections.lastPosts.filterBy = filterOutVeilleFn;
conf.collections.blog.filterBy = filterOutVeilleFn;

const markdownConf = {
    highlight: function (code, lang) {
        const hljs = require('highlight.js');

        if (lang) {
            return hljs.highlight(lang, code).value;
        }
        return hljs.highlightAuto(code).value;
    },
};

pluginsConfList = [
    {plugin: define, conf: conf.define, name: 'define', indev: true},
    {plugin: assets, conf: conf.assets, name: 'assets', indev: true},
    {plugin: postcss, conf: undefined, name: 'postcss', indev: true},
    {plugin: ignore, conf: conf.ignore, name: 'ignore', indev: true},
    {plugin: msMoment, conf: conf.moment, name: 'moment', indev: true},
    {plugin: tags, conf: conf.tags, name: 'tags', indev: true},
    {plugin: collections, conf: conf.collections, name: 'collections', indev: true},
    {plugin: pagination, conf: conf.pagination, name: 'pagination', indev: true},
    {plugin: fileMetadata, conf: conf.fileMetadata, name: 'fileMetadata', indev: true},
    {plugin: markdown, conf: markdownConf, name: 'markdown', indev: true},
    {plugin: fileToMetadata, conf: conf.fileToMetadata, name: 'fileToMetadata', indev: true},
    {plugin: collectPhotos, conf: conf.collectPhotos, name: 'collectPhotos', indev: true},
    {plugin: permalinks, conf: conf.permalinks, name: 'permalinks', indev: true},
    {plugin: feed, conf: conf.feed, name: 'feed', indev: true},
    {plugin: feed, conf: conf['feed-no-veille'], name: 'feed-no-veille', indev: true},
    {plugin: tagLangFeed, conf: conf.tagLangFeed, name: 'tagLangFeed', indev: true},
    {plugin: styleRenamePlugin, conf: conf.styleRenamePlugin, name: 'styleRenamePlugin', indev: true},
    {plugin: layouts, conf: {directory: "templates", engineOptions: {filters: require('./lib/nunjucks/filters')}}, name: 'layouts', indev: true},
    {plugin: htmlMinifier, conf: conf.htmlMinifier, name: 'htmlMinifier', indev: false},
    {plugin: imageVariation, conf: conf.imageVariation, name: 'imageVariation', indev: true},
    {plugin: pdfize, conf: conf['cv-pdf'].pdfize, name: 'pdfize', indev: true},
    {plugin: renamer, conf: conf['cv-pdf'].rename, name: 'renamer', indev: true},
    {plugin: brotli, conf: {options: {params: {[zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY}}}, name: 'brotli', indev: false},
    {plugin: gzip, conf: conf.gzip, name: 'gzip', indev: false},
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
    if ( DEV_ENV && pluginConf.indev || !DEV_ENV ) {
        ms.use(timedPlugin(pluginConf.plugin(pluginConf.conf), pluginConf.name));
    }
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
                open(`http://localhost:${DEV_PORT}`, {wait: false});
            });
        }
        console.log('Build successful in ' + destination + ', wrote:');
        Object.keys(res).forEach(function (key) {
            console.log('- ' + key);
        });
    });
