/* global describe, it, beforeEach */
var assert = require('assert'),
    metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    tags = require('metalsmith-tags'),
    collectPhotos = require('../../lib/metalsmith/collect-photos');

describe('collectPhotos metalsmith plugin', function () {
    var ms, buildError,
        lastPhotosNumber = 2;

    beforeEach(function (done) {
        ms = metalsmith(__dirname);
        ms.source('fixtures/collect-photos/src')
            .use(collections({"posts": {"pattern": '*.html', 'sortBy': 'test'}}))
            .use(tags({'handle': 'tags'}))
            .use(collectPhotos({lastPhotosNumber: lastPhotosNumber}))
            .build(function (error, result) {
                buildError = error;
                done();
            });
    });

    it('should not throw any error', function () {
        assert.ifError(buildError);
    });

    it('should add the `photos` list', function () {
        var file = ms.metadata().posts[0];

        assert(Array.isArray(file.photos));
        assert.equal(2, file.photos.length);
    });

    it('should not add an empty photos list', function () {
        var file = ms.metadata().posts[1];

        assert.strictEqual(undefined, file.photos);
    });

    it('should normalize the path', function () {
        var file = ms.metadata().posts[2];

        assert.equal('images/photo.jpg', file.photos[0]);
    });

    it('should add the original path to the list', function () {
        var file = ms.metadata().posts[3];

        assert.equal('images/photo.jpg', file.photos[0]);
    });

    it('should ignore non photo post', function () {
        var file = ms.metadata().posts[4];

        assert.strictEqual(undefined, file.photos);
    });

    it('should collect the last photos', function () {
        var last = ms.metadata().lastPhotos,
            files = ms.metadata().posts;

        assert(Array.isArray(last));
        assert.equal(last.length, 1);
        assert.equal(files[0].title, last[0].title);
    });
});
