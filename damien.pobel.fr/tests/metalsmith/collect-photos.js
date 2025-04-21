import assert from "node:assert";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import collections from "@metalsmith/collections";
import metalsmith from "metalsmith";
import tags from "metalsmith-tags";
import collectPhotos from "../../lib/metalsmith/collect-photos.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("collectPhotos metalsmith plugin", () => {
  let ms;
  let buildError;
  const lastPhotosNumber = 2;

  beforeEach((done) => {
    ms = metalsmith(__dirname);
    ms.source("fixtures/collect-photos/src")
      .use(collections({ posts: { pattern: "*.html", sortBy: "test" } }))
      .use(tags({ handle: "tags" }))
      .use(collectPhotos({ lastPhotosNumber: lastPhotosNumber }))
      .build((error) => {
        buildError = error;
        done();
      });
  });

  it("should not throw any error", () => {
    assert.ifError(buildError);
  });

  it("should add the `photos` list", () => {
    const file = ms.metadata().posts[0];

    assert(Array.isArray(file.photos));
    assert.equal(2, file.photos.length);
  });

  it("should not add an empty photos list", () => {
    const file = ms.metadata().posts[1];

    assert.strictEqual(undefined, file.photos);
  });

  it("should normalize the path", () => {
    const file = ms.metadata().posts[2];

    assert.equal("images/photo.jpg", file.photos[0]);
  });

  it("should add the original path to the list", () => {
    const file = ms.metadata().posts[3];

    assert.equal("images/photo.jpg", file.photos[0]);
  });

  it("should ignore non photo post", () => {
    const file = ms.metadata().posts[4];

    assert.strictEqual(undefined, file.photos);
  });

  it("should collect the last photos", () => {
    const last = ms.metadata().lastPhotos;
    const files = ms.metadata().posts;

    assert(Array.isArray(last));
    assert.equal(last.length, 1);
    assert.equal(files[0].title, last[0].title);
  });
});
