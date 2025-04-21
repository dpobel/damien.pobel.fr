import assert from "node:assert";
import moment from "moment";
import postCustomElements from "../../lib/metalsmith/feed-postcustomelements.js";

describe("postCustomElements metalsmith-feed function", () => {
  const tags = [
    { name: "tag1", slug: "slug1" },
    { name: "tag2", slug: "slug2" },
  ];
  const published = moment();
  const file = {
    title: "test",
    tags: tags,
    published: published,
    permalink: "te/st",
  };

  it("should return an augmented file", () => {
    const res = postCustomElements(file);

    assert.equal(file.title, res.title);
    assert.equal(Object.keys(file).length + 3, Object.keys(res).length);
  });

  it("should add a category element per tag", () => {
    const res = postCustomElements(file);

    assert.equal(["tag1", "tag2"].join(","), res.categories.join(","));
  });

  it("should add a date element", () => {
    const res = postCustomElements(file);

    assert.equal(file.published.toDate().toISOString(), res.date.toISOString());
  });

  it("should add a url element", () => {
    const res = postCustomElements(file);

    assert.equal("https://damien.pobel.fr/te/st", res.url);
  });
});
