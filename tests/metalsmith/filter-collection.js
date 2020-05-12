/* global describe, it */
const filterCollection = require('../../lib/metalsmith/filter-collection.js');
const assert = require('assert');

describe('filter collection functions', function () {
    const propIdentifier = 'metaPropIdentifier';

    it('should exclude post with the given meta set to true', function () {
        const excludeMeta = filterCollection.excludeWithMetadataFn(propIdentifier);

        assert(!excludeMeta({[propIdentifier]: true}));
    });

    it('should keep post without the given meta', function () {
        const excludeMeta = filterCollection.excludeWithMetadataFn(propIdentifier);

        assert(excludeMeta({}));
    });

    it('should keep post with the given meta set to false', function () {
        const excludeMeta = filterCollection.excludeWithMetadataFn(propIdentifier);

        assert(excludeMeta({[propIdentifier]: false}));
    });

});
