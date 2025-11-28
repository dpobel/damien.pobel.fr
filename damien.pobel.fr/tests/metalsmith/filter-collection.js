import assert from "node:assert";
import { describe, it } from "node:test";
import {
  excludeWithMetadataFn,
  excludeWithoutMetadataFn,
} from "../../lib/metalsmith/filter-collection.js";

describe("filter collection functions", () => {
  const propIdentifier = "metaPropIdentifier";

  describe("excludeWithMetadataFn", () => {
    const excludeMeta = excludeWithMetadataFn(propIdentifier);

    it("should exclude post with the given meta set to true", () => {
      assert(!excludeMeta({ [propIdentifier]: true }));
    });

    it("should keep post without the given meta", () => {
      assert(excludeMeta({}));
    });

    it("should keep post with the given meta set to false", () => {
      assert(excludeMeta({ [propIdentifier]: false }));
    });
  });

  describe("excludeWithoutMetadataFn", () => {
    const excludeWithoutMeta = excludeWithoutMetadataFn(propIdentifier);

    it("should keep post with the given meta set to true", () => {
      assert(excludeWithoutMeta({ [propIdentifier]: true }));
    });

    it("should exclude the post without the given meta", () => {
      assert(!excludeWithoutMeta({}));
    });

    it("should exclude post with the given meta set to false", () => {
      assert(!excludeWithoutMeta({ [propIdentifier]: false }));
    });
  });
});
