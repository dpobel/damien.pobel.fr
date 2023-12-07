/* global describe, it */
import postCustomElements from "../../lib/metalsmith/feed-postcustomelements.js";
import moment from "moment";
import assert from "assert";
import { File } from "metalsmith"

describe("postCustomElements metalsmith-feed function", function () {
  const tags = [
    { name: "tag1", slug: "slug1" },
    { name: "tag2", slug: "slug2" },
  ];
  const published = moment();
  const file : File = { title: "test", tags: tags, published: published, contents: Buffer.from("") };

  it("should return an augmented file", function () {
    const res = postCustomElements(file);

    assert.equal(file.title, res.title);
    assert.equal(Object.keys(file).length + 2, Object.keys(res).length);
  });

  it("should add a category element per tag", function () {
    const res = postCustomElements(file);

    assert.equal(["tag1", "tag2"].join(","), res.categories.join(","));
  });

  it("should add a date element with the formated published date", function () {
    const res = postCustomElements(file);

    assert.equal(
      file.published.format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
      res.date,
    );
  });
});
