/* global describe, it, beforeEach */
var assert = require("assert"),
  metalsmith = require("metalsmith"),
  fileToMetadata = require("../../lib/metalsmith/file-to-metadata");

describe("fileToMetadata metalsmith plugin", function () {
  var ms, buildError, buildFiles;

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
    var metadata = ms.metadata().html;

    assert(typeof metadata["test1.htm"] === "object");
    assert(typeof metadata["test2.htm"] === "object");
  });

  it("should remove the matching files from `files`", function () {
    assert(typeof buildFiles["test1.htm"] === "undefined");
    assert(typeof buildFiles["test2.htm"] === "undefined");
  });

  it("should not create the metadata entry", function () {
    var metadata = ms.metadata().zero;

    assert(typeof metadata === "undefined");
  });
});
