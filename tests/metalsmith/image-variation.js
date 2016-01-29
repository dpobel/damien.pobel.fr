/* global describe, it, before */
var assert = require('assert'),
    metalsmith = require('metalsmith'),
    gm = require('gm'),
    imageVariation = require('../../lib/metalsmith/image-variation');

describe('imageVariation metalsmith plugin', function () {
    var fixtureDir = 'fixtures/image-variation/',
        buildResult,
        buildError;

    this.timeout(50000);
    before(function (done) {
        metalsmith(__dirname)
            .source(fixtureDir + 'src/')
            .destination(fixtureDir + 'build/')
            .use(imageVariation({concurrency: 2}))
            .build(function (error, result) {
                buildError = error;
                buildResult = result;

                done();
            });
    });

    it('should not throw any error', function () {
        assert.ifError(buildError);
    });

    it('should generate with variation', function (done) {
        var widthVariation = 'images/220x/variation1.gif';

        assert(buildResult[widthVariation]);
        gm(buildResult[widthVariation].contents).size(function (err, size) {
            assert.equal(220, size.width);
            assert.equal(165, size.height); // keep ratio
            done();
        });
    });

    it('should generate height variation', function (done) {
        var heightVariation = 'images/x300/variation2.gif';

        assert(buildResult[heightVariation]);
        gm(buildResult[heightVariation].contents).size(function (err, size) {
            assert.equal(300, size.height);
            assert.equal(179, size.width); // keep ratio
            done();
        });
    });

    it('should generate widthxheight variation', function (done) {
        var widthxheightVariation = 'images/250x250/variation3.gif';

        assert(buildResult[widthxheightVariation]);
        gm(buildResult[widthxheightVariation].contents).size(function (err, size) {
            assert.equal(250, size.height);
            assert.equal(250, size.width);
            done();
        });
    });

    it('should normalize path', function () {
        var normalizedVariation = 'images/330x/variation4.gif';

        assert(buildResult[normalizedVariation]);
    });

    it('should recognize absolute URI', function () {
        var absoluteUriVariation = 'images/330x/variation1.gif';

        assert(buildResult[absoluteUriVariation]);
    });

    it('should recognize meta twitter:image', function () {
        var absoluteUriVariation = 'images/330x/twitter.gif';

        assert(buildResult[absoluteUriVariation]);
    });

    it('should recognize meta og:image', function () {
        var absoluteUriVariation = 'images/220x/twitter.gif';

        assert(buildResult[absoluteUriVariation]);
    });
});
