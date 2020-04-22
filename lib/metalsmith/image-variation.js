var cheerio = require('cheerio'),
    async = require('async'),
    gm = require('gm'),
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminOptipng = require('imagemin-optipng'),
    imageminGifsicle = require('imagemin-gifsicle'),
    imageminSvgo = require('imagemin-svgo'),
    imagePath = '/images/',
    multipleSlash = /\/+/g;

function normalizeImageSrc(src, siteUrl) {
    return src.replace(siteUrl, '')
        .replace(imagePath, 'images/')
        .replace(multipleSlash, '/');
}

function getImageVariation(src) {
    var tmp = src.split('/');

    if ( tmp.length < 3 ) {
        return false;
    }
    return tmp[1];
}

function getOriginalImageFile(files, src, variation) {
    var origSrc = src.replace(`/${variation}`, '');

    return files[origSrc];
}

function getVariationSize(variation) {
    var tmp = variation.split('x');

    return {width: tmp[0], height: tmp[1]};
}

function generateVariation(variation, src, files, done) {
    var origFile = getOriginalImageFile(files, src, variation),
        size = getVariationSize(variation);

    gm(origFile.contents)
        .resize(size.width, size.height)
        .toBuffer(function (err, buffer) {
            if ( err ) {
                return done(err);
            }
            imagemin.buffer(buffer, {
                plugins: [
                    imageminMozjpeg(),
                    imageminOptipng({optimizationLevel: 3}),
                    imageminGifsicle({interlaced: true}),
                    imageminSvgo(),
                ],
            }).then(function (content) {
                files[src].contents = content;
                done();
            }).catch(done);
        });
}

function handleImageAttribute(element, attr, files, localRegexp, siteUrl, tasks) {
    var src = element.attr(attr),
        variation;

    if ( !src.match(localRegexp) ) {
        return;
    }
    src = normalizeImageSrc(src, siteUrl);
    variation = getImageVariation(src);
    if ( !variation ) {
        return;
    }
    if ( !files[src] ) {
        files[src] = {};
        tasks.push(function (done) {
            generateVariation(variation, src, files, done);
        });
    }
}

module.exports = function (options) {
    var siteUrl = options.siteUrl,
        localRegexp = new RegExp(`(${imagePath}|${siteUrl}${imagePath})`);

    return function (files, metalsmith, done) {
        var tasks = [];

        Object.keys(files).forEach(function (filePath) {
            var $;

            if ( !filePath.endsWith('.html') || (filePath.startsWith('tag') && !filePath.startsWith('tag/veille')) ) {
                // ignore .xml and tag pages because they contain the same
                // variations as others pages (post page and post list)
                // excepting `tag/veille` because thoses posts do not appears on
                // the post list
                return;
            }
            $ = cheerio.load(files[filePath].contents);

            $("img, meta[name='twitter:image'], meta[property='og:image']").each(function () {
                handleImageAttribute($(this), this.tagName === 'img' ? 'src' : 'content', files, localRegexp, siteUrl, tasks);
            });
        });

        async.parallelLimit(tasks, options.concurrency, done);
    };
};
