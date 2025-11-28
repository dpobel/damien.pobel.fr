import assert from "node:assert";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import metalsmith from "metalsmith";
import msMoment from "metalsmith-moment";
import outdatedPost from "../../lib/metalsmith/outdated-post.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

describe("outdatedPost metalsmith plugin", () => {
  let buildError;
  let buildFiles;

  before((done) => {
    metalsmith(__dirname)
      .source("fixtures/outdated-post/src")
      .use(msMoment(["published", "updated"]))
      .use(outdatedPost())
      .build((error, result) => {
        buildError = error;
        buildFiles = result;
        done();
      });
  });

  it("should not throw any error", () => {
    assert.ifError(buildError);
  });

  it("should detect outdated posts based on published date", () => {
    assert(buildFiles["outdated.md"].isOutdated);
    assert(!buildFiles["not-outdated.md"].isOutdated);
  });

  it("should detect outdated posts based on updated date", () => {
    assert(buildFiles["outdated-updated.md"].isOutdated);
    assert(!buildFiles["not-outdated-because-updated.md"].isOutdated);
  });

  it("should exclude evergreen post", () => {
    assert(!buildFiles["evergreen.md"].isOutdated);
  });
});
