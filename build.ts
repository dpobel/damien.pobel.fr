import metalsmith from "metalsmith";
import collectPhotos from "./lib/metalsmith/collect-photos";
import imageVariation from "./lib/metalsmith/image-variation";
import fileToMetadata from "./lib/metalsmith/file-to-metadata";
import tagLangFeed from "./lib/metalsmith/tag-lang-feed";
import renamer from "metalsmith-renamer";
import htmlMinifier from "metalsmith-html-minifier";
import ignore from "@metalsmith/remove";
import postcss from "@metalsmith/postcss";
import assets from "metalsmith-assets-2";
import define from "metalsmith-define";
import feed from "metalsmith-feed";
import msMoment from "metalsmith-moment";
import fileMetadata from "metalsmith-filemetadata";
import tags from "metalsmith-tags";
import layouts from "@metalsmith/layouts";
import markdown from "@metalsmith/markdown";
import collections from "@metalsmith/collections";
import pagination from "metalsmith-pagination";
import permalinks from "@metalsmith/permalinks";
import pdfize from "metalsmith-pdfize";
import brotli from "metalsmith-brotli";
import gzip from "metalsmith-gzip";
import zlib from "zlib";
import open from "open";
import detect from "detect-port";
import { spawn } from "child_process";
import sluggify from "./lib/sluggify";
import noopPlugin from "./lib/metalsmith/noop";
import timedPlugin from "./lib/metalsmith/time";
import feedPostCustomElement from "./lib/metalsmith/feed-postcustomelements";
import {
  excludeWithMetadataFn,
  excludeWithoutMetadataFn,
} from "./lib/metalsmith/filter-collection";
import hljs from "highlight.js";
import postCssConfig from "./postcss.config";
import nunjuckFilters from "./lib/nunjucks/filters";
import moment from "moment";
import conf from "./build.json";

const source = conf.source;
const destination = conf.destination;
const assetsRev = process.env.ASSET_REV;

const DEV_ENV = process.argv.includes("--dev");
const DEV_PORT = "50112";

conf.tags.slug = sluggify;

let styleRenamePlugin = noopPlugin;
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

conf.feed.preprocess = feedPostCustomElement;
conf.tagLangFeed.preprocess = conf.feed.preprocess;

const filterOutVeilleFn = excludeWithMetadataFn("weeklyTech");
const keepTopPostFn = excludeWithoutMetadataFn("top-priority");

conf.collections.lastPosts.filterBy = filterOutVeilleFn;
conf.collections.blog.filterBy = filterOutVeilleFn;
conf.collections.top.filterBy = keepTopPostFn;

const markdownConf = {
  highlight: function (code, language) {
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
    conf: postCssConfig,
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
      engineOptions: { filters: nunjuckFilters },
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
moment.locale("fr");
console.log("Generating the site");
const ms = metalsmith(process.cwd()).source(source);

pluginsConfList.forEach(function (pluginConf) {
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
