var feed = require("metalsmith-feed"),
  rssSize = 10;

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

module.exports = function (options) {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata(),
      tagsWithFrFilter = {};

    metadata.collections.posts.forEach(function (file) {
      if (file.tags) {
        file.tags.forEach(function (tagObject) {
          const tag = tagObject.name;

          addFileToCollection(metadata, file, tag);
          if (options.addFrFilter.indexOf(tag) !== -1 && isFr(file)) {
            tagsWithFrFilter[tag] = true;
            addFileToCollection(metadata, file, tag + "/fr");
          }
        });
      }
    });

    Object.keys(metadata.tagsList).forEach(function (tag) {
      feed({
        collection: tag,
        limit: rssSize,
        destination: "rss/" + metadata.tagsList[tag].urlSafe + ".xml",
        preprocess: options.preprocess,
        title: tag,
      }).call(null, files, metalsmith, function (err) {});
      if (tagsWithFrFilter[tag]) {
        feed({
          collection: tag + "/fr",
          limit: rssSize,
          destination: "rss/" + metadata.tagsList[tag].urlSafe + "/fr.xml",
          postCustomElements: options.postCustomElements,
          title: tag,
        }).call(null, files, metalsmith, function () {});
      }
    });
    done();
  };
};
