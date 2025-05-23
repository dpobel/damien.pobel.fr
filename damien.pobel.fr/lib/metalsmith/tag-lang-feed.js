import feed from "metalsmith-feed";

const rssSize = 10;

function addFileToCollection(metadata, file, collection) {
  if (!metadata.collections[collection]) {
    metadata.collections[collection] = [];
  }
  if (metadata.collections[collection].length < rssSize) {
    metadata.collections[collection].push(file);
  }
}

function isFr(file) {
  return !file.lang || file.lang === "fr";
}

export default function (options) {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata();
    const tagsWithFrFilter = {};

    metadata.collections.posts.forEach((file) => {
      if (file.tags) {
        file.tags.forEach((tagObject) => {
          const tag = tagObject.name;

          addFileToCollection(metadata, file, tag);
          if (options.addFrFilter.indexOf(tag) !== -1 && isFr(file)) {
            tagsWithFrFilter[tag] = true;
            addFileToCollection(metadata, file, `${tag}/fr`);
          }
        });
      }
    });

    Object.keys(metadata.tagsList).forEach((tag) => {
      feed({
        collection: tag,
        limit: rssSize,
        destination: `rss/${metadata.tagsList[tag].urlSafe}.xml`,
        preprocess: options.preprocess,
        title: tag,
      }).call(null, files, metalsmith, () => {});
      if (tagsWithFrFilter[tag]) {
        feed({
          collection: `${tag}/fr`,
          limit: rssSize,
          destination: `rss/${metadata.tagsList[tag].urlSafe}/fr.xml`,
          preprocess: options.preprocess,
          title: tag,
        }).call(null, files, metalsmith, () => {});
      }
    });
    done();
  };
}
