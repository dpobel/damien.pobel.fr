import path from "node:path";

export default function (options) {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata();

    Object.keys(options).forEach((metaName) => {
      const toMoveFileNames = metalsmith.match(options[metaName]);

      if (!toMoveFileNames.length) {
        return;
      }
      metadata[metaName] = {};
      toMoveFileNames.forEach((filePath) => {
        metadata[metaName][path.basename(filePath)] = files[filePath];
        delete files[filePath];
      });
    });

    done();
  };
}
