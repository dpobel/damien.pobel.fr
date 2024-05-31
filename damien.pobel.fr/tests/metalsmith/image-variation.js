import assert from "assert";
import metalsmith from "metalsmith";
import gm from "gm";
import imageVariation from "../../lib/metalsmith/image-variation.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("imageVariation metalsmith plugin", function () {
  const fixtureDir = "fixtures/image-variation/";
  let buildResult;
  let buildError;

  this.timeout(50000);
  before(function (done) {
    metalsmith(__dirname)
      .source(fixtureDir + "src/")
      .destination(fixtureDir + "build/")
      .use(
        imageVariation({ concurrency: 2, siteUrl: "http://damien.pobel.fr" }),
      )
      .build(function (error, result) {
        buildError = error;
        buildResult = result;

        done();
      });
  });

  it("should not throw any error", function () {
    assert.ifError(buildError);
  });

  describe("width variation", () => {
    it("should generate a GIF", function (done) {
      const widthVariation = "images/220x/GIF.gif";

      assert(buildResult[widthVariation]);
      gm(buildResult[widthVariation].contents).size(function (err, size) {
        assert.equal(220, size.width);
        assert.equal(161, size.height);
        done();
      });
    });

    it("should generate a PNG", function (done) {
      const widthVariation = "images/220x/PNG.png";

      assert(buildResult[widthVariation]);
      gm(buildResult[widthVariation].contents).size(function (err, size) {
        assert.equal(220, size.width);
        assert.equal(220, size.height);
        done();
      });
    });

    it("should generate a JPG", function (done) {
      const widthVariation = "images/220x/JPG.jpg";

      assert(buildResult[widthVariation]);
      gm(buildResult[widthVariation].contents).size(function (err, size) {
        assert.equal(220, size.width);
        assert.equal(147, size.height);
        done();
      });
    });
  });

  describe("height variation", () => {
    it("should generate a GIF", function (done) {
      const heightVariation = "images/x300/GIF.gif";

      assert(buildResult[heightVariation]);
      gm(buildResult[heightVariation].contents).size(function (err, size) {
        assert.equal(300, size.height);
        assert.equal(410, size.width);
        done();
      });
    });

    it("should generate a PNG", function (done) {
      const heightVariation = "images/x300/PNG.png";

      assert(buildResult[heightVariation]);
      gm(buildResult[heightVariation].contents).size(function (err, size) {
        assert.equal(300, size.height);
        assert.equal(301, size.width);
        done();
      });
    });

    it("should generate a JPG", function (done) {
      const heightVariation = "images/x300/JPG.jpg";

      assert(buildResult[heightVariation]);
      gm(buildResult[heightVariation].contents).size(function (err, size) {
        assert.equal(300, size.height);
        assert.equal(450, size.width);
        done();
      });
    });
  });

  describe("widthxheight variation", () => {
    it("should generate a GIF", function (done) {
      const widthxheightVariation = "images/250x250/GIF.gif";

      assert(buildResult[widthxheightVariation]);
      gm(buildResult[widthxheightVariation].contents).size(
        function (err, size) {
          assert.equal(183, size.height);
          assert.equal(250, size.width);
          done();
        },
      );
    });

    it("should generate a PNG", function (done) {
      const widthxheightVariation = "images/250x250/PNG.png";

      assert(buildResult[widthxheightVariation]);
      gm(buildResult[widthxheightVariation].contents).size(
        function (err, size) {
          assert.equal(250, size.height);
          assert.equal(250, size.width);
          done();
        },
      );
    });

    it("should generate a JPG", function (done) {
      const widthxheightVariation = "images/250x250/JPG.jpg";

      assert(buildResult[widthxheightVariation]);
      gm(buildResult[widthxheightVariation].contents).size(
        function (err, size) {
          assert.equal(167, size.height);
          assert.equal(250, size.width);
          done();
        },
      );
    });
  });

  it("should normalize path", function () {
    const normalizedVariation = "images/330x/JPG.jpg";

    assert(buildResult[normalizedVariation]);
  });

  it("should recognize absolute URI", function () {
    const absoluteUriVariation = "images/330x/PNG.png";

    assert(buildResult[absoluteUriVariation]);
  });

  it("should recognize meta twitter:image", function () {
    const absoluteUriVariation = "images/330x/twitter.png";

    assert(buildResult[absoluteUriVariation]);
  });

  it("should recognize meta og:image", function () {
    const absoluteUriVariation = "images/220x/twitter.png";

    assert(buildResult[absoluteUriVariation]);
  });
});
