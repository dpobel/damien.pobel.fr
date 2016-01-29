var cheerio = require('cheerio'),
    async = require('async'),
    gm = require('gm'),
    Imagemin = require('imagemin'),
    imagePath = '/images/';

function getLocalRegexp(siteUrl) {
    return new RegExp('(' + imagePath + '|' + siteUrl + imagePath + ')');
}

function isLocalImage(src, siteUrl) {
    var localRegexp = getLocalRegexp(siteUrl);

    return src.match(localRegexp);
}

function normalizeImageSrc(src, siteUrl) {
    var localRegexp = getLocalRegexp(siteUrl);

    return src.replace(localRegexp, 'images/').replace(/\/+/g, '/');
}

function getImageVariation(src) {
    var tmp = src.split('/');

    if ( tmp.length < 3 ) {
        return false;
    }
    return tmp[1];
}

function getOriginalImageFile(files, src, variation) {
    var origSrc = src.replace('/' + variation, '');
    
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
            new Imagemin()
                .src(buffer)
                .use(Imagemin.gifsicle({interlaced: true}))
                .use(Imagemin.jpegtran({progressive: true}))
                .use(Imagemin.optipng({optimizationLevel: 3}))
                .use(Imagemin.svgo())
                .run(function (err, f) {
                    files[src].contents = f[0].contents;
                    done(err);
                });
        });
}

function handleImageAttribute(element, attr, files, siteUrl, tasks) {
    var src = element.attr(attr),
        variation;

    if ( !isLocalImage(src, siteUrl) ) {
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
    var siteUrl = options.siteUrl;

    return function (files, metalsmith, done) {
        var tasks = [];

        Object.keys(files).forEach(function (filePath) {
            var $;
            if ( !filePath.endsWith('.html') ) {
                return;
            }
            $ = cheerio.load(files[filePath].contents);
            $('img').each(function () {
                handleImageAttribute($(this), 'src', files, siteUrl, tasks);
            });
            $("meta[name='twitter:image'], meta[property='og:image']").each(function () {
                handleImageAttribute($(this), 'content', files, siteUrl, tasks);
            });
        });

        async.parallelLimit(tasks, options.concurrency, done);
    };
};
