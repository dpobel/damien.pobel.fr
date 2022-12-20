#! /usr/bin/env node

const metalsmith = require("metalsmith");
const conf = require("./build.json");
const source = conf.source;
const destination = conf.destination;
const assetsRev = process.env.ASSET_REV;
const collectPhotos = require("./lib/metalsmith/collect-photos");
const imageVariation = require("./lib/metalsmith/image-variation");
const fileToMetadata = require("./lib/metalsmith/file-to-metadata");
const tagLangFeed = require("./lib/metalsmith/tag-lang-feed");
const renamer = require("metalsmith-renamer");
const htmlMinifier = require("metalsmith-html-minifier");
const ignore = require("@metalsmith/remove");
const postcss = require("@metalsmith/postcss");
const assets = require("metalsmith-assets-2");
const define = require("metalsmith-define");
const feed = require("metalsmith-feed");
const msMoment = require("metalsmith-moment");
const fileMetadata = require("metalsmith-filemetadata");
const tags = require("metalsmith-tags");
const layouts = require("@metalsmith/layouts");
const markdown = require("@metalsmith/markdown");
const collections = require("@metalsmith/collections");
const pagination = require("metalsmith-pagination");
const permalinks = require("@metalsmith/permalinks");
const pdfize = require("metalsmith-pdfize");
const brotli = require("metalsmith-brotli");
const gzip = require("metalsmith-gzip");
const zlib = require("zlib");
const open = require("open");
const detect = require("detect-port");
const spawn = require("child_process").spawn;

const DEV_ENV = process.argv.includes("--dev");
const DEV_PORT = 50112;

conf.tags.slug = require("./lib/sluggify");

let styleRenamePlugin = require("./lib/metalsmith/noop.js");
if (assetsRev) {
  const renamedCss = "style-" + assetsRev + ".css";
  console.log("Preparing style.css renaming to " + renamedCss);

  styleRenamePlugin = renamer;
  conf.styleRenamePlugin = {
    "style.css": {
      pattern: conf.define.css,
      rename: renamedCss,
    },
  };
  conf.define.css = renamedCss;
}

conf.feed.preprocess = require("./lib/metalsmith/feed-postcustomelements.js");
conf.tagLangFeed.preprocess = conf.feed.preprocess;

const filterOutVeilleFn =
  require("./lib/metalsmith/filter-collection.js").excludeWithMetadataFn(
    "weeklyTech"
  );

const keepTopPostFn =
  require("./lib/metalsmith/filter-collection.js").excludeWithoutMetadataFn(
    "top-priority"
  );

conf.collections.lastPosts.filterBy = filterOutVeilleFn;
conf.collections.blog.filterBy = filterOutVeilleFn;
conf.collections.top.filterBy = keepTopPostFn;

const markdownConf = {
  highlight: function (code, language) {
    const hljs = require("highlight.js");

    if (language) {
      return hljs.highlight(code, { language }).value;
    }
    return hljs.highlightAuto(code).value;
  },
};

const pluginsConfList = [
  { plugin: define, conf: conf.define, name: "define", indev: true },
  { plugin: assets, conf: conf.assets, name: "assets", indev: true },
  {
    plugin: postcss,
    conf: require("./postcss.config.js"),
    name: "postcss",
    indev: true,
  },
  { plugin: ignore, conf: conf.ignore, name: "ignore", indev: true },
  { plugin: msMoment, conf: conf.moment, name: "moment", indev: true },
  { plugin: tags, conf: conf.tags, name: "tags", indev: true },
  {
    plugin: collections,
    conf: conf.collections,
    name: "collections",
    indev: true,
  },
  {
    plugin: pagination,
    conf: conf.pagination,
    name: "pagination",
    indev: true,
  },
  {
    plugin: fileMetadata,
    conf: conf.fileMetadata,
    name: "fileMetadata",
    indev: true,
  },
  { plugin: markdown, conf: markdownConf, name: "markdown", indev: true },
  {
    plugin: fileToMetadata,
    conf: conf.fileToMetadata,
    name: "fileToMetadata",
    indev: true,
  },
  {
    plugin: collectPhotos,
    conf: conf.collectPhotos,
    name: "collectPhotos",
    indev: true,
  },
  {
    plugin: permalinks,
    conf: conf.permalinks,
    name: "permalinks",
    indev: true,
  },
  { plugin: feed, conf: conf.feed, name: "feed", indev: true },
  {
    plugin: tagLangFeed,
    conf: conf.tagLangFeed,
    name: "tagLangFeed",
    indev: true,
  },
  {
    plugin: styleRenamePlugin,
    conf: conf.styleRenamePlugin,
    name: "styleRenamePlugin",
    indev: true,
  },
  {
    plugin: layouts,
    conf: {
      directory: "templates",
      engineOptions: { filters: require("./lib/nunjucks/filters") },
    },
    name: "layouts",
    indev: true,
  },
  {
    plugin: htmlMinifier,
    conf: conf.htmlMinifier,
    name: "htmlMinifier",
    indev: false,
  },
  {
    plugin: imageVariation,
    conf: conf.imageVariation,
    name: "imageVariation",
    indev: true,
  },
  { plugin: pdfize, conf: conf["cv-pdf"].pdfize, name: "pdfize", indev: true },
  {
    plugin: renamer,
    conf: conf["cv-pdf"].rename,
    name: "renamer",
    indev: true,
  },
  {
    plugin: brotli,
    conf: {
      options: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
        },
      },
    },
    name: "brotli",
    indev: false,
  },
  { plugin: gzip, conf: conf.gzip, name: "gzip", indev: false },
];

// TODO: this is probably not the right place for that
require("moment").locale("fr");
console.log("Generating the site");
const ms = metalsmith(__dirname).source(source);

pluginsConfList.forEach(function (pluginConf) {
  const timedPlugin = require("./lib/metalsmith/time");

  if ((DEV_ENV && pluginConf.indev) || !DEV_ENV) {
    ms.use(timedPlugin(pluginConf.plugin(pluginConf.conf), pluginConf.name));
  }
});

ms.destination(destination).build(function (error, res) {
  if (error) {
    console.error("Build failed: " + error.message);
    console.log(error.stack);
    process.exit(1);
  }
  if (DEV_ENV) {
    detect(DEV_PORT, (err, port) => {
      if (port === DEV_PORT) {
        spawn("npx", ["static-server", "-p", DEV_PORT], {
          cwd: destination,
          detached: true,
          stdio: "ignore",
        }).unref();
      }
      open(`http://localhost:${DEV_PORT}`, { wait: false });
    });
  }
  console.log("Build successful in " + destination + ", wrote:");
  Object.keys(res).forEach(function (key) {
    console.log("- " + key);
  });
});
