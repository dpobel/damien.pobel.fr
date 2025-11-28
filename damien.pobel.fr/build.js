#! /usr/bin/env node

import { spawn } from "node:child_process";
import fsPromises from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import collections from "@metalsmith/collections";
import layouts from "@metalsmith/layouts";
import markdown from "@metalsmith/markdown";
import permalinks from "@metalsmith/permalinks";
import postcss from "@metalsmith/postcss";
import ignore from "@metalsmith/remove";
import detect from "detect-port";
import hljs from "highlight.js";
import metalsmith from "metalsmith";
import assets from "metalsmith-assets-2";
import brotli from "metalsmith-brotli";
import feed from "metalsmith-feed";
import fileMetadata from "metalsmith-filemetadata";
import gzip from "metalsmith-gzip";
import htmlMinifier from "metalsmith-html-minifier";
import msMoment from "metalsmith-moment";
import pagination from "metalsmith-pagination";
import pdfize from "metalsmith-pdfize";
import renamer from "metalsmith-renamer";
import tags from "metalsmith-tags";
import moment from "moment";
import open from "open";
import collectPhotos from "./lib/metalsmith/collect-photos.js";
import feedPostCustomElement from "./lib/metalsmith/feed-postcustomelements.js";
import fileToMetadata from "./lib/metalsmith/file-to-metadata.js";
import {
  excludeWithMetadataFn,
  excludeWithoutMetadataFn,
} from "./lib/metalsmith/filter-collection.js";
import imageVariation from "./lib/metalsmith/image-variation.js";
import noopPlugin from "./lib/metalsmith/noop.js";
import outdatedPostPlugin from "./lib/metalsmith/outdated-post.js";
import tagLangFeed from "./lib/metalsmith/tag-lang-feed.js";
import timedPlugin from "./lib/metalsmith/time.js";
import nunjuckFilters from "./lib/nunjucks/filters.js";
import sluggify from "./lib/sluggify.js";
import postCssConfig from "./postcss.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const conf = JSON.parse(
  await fsPromises.readFile(`${__dirname}/build.json`, { encoding: "utf-8" }),
);

const source = conf.source;
const destination = conf.destination;
const assetsRev = process.env.ASSET_REV;

const DEV_ENV = process.argv.includes("--dev");
const DEV_PORT = 50112;

conf.tags.slug = sluggify;

let styleRenamePlugin = noopPlugin;
if (assetsRev) {
  const renamedCss = `style-${assetsRev}.css`;
  console.log(`Preparing style.css renaming to ${renamedCss}`);

  styleRenamePlugin = renamer;
  conf.styleRenamePlugin = {
    "style.css": {
      pattern: conf.metadata.css,
      rename: renamedCss,
    },
  };
  conf.metadata.css = renamedCss;
}

conf.feed.preprocess = feedPostCustomElement;
conf.tagLangFeed.preprocess = conf.feed.preprocess;

const filterOutVeilleFn = excludeWithMetadataFn("weeklyTech");
const keepTopPostFn = excludeWithoutMetadataFn("top-priority");

conf.collections.lastPosts.filterBy = filterOutVeilleFn;
conf.collections.blog.filterBy = filterOutVeilleFn;
conf.collections.top.filterBy = keepTopPostFn;

const markdownConf = {
  highlight: (code, language) => {
    if (language) {
      return hljs.highlight(code, { language }).value;
    }
    return hljs.highlightAuto(code).value;
  },
};

const pluginsConfList = [
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
    conf: {
      ...conf.permalinks,
      slug: (url) => sluggify(url).replace("'", "-"),
    },
    name: "permalinks",
    indev: true,
  },
  {
    plugin: feed,
    conf: conf.feed,
    name: "feed",
    indev: true,
  },
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
  { plugin: outdatedPostPlugin, name: "outdatedPlugin", indev: true },
  {
    plugin: layouts,
    conf: {
      directory: "templates",
      transform: "nunjucks",
      engineOptions: { filters: nunjuckFilters },
      pattern: "**/*",
    },
    name: "layouts",
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
const ms = metalsmith(__dirname).source(source);

pluginsConfList.forEach((pluginConf) => {
  if ((DEV_ENV && pluginConf.indev) || !DEV_ENV) {
    ms.use(timedPlugin(pluginConf.plugin(pluginConf.conf), pluginConf.name));
  }
});

ms.destination(destination)
  .metadata(conf.metadata)
  .build((error, res) => {
    if (error) {
      console.error(`Build failed: ${error.message}`);
      console.log(error.stack);
      process.exit(1);
    }
    if (DEV_ENV) {
      detect(DEV_PORT, (_err, port) => {
        if (port === DEV_PORT) {
          spawn("npx", ["static-server", "-p", DEV_PORT], {
            cwd: join(__dirname, destination),
            detached: true,
            stdio: "ignore",
          }).unref();
        }
        open(`http://localhost:${DEV_PORT}`, { wait: false });
      });
    }
    console.log(`Build successful in ${destination}, wrote:`);
    Object.keys(res).forEach((key) => {
      console.log(`- ${key}`);
    });
  });
