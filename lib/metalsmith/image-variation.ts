import cheerio from "cheerio";
import async from "async";
import gm from "gm";
import imagemin from "imagemin";
import imageminJpegoptim from "imagemin-jpegoptim";
import imageminOptipng from "imagemin-optipng";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import { Plugin } from "metalsmith";

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

  return { width: tmp[0], height: tmp[1] };
}

function generateVariation(variation, src, files, done) {
  const origFile = getOriginalImageFile(files, src, variation),
    size = getVariationSize(variation);

  gm(origFile.contents)
    .resize(size.width, size.height)
    .toBuffer(function (err, buffer) {
      if (err) {
        return done(err);
      }
      imagemin
        .buffer(buffer, {
          plugins: [
            imageminJpegoptim({
              progressive: true,
              stripAll: false,
              stripCom: true,
              stripExif: true,
              stripIptc: true,
              stripIcc: false, // keep that otherwise colors are insipid
              stripXmp: true,
              quality: 90,
            }),
            imageminOptipng({ optimizationLevel: 3 }),
            imageminGifsicle({ interlaced: true }),
            imageminSvgo(),
          ],
        })
        .then(function (content) {
          files[src].contents = content;
          done();
        })
        .catch(done);
    });
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

type ImageVariationOption = {
  siteUrl: string;
  concurrency: number;
}

export default function (options : ImageVariationOption): Plugin {
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
