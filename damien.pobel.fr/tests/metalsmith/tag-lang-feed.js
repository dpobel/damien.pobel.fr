import assert from "node:assert";
import { dirname } from "node:path";
import { before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import metalsmith from "metalsmith";
import tags from "metalsmith-tags";
import tagLangFeed from "../../lib/metalsmith/tag-lang-feed.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("tagLangFeed metalsmith plugin", () => {
  let ms;
  let buildError;
  let buildFiles;

  before((_context, done) => {
    ms = metalsmith(__dirname);
    ms.source("fixtures/tag-lang-feed/src")
      .use((files, metalsmith, done) => {
        const metadata = metalsmith.metadata();

        metadata.collections = { posts: [] };
        Object.keys(files).forEach((path) => {
          metadata.collections.posts.push(files[path]);
        });
        metadata.site = { url: "http://damien.pobel.fr" };
        done();
      })
      .use(tags({ handle: "tags", metadataKey: "tagsList" }))
      .use(tagLangFeed({ addFrFilter: ["addfr"] }))
      .build((error, result) => {
        buildError = error;
        buildFiles = result;
        done();
      });
  });

  it("should not throw any error", () => {
    assert.ifError(buildError);
  });

  it("should add the feed for the tags", () => {
    assert(buildFiles["rss/tag1.xml"]);
    assert(buildFiles["rss/tag2.xml"]);
    assert(buildFiles["rss/tag-3.xml"]);
    assert(buildFiles["rss/addfr.xml"]);
  });

  it('should add the feed filtered by "fr"', () => {
    assert(buildFiles["rss/addfr/fr.xml"]);
  });
});
