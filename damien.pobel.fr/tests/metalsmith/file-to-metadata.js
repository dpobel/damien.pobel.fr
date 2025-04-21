import assert from "node:assert";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import metalsmith from "metalsmith";
import fileToMetadata from "../../lib/metalsmith/file-to-metadata.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("fileToMetadata metalsmith plugin", () => {
  let ms;
  let buildError;
  let buildFiles;

  beforeEach((done) => {
    ms = metalsmith(__dirname);
    ms.source("fixtures/file-to-metadata/src")
      .use(fileToMetadata({ html: "*.htm", zero: "*zero" }))
      .build((error, result) => {
        buildError = error;
        buildFiles = result;
        done();
      });
  });

  it("should not throw any error", () => {
    assert.ifError(buildError);
  });

  it("should add the matching files in metadata", () => {
    const metadata = ms.metadata().html;

    assert(typeof metadata["test1.htm"] === "object");
    assert(typeof metadata["test2.htm"] === "object");
  });

  it("should remove the matching files from `files`", () => {
    assert(typeof buildFiles["test1.htm"] === "undefined");
    assert(typeof buildFiles["test2.htm"] === "undefined");
  });

  it("should not create the metadata entry", () => {
    const metadata = ms.metadata().zero;

    assert(typeof metadata === "undefined");
  });
});
