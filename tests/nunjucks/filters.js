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
    });
});
