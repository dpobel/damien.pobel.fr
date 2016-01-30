var feed = require('metalsmith-feed');

function addFileToCollection(metadata, file, collection) {
    if ( !metadata.collections[collection] ) {
        metadata.collections[collection] = [];
    }
    metadata.collections[collection].push(file);
}

function isFr(file) {
    return (!file.lang || file.lang === 'fr');
}

module.exports = function (options) {
    return function (files, metalsmith, done) {
        var metadata = metalsmith.metadata(),
            tagsWithFrFilter = {};

        Object.keys(files).forEach(function (filePath) {
            var file = files[filePath];

            if ( file.tags ) {
                file.tags.forEach(function (tag) {
                    addFileToCollection(metadata, file, tag);
                    if ( options.addFrFilter.indexOf(tag) !== -1 && isFr(file) ) {
                        tagsWithFrFilter[tag] = true;
                        addFileToCollection(metadata, file, tag + '/fr');
                    }
                });
            }
        });

        Object.keys(metadata.tagsList).forEach(function (tag) {
            feed({
                collection: tag,
                limit: 10,
                destination: "rss/" + metadata.tagsList[tag].urlSafe + '.xml',
                title: tag,
            }).call(null, files, metalsmith, function (err) {});
            if ( tagsWithFrFilter[tag] ) {
                feed({
                    collection: tag + '/fr',
                    limit: 10,
                    destination: "rss/" + metadata.tagsList[tag].urlSafe + '/fr.xml',
                    title: tag,
                }).call(null, files, metalsmith, function () {});
            }
        });
        done();
    };
};
