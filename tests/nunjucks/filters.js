/* global describe, it, beforeEach */
var assert = require('assert'),
    filters = require('../../lib/nunjucks/filters'),
    nunjucks = require('nunjucks');

describe('Nunjucks filters', function () {
    var env = new nunjucks.Environment();

    describe('url', function () {
        beforeEach(function () {
            filters(env);
        });

        it('should be defined', function () {
            assert.ok(typeof env.filters.url === 'function');
        });

        it('should add trailing slashes', function () {
            var path = 'path';

            assert.equal('/path/', env.filters.url(path));
        });

        it('should use the prefix', function () {
            var path = 'blog',
                prefix = 'http://damien.pobel.fr';

            assert.equal('http://damien.pobel.fr/blog/', env.filters.url(path, prefix));
        });

        it('should skip the trailing slash for file', function () {
            var path = 'path/to/file.jpg';

            assert.equal('/path/to/file.jpg', env.filters.url(path, '', true));
        });
    });

    describe('image_variation', function () {
        var func;

        beforeEach(function () {
            filters(env);
            func = env.filters.image_variation;
        });

        it('should be defined', function () {
            assert.ok(typeof func === 'function');
        });

        it('should add the variation part', function () {
            assert.equal(
                'images/whatever/photo.jpg',
                func('images/photo.jpg', 'whatever')
            );
        });
    });

    describe('keys', function () {
        var func;

        beforeEach(function () {
            filters(env);
            func = env.filters.keys;
        });

        it('should be defined', function () {
            assert.ok(typeof func === 'function');
        });

        it('should return the array of object keys', function () {
            var obj = {foo: '', bar: ''};

            assert.deepEqual(
                ['foo', 'bar'],
                func(obj)
            );
        });

    });
});
