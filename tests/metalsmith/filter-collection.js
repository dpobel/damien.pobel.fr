/* global describe, it */
const filterCollection = require("../../lib/metalsmith/filter-collection.js");
const assert = require("assert");

describe("filter collection functions", function () {
  const propIdentifier = "metaPropIdentifier";

  describe("excludeWithMetadataFn", () => {
    const excludeMeta = filterCollection.excludeWithMetadataFn(propIdentifier);

    it("should exclude post with the given meta set to true", function () {
      assert(!excludeMeta({ [propIdentifier]: true }));
    });

    it("should keep post without the given meta", function () {
      assert(excludeMeta({}));
    });

    it("should keep post with the given meta set to false", function () {
      assert(excludeMeta({ [propIdentifier]: false }));
    });
  });

  describe("excludeWithoutMetadataFn", () => {
    const excludeWithoutMeta = filterCollection.excludeWithoutMetadataFn(
      propIdentifier
    );

    it("should keep post with the given meta set to true", function () {
      assert(excludeWithoutMeta({ [propIdentifier]: true }));
    });

    it("should exclude the post without the given meta", function () {
      assert(!excludeWithoutMeta({}));
    });

    it("should exclude post with the given meta set to false", function () {
      assert(!excludeWithoutMeta({ [propIdentifier]: false }));
    });
  });
});
