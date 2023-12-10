import path from "path";
import type { Plugin, File } from "metalsmith";

type FileWildcard = string;
type FileToMetadataOptions = { [metadataName: string]: FileWildcard};

export default function (options: FileToMetadataOptions): Plugin {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata() as Record<string, unknown>;

    Object.keys(options).forEach(function (metaName) {
      const toMoveFileNames = metalsmith.match(options[metaName]);

      if (!toMoveFileNames.length) {
        return;
      }
      metadata[metaName] = {};
      toMoveFileNames.forEach(function (filePath) {
        const meta = metadata[metaName] as Record<string, File>;
        meta[path.basename(filePath)] = files[filePath];
        delete files[filePath];
      });
    });

    done();
  };
}
