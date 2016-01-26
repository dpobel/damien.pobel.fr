var cheerio = require('cheerio'),
    async = require('async'),
    gm = require('gm'),
    Imagemin = require('imagemin');

function isLocalImage(src) {
    return src.startsWith('/images/');
}

function normalizeImageSrc(src) {
    return src.replace('/images/', 'images/').replace(/\/+/g, '/');
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

module.exports = function (options) {
    return function (files, metalsmith, done) {
        var tasks = [];

        Object.keys(files).forEach(function (filePath) {
            var $;
            if ( !filePath.endsWith('.html') ) {
                return;
            }
            $ = cheerio.load(files[filePath].contents);
            $('img').each(function () {
                var src = $(this).attr('src'),
                    variation;

                if ( !isLocalImage(src) ) {
                    return;
                }
                src = normalizeImageSrc(src);
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
            });
        });

        async.parallelLimit(tasks, options.concurrency, done);
    };
};
