/* global describe, it, before */
const assert = require("assert");
const metalsmith = require("metalsmith");
const tags = require("metalsmith-tags");
const tagLangFeed = require("../../lib/metalsmith/tag-lang-feed");

describe("tagLangFeed metalsmith plugin", function () {
  let ms, buildError, buildFiles;

  before(function (done) {
    ms = metalsmith(__dirname);
    ms.source("fixtures/tag-lang-feed/src")
      .use(function (files, metalsmith, done) {
        const metadata = metalsmith.metadata();

        metadata.collections = { posts: [] };
        Object.keys(files).forEach(function (path) {
          metadata.collections.posts.push(files[path]);
        });
        metadata.site = { url: "http://damien.pobel.fr" };
        done();
      })
      .use(tags({ handle: "tags", metadataKey: "tagsList" }))
      .use(tagLangFeed({ addFrFilter: ["addfr"] }))
      .build(function (error, result) {
        buildError = error;
        buildFiles = result;
        done();
      });
  });

  it("should not throw any error", function () {
    assert.ifError(buildError);
  });

  it("should add the feed for the tags", function () {
    assert(buildFiles["rss/tag1.xml"]);
    assert(buildFiles["rss/tag2.xml"]);
    assert(buildFiles["rss/tag-3.xml"]);
    assert(buildFiles["rss/addfr.xml"]);
  });

  it('should add the feed filtered by "fr"', function () {
    assert(buildFiles["rss/addfr/fr.xml"]);
  });
});
