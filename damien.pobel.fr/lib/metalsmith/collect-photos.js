import * as cheerio from "cheerio";

function isLocalImage(src) {
  return src.startsWith("/images/");
}

function normalizeImageSrc(src) {
  return src.replace("/images/", "images/").replace(/\/+/g, "/");
}

function getOriginalPath(src) {
  const tmp = src.split("/");

  if (tmp.length < 3) {
    return src;
  }
  return tmp[0] + "/" + tmp[2];
}

function isPhotoPost(file) {
  const toTagArray = function (tags) {
    return tags.map(function (obj) {
      return obj.name;
    });
  };

  return file.tags && toTagArray(file.tags).indexOf("photo") !== -1;
}

export default function (options) {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    let lastPhotosCount = 0;

    metadata.lastPhotos = [];
    metadata.posts.forEach(function (file) {
      const photos = [];

      if (!isPhotoPost(file)) {
        return;
      }
      const $ = cheerio.load(file.contents);
      $("img").each(function () {
        const src = $(this).attr("src");

        if (!isLocalImage(src)) {
          return;
        }
        const original = getOriginalPath(normalizeImageSrc(src));
        photos.push(original);
      });
      if (photos.length) {
        file.photos = photos;
        if (lastPhotosCount < options.lastPhotosNumber) {
          metadata.lastPhotos.push(file);
        }
        lastPhotosCount += photos.length;
      }
    });

    done();
  };
}
