var minimatch = require('minimatch'),
    path = require('path');

module.exports = function (options) {
    var filters = {};

    Object.keys(options).forEach(function (metaName) {
        filters[metaName] = minimatch.filter(options[metaName]);
    });

    return function (files, metalsmith, done) {
        var fileNames = Object.keys(files),
            metadata = metalsmith.metadata();

        Object.keys(filters).forEach(function (metaName) {
            var toMoveFileNames = fileNames.filter(filters[metaName]);

            if ( !toMoveFileNames.length ) {
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
