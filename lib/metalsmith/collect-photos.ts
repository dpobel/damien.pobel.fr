import cheerio from "cheerio";
import { File, Plugin } from "metalsmith";

function isLocalImage(src: string) {
  return src.startsWith("/images/");
}

function normalizeImageSrc(src: string) {
  return src.replace("/images/", "images/").replace(/\/+/g, "/");
}

function getOriginalPath(src: string) {
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

type CollectPhotosOptions = {
  lastPhotosNumber: number;
}

export default function (options: CollectPhotosOptions): Plugin {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    let lastPhotosCount = 0;

    metadata.lastPhotos = [];
    metadata.posts.forEach(function (file: File) {
      const photos: string[] = [];

      if (!isPhotoPost(file)) {
        return;
      }
      const $ = cheerio.load(file.contents);
      $("img").each(function () {
        const src = $(this).attr("src");

        if (!src || !isLocalImage(src)) {
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
