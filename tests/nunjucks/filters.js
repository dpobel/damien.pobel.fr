/* global describe, it, beforeEach */
import assert from "assert";
import filters from "../../lib/nunjucks/filters.js";

describe("Nunjucks filters", function () {
  describe("url", function () {
    it("should be defined", function () {
      assert.ok(typeof filters.url === "function");
    });

    it("should add trailing slashes", function () {
      const path = "path";

      assert.equal("/path/", filters.url(path));
    });

    it("should use the prefix", function () {
      const path = "blog";
      const prefix = "http://damien.pobel.fr";

      assert.equal("http://damien.pobel.fr/blog/", filters.url(path, prefix));
    });

    it("should simplify multiple /", function () {
      const path = "//blog/////slashes";
      const prefix = "http://damien.pobel.fr";

      assert.equal(
        "http://damien.pobel.fr/blog/slashes/",
        filters.url(path, prefix),
      );
    });

    it("should skip the trailing slash for file", function () {
      const path = "path/to/file.jpg";

      assert.equal("/path/to/file.jpg", filters.url(path, "", true));
    });
  });

  describe("image_variation", function () {
    let func;

    beforeEach(function () {
      func = filters.image_variation;
    });

    it("should be defined", function () {
      assert.ok(typeof func === "function");
    });

    it("should add the variation part", function () {
      assert.equal(
        "images/whatever/photo.jpg",
        func("images/photo.jpg", "whatever"),
      );
    });
  });

  describe("keys", function () {
    let func;

    beforeEach(function () {
      func = filters.keys;
    });

    it("should be defined", function () {
      assert.ok(typeof func === "function");
    });

    it("should return the array of object keys", function () {
      const obj = { foo: "", bar: "" };

      assert.deepEqual(["foo", "bar"], func(obj));
    });
  });

  describe("tag_info", () => {
    const tags = {
      "tag.html": {},
    };
    let func;

    beforeEach(function () {
      func = filters.tag_info;
    });

    it("should return the tag info", () => {
      assert.deepEqual(tags["tag.html"], func(tags, "tag"));
    });

    it("should return the default tag info", () => {
      const tagName = "whatever";
      const info = func(tags, tagName);

      assert.equal(tagName, info.title);
      assert.equal("", info.contents);
    });
  });

  describe("tag_url", () => {
    const tagCollection = [
      { tag: "tag1" },
      { tag: "tag2", path: "/path/to/tag2" },
      { tag: "tag3" },
    ];

    it("should return a tag url", () => {
      assert.equal(
        filters.tag_url({ name: "tag2" }, tagCollection),
        "/path/to/tag2",
      );
    });

    it("should throw if it does not find the tag", () => {
      assert.throws(() => {
        filters.tag_url({ name: "whatever" }, tagCollection);
      });
    });
  });
});
