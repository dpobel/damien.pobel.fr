import cheerio from "cheerio";
import async from "async";
import sharp from "sharp";

const imagePath = "/images/";
const multipleSlash = /\/+/g;

function normalizeImageSrc(src, siteUrl) {
  return src
    .replace(siteUrl, "")
    .replace(imagePath, "images/")
    .replace(multipleSlash, "/");
}

function getImageVariation(src) {
  const tmp = src.split("/");

  if (tmp.length < 3) {
    return false;
  }
  return tmp[1];
}

function getOriginalImageFile(files, src, variation) {
  const origSrc = src.replace(`/${variation}`, "");

  return files[origSrc];
}

function getVariationSize(variation) {
  const tmp = variation.split("x");

  return {
    width: tmp[0] ? Number(tmp[0]) : undefined,
    height: tmp[1] ? Number(tmp[1]) : undefined,
  };
}

async function generateVariation(variation, src, files, done) {
  const origFile = getOriginalImageFile(files, src, variation);
  const size = getVariationSize(variation);
  const image = sharp(origFile.contents);

  image
    .jpeg({
      quality: 80,
      progressive: true,
      mozjpeg: true,
      force: false,
    })
    .png({
      compressionLevel: 9,
      quality: 100,
      effort: 10,
      force: false,
    })
    .gif({ progressive: true, force: false });
  try {
    const buffer = await image
      .resize(size.width, size.height, { fit: "inside" })
      .toBuffer();
    files[src].contents = buffer;
    done();
  } catch (error) {
    done(error);
  }
}

function handleImageAttribute(
  element,
  attr,
  files,
  localRegexp,
  siteUrl,
  tasks,
) {
  let src = element.attr(attr);

  if (!src.match(localRegexp)) {
    return;
  }
  src = normalizeImageSrc(src, siteUrl);
  const variation = getImageVariation(src);
  if (!variation) {
    return;
  }
  if (!files[src]) {
    files[src] = {};
    tasks.push(function (done) {
      generateVariation(variation, src, files, done);
    });
  }
}

export default function (options) {
  const siteUrl = options.siteUrl,
    localRegexp = new RegExp(`(${imagePath}|${siteUrl}${imagePath})`);

  return function (files, metalsmith, done) {
    const tasks = [];

    Object.keys(files).forEach(function (filePath) {
      if (
        !filePath.endsWith(".html") ||
        (filePath.startsWith("tag") && !filePath.startsWith("tag/veille"))
      ) {
        // ignore .xml and tag pages because they contain the same
        // variations as others pages (post page and post list)
        // excepting `tag/veille` because thoses posts do not appears on
        // the post list
        return;
      }
      const $ = cheerio.load(files[filePath].contents);

      $("img, meta[name='twitter:image'], meta[property='og:image']").each(
        function () {
          handleImageAttribute(
            $(this),
            this.tagName === "img" ? "src" : "content",
            files,
            localRegexp,
            siteUrl,
            tasks,
          );
        },
      );
    });

    async.parallelLimit(tasks, options.concurrency, done);
  };
}
