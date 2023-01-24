const path = require("path");

module.exports = function (options) {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();

    Object.keys(options).forEach(function (metaName) {
      const toMoveFileNames = metalsmith.match(options[metaName]);

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
