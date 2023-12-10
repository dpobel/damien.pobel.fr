import cheerio from "cheerio";
import async, { AsyncFunction } from "async";
import gm from "gm";
import imagemin from "imagemin";
import imageminJpegoptim from "imagemin-jpegoptim";
import imageminOptipng from "imagemin-optipng";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import { Files, Plugin } from "metalsmith";

const imagePath = "/images/";
const multipleSlash = /\/+/g;

function normalizeImageSrc(src: string, siteUrl: string) {
  return src
    .replace(siteUrl, "")
    .replace(imagePath, "images/")
    .replace(multipleSlash, "/");
}

function getImageVariation(src: string) {
  const tmp = src.split("/");

  if (tmp.length < 3) {
    return false;
  }
  return tmp[1];
}

function getOriginalImageFile(files: Files, src: string, variation: string) {
  const origSrc = src.replace(`/${variation}`, "");

  return files[origSrc];
}

function getVariationSize(variation: string) {
  const tmp = variation.split("x");

  return { width: Number(tmp[0]), height: Number(tmp[1]) };
}

function generateVariation(variation: string, src: string, files: Files, done: AsyncFunction<undefined>) {
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
  element: cheerio.TagElement,
  attr: "src"|"content",
  files: Files,
  localRegexp: RegExp,
  siteUrl: string,
  tasks: AsyncFunction<undefined>[],
) {
  let src = element.attribs[attr];

  if (!src.match(localRegexp)) {
    return;
  }
  src = normalizeImageSrc(src, siteUrl);
  const variation = getImageVariation(src);
  if (!variation) {
    return;
  }
  if (!files[src]) {
    files[src] = { contents: Buffer.from("")};
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
    const tasks: AsyncFunction<undefined>[] = [];

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
        function (index, element: cheerio.TagElement) {
          handleImageAttribute(
            element,
            element.tagName === "img" ? "src" : "content",
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
