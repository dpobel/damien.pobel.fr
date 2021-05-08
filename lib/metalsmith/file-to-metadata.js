const minimatch = require("minimatch");
const path = require("path");

module.exports = function (options) {
  const filters = {};

  Object.keys(options).forEach(function (metaName) {
    filters[metaName] = minimatch.filter(options[metaName]);
  });

  return function (files, metalsmith, done) {
    const fileNames = Object.keys(files);
    const metadata = metalsmith.metadata();

    Object.keys(filters).forEach(function (metaName) {
      const toMoveFileNames = fileNames.filter(filters[metaName]);

      if (!toMoveFileNames.length) {
        return;
      }
      metadata[metaName] = {};
      toMoveFileNames.forEach(function (filePath) {
        metadata[metaName][path.basename(filePath)] = files[filePath];
        delete files[filePath];
      });
    });

    done();
  };
};
