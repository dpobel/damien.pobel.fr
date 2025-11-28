import assert from "node:assert";
import { dirname } from "node:path";
import { before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import metalsmith from "metalsmith";
import sharp from "sharp";
import imageVariation from "../../lib/metalsmith/image-variation.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe(
  "imageVariation metalsmith plugin",
  () => {
    const fixtureDir = "fixtures/image-variation/";
    let buildResult;
    let buildError;

    before((_context, done) => {
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
      it("should generate a GIF", async () => {
        const widthVariation = "images/220x/GIF.gif";

        assert(buildResult[widthVariation]);
        const metadata = await sharp(
          buildResult[widthVariation].contents,
        ).metadata();
        assert.equal(220, metadata.width);
        assert.equal(161, metadata.height);
      });

      it("should generate a PNG", async () => {
        const widthVariation = "images/220x/PNG.png";

        assert(buildResult[widthVariation]);
        const metadata = await sharp(
          buildResult[widthVariation].contents,
        ).metadata();
        assert.equal(220, metadata.width);
        assert.equal(220, metadata.height);
      });

      it("should generate a JPG", async () => {
        const widthVariation = "images/220x/JPG.jpg";

        assert(buildResult[widthVariation]);
        const metadata = await sharp(
          buildResult[widthVariation].contents,
        ).metadata();
        assert.equal(220, metadata.width);
        assert.equal(147, metadata.height);
      });
    });

    describe("height variation", () => {
      it("should generate a GIF", async () => {
        const heightVariation = "images/x300/GIF.gif";

        assert(buildResult[heightVariation]);
        const metadata = await sharp(
          buildResult[heightVariation].contents,
        ).metadata();
        assert.equal(300, metadata.height);
        assert.equal(410, metadata.width);
      });

      it("should generate a PNG", async () => {
        const heightVariation = "images/x300/PNG.png";

        assert(buildResult[heightVariation]);
        const metadata = await sharp(
          buildResult[heightVariation].contents,
        ).metadata();
        assert.equal(300, metadata.height);
        assert.equal(301, metadata.width);
      });

      it("should generate a JPG", async () => {
        const heightVariation = "images/x300/JPG.jpg";

        assert(buildResult[heightVariation]);
        const metadata = await sharp(
          buildResult[heightVariation].contents,
        ).metadata();
        assert.equal(300, metadata.height);
        assert.equal(450, metadata.width);
      });
    });

    describe("widthxheight variation", () => {
      it("should generate a GIF", async () => {
        const widthxheightVariation = "images/250x250/GIF.gif";

        assert(buildResult[widthxheightVariation]);
        const metadata = await sharp(
          buildResult[widthxheightVariation].contents,
        ).metadata();
        assert.equal(183, metadata.height);
        assert.equal(250, metadata.width);
      });

      it("should generate a PNG", async () => {
        const widthxheightVariation = "images/250x250/PNG.png";

        assert(buildResult[widthxheightVariation]);
        const metadata = await sharp(
          buildResult[widthxheightVariation].contents,
        ).metadata();
        assert.equal(250, metadata.height);
        assert.equal(250, metadata.width);
      });

      it("should generate a JPG", async () => {
        const widthxheightVariation = "images/250x250/JPG.jpg";

        assert(buildResult[widthxheightVariation]);
        const metadata = await sharp(
          buildResult[widthxheightVariation].contents,
        ).metadata();
        assert.equal(167, metadata.height);
        assert.equal(250, metadata.width);
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
  },
  { timeout: 50000 },
);
