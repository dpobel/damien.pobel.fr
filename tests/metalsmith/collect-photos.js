/* global describe, it, beforeEach */
const assert = require("assert");
const metalsmith = require("metalsmith");
const collections = require("@metalsmith/collections");
const tags = require("metalsmith-tags");
const collectPhotos = require("../../lib/metalsmith/collect-photos");

describe("collectPhotos metalsmith plugin", function () {
  let ms;
  let buildError;
  let lastPhotosNumber = 2;

  beforeEach(function (done) {
    ms = metalsmith(__dirname);
    ms.source("fixtures/collect-photos/src")
      .use(collections({ posts: { pattern: "*.html", sortBy: "test" } }))
      .use(tags({ handle: "tags" }))
      .use(collectPhotos({ lastPhotosNumber: lastPhotosNumber }))
      .build(function (error) {
        buildError = error;
        done();
      });
  });

  it("should not throw any error", function () {
    assert.ifError(buildError);
  });

  it("should add the `photos` list", function () {
    const file = ms.metadata().posts[0];

    assert(Array.isArray(file.photos));
    assert.equal(2, file.photos.length);
  });

  it("should not add an empty photos list", function () {
    const file = ms.metadata().posts[1];

    assert.strictEqual(undefined, file.photos);
  });

  it("should normalize the path", function () {
    const file = ms.metadata().posts[2];

    assert.equal("images/photo.jpg", file.photos[0]);
  });

  it("should add the original path to the list", function () {
    const file = ms.metadata().posts[3];

    assert.equal("images/photo.jpg", file.photos[0]);
  });

  it("should ignore non photo post", function () {
    const file = ms.metadata().posts[4];

    assert.strictEqual(undefined, file.photos);
  });

  it("should collect the last photos", function () {
    const last = ms.metadata().lastPhotos;
    const files = ms.metadata().posts;

    assert(Array.isArray(last));
    assert.equal(last.length, 1);
    assert.equal(files[0].title, last[0].title);
  });
});
