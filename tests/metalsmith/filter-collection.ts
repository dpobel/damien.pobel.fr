/* global describe, it */
import { File } from "metalsmith";
import {
  excludeWithMetadataFn,
  excludeWithoutMetadataFn,
} from "../../lib/metalsmith/filter-collection.js";
import assert from "assert";

describe("filter collection functions", function () {
  const propIdentifier = "metaPropIdentifier";
  const file : File = { contents: Buffer.from("") };

  describe("excludeWithMetadataFn", () => {
    const excludeMeta = excludeWithMetadataFn(propIdentifier);

    it("should exclude post with the given meta set to true", function () {
      assert(!excludeMeta({ ...file, [propIdentifier]: true }));
    });

    it("should keep post without the given meta", function () {
      assert(excludeMeta(file));
    });

    it("should keep post with the given meta set to false", function () {
      assert(excludeMeta({ ...file, [propIdentifier]: false }));
    });
  });

  describe("excludeWithoutMetadataFn", () => {
    const excludeWithoutMeta = excludeWithoutMetadataFn(propIdentifier);

    it("should keep post with the given meta set to true", function () {
      assert(excludeWithoutMeta({ ...file, [propIdentifier]: true }));
    });

    it("should exclude the post without the given meta", function () {
      assert(!excludeWithoutMeta(file));
    });

    it("should exclude post with the given meta set to false", function () {
      assert(!excludeWithoutMeta({ ...file, [propIdentifier]: false }));
    });
  });
});
