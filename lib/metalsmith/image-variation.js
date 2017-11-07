var cheerio = require('cheerio'),
    async = require('async'),
    gm = require('gm'),
    imagemin = require('imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
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
                    imageminJpegtran({progressive: true}),
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
            if ( !filePath.endsWith('.html') ) {
                return;
            }
            $ = cheerio.load(files[filePath].contents);
            $('img').each(function () {
                handleImageAttribute($(this), 'src', files, localRegexp, siteUrl, tasks);
            });
            $("meta[name='twitter:image'], meta[property='og:image']").each(function () {
                handleImageAttribute($(this), 'content', files, localRegexp, siteUrl, tasks);
            });
        });

        async.parallelLimit(tasks, options.concurrency, done);
    };
};
