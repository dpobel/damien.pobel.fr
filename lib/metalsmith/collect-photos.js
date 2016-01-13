var cheerio = require('cheerio');

function isLocalImage(src) {
    return src.startsWith('/images/');
}

function normalizeImageSrc(src) {
    return src.replace('/images/', 'images/').replace(/\/+/g, '/');
}

function getOriginalPath(src) {
    var tmp = src.split('/');

    if ( tmp.length < 3 ) {
        return src;
    }
    return tmp[0] + '/' + tmp[2];
}

function isPhotoPost(file) {
    return file.tags && (file.tags.indexOf('photo') !== -1);
}

module.exports = function (options) {
    return function (files, metalsmith, done) {
        var metadata = metalsmith.metadata();

        metadata.lastPhotos = [];
        metadata.posts.forEach(function (file) {
            var $, photos = [];

            if ( !isPhotoPost(file) ) {
                return;
            }
            $ = cheerio.load(file.contents);
            $('img').each(function () {
                var src = $(this).attr('src'),
                    original;

                if ( !isLocalImage(src) ) {
                    return;
                }
                original = getOriginalPath(normalizeImageSrc(src));
                photos.push(original);
                if ( metadata.lastPhotos.length < options.lastPhotosNumber ) {
                    metadata.lastPhotos.push(file);
                }
            });
            if ( photos.length ) {
                file.photos = photos;
            }
        });

        done();
    };
};
