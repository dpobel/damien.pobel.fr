import assert from "node:assert";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import metalsmith from "metalsmith";
import sharp from "sharp";
import imageVariation from "../../lib/metalsmith/image-variation.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("imageVariation metalsmith plugin", function () {
  const fixtureDir = "fixtures/image-variation/";
  let buildResult;
  let buildError;

  this.timeout(50000);
  before((done) => {
    metalsmith(__dirname)
      .source(`${fixtureDir}src/`)
      .destination(`${fixtureDir}build/`)
      .use(
        imageVariation({ concurrency: 2, siteUrl: "http://damien.pobel.fr" }),
      )
      .build((error, result) => {
        buildError = error;
        buildResult = result;

        done();
      });
  });

  it("should not throw any error", () => {
    assert.ifError(buildError);
  });

  describe("width variation", () => {
    it("should generate a GIF", (done) => {
      const widthVariation = "images/220x/GIF.gif";

      assert(buildResult[widthVariation]);
      sharp(buildResult[widthVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(220, metadata.width);
        assert.equal(161, metadata.height);
        done();
      });
    });

    it("should generate a PNG", (done) => {
      const widthVariation = "images/220x/PNG.png";

      assert(buildResult[widthVariation]);
      sharp(buildResult[widthVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(220, metadata.width);
        assert.equal(220, metadata.height);
        done();
      });
    });

    it("should generate a JPG", (done) => {
      const widthVariation = "images/220x/JPG.jpg";

      assert(buildResult[widthVariation]);
      sharp(buildResult[widthVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(220, metadata.width);
        assert.equal(147, metadata.height);
        done();
      });
    });
  });

  describe("height variation", () => {
    it("should generate a GIF", (done) => {
      const heightVariation = "images/x300/GIF.gif";

      assert(buildResult[heightVariation]);
      sharp(buildResult[heightVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(300, metadata.height);
        assert.equal(410, metadata.width);
        done();
      });
    });

    it("should generate a PNG", (done) => {
      const heightVariation = "images/x300/PNG.png";

      assert(buildResult[heightVariation]);
      sharp(buildResult[heightVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(300, metadata.height);
        assert.equal(301, metadata.width);
        done();
      });
    });

    it("should generate a JPG", (done) => {
      const heightVariation = "images/x300/JPG.jpg";

      assert(buildResult[heightVariation]);
      sharp(buildResult[heightVariation].contents).metadata((err, metadata) => {
        assert.ifError(err);
        assert.equal(300, metadata.height);
        assert.equal(450, metadata.width);
        done();
      });
    });
  });

  describe("widthxheight variation", () => {
    it("should generate a GIF", (done) => {
      const widthxheightVariation = "images/250x250/GIF.gif";

      assert(buildResult[widthxheightVariation]);
      sharp(buildResult[widthxheightVariation].contents).metadata(
        (err, metadata) => {
          assert.ifError(err);
          assert.equal(183, metadata.height);
          assert.equal(250, metadata.width);
          done();
        },
      );
    });

    it("should generate a PNG", (done) => {
      const widthxheightVariation = "images/250x250/PNG.png";

      assert(buildResult[widthxheightVariation]);
      sharp(buildResult[widthxheightVariation].contents).metadata(
        (err, metadata) => {
          assert.ifError(err);
          assert.equal(250, metadata.height);
          assert.equal(250, metadata.width);
          done();
        },
      );
    });

    it("should generate a JPG", (done) => {
      const widthxheightVariation = "images/250x250/JPG.jpg";

      assert(buildResult[widthxheightVariation]);
      sharp(buildResult[widthxheightVariation].contents).metadata(
        (err, metadata) => {
          assert.ifError(err);
          assert.equal(167, metadata.height);
          assert.equal(250, metadata.width);
          done();
        },
      );
    });
  });

  it("should normalize path", () => {
    const normalizedVariation = "images/330x/JPG.jpg";

    assert(buildResult[normalizedVariation]);
  });

  it("should recognize absolute URI", () => {
    const absoluteUriVariation = "images/330x/PNG.png";

    assert(buildResult[absoluteUriVariation]);
  });

  it("should recognize meta twitter:image", () => {
    const absoluteUriVariation = "images/330x/twitter.png";

    assert(buildResult[absoluteUriVariation]);
  });

  it("should recognize meta og:image", () => {
    const absoluteUriVariation = "images/220x/twitter.png";

    assert(buildResult[absoluteUriVariation]);
  });

  describe("file size optimization", () => {
    it("should optimize png file", () => {
      const pngVariation = "images/660x/profile.png";

      // console.log("PNG SIZE", buildResult[pngVariation].contents.length);
      const acceptableSize = 52491;
      const originalSize = buildResult["images/profile.png"].contents.length;
      assert(
        buildResult[pngVariation].contents.length <= originalSize,
        `png file size not optimized, original is smaller… (${buildResult[pngVariation].contents.length} > ${originalSize})`,
      );
      assert(
        buildResult[pngVariation].contents.length <= acceptableSize,
        `png file size not optimized (${buildResult[pngVariation].contents.length} > ${acceptableSize})`,
      );
    });

    it("should optimize jpg file", () => {
      const jpgVariation = "images/660x/syrphe.jpg";

      // console.log("JPG SIZE", buildResult[jpgVariation].contents.length);
      const acceptableSize = 31210;
      assert(
        buildResult[jpgVariation].contents.length <= acceptableSize,
        `jpg file size not optimized (${buildResult[jpgVariation].contents.length} > ${acceptableSize})`,
      );
    });
  });
});
