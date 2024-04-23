import assert from "assert";
import metalsmith from "metalsmith";
import fileToMetadata from "../../lib/metalsmith/file-to-metadata.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("fileToMetadata metalsmith plugin", function () {
  let ms, buildError, buildFiles;

  beforeEach(function (done) {
    ms = metalsmith(__dirname);
    ms.source("fixtures/file-to-metadata/src")
      .use(fileToMetadata({ html: "*.htm", zero: "*zero" }))
      .build(function (error, result) {
        buildError = error;
        buildFiles = result;
        done();
      });
  });

  it("should not throw any error", function () {
    assert.ifError(buildError);
  });

  it("should add the matching files in metadata", function () {
    const metadata = ms.metadata().html;

    assert(typeof metadata["test1.htm"] === "object");
    assert(typeof metadata["test2.htm"] === "object");
  });

  it("should remove the matching files from `files`", function () {
    assert(typeof buildFiles["test1.htm"] === "undefined");
    assert(typeof buildFiles["test2.htm"] === "undefined");
  });

  it("should not create the metadata entry", function () {
    const metadata = ms.metadata().zero;

    assert(typeof metadata === "undefined");
  });
});
