/* global describe, it */
const filterCollection = require('../../lib/metalsmith/filter-collection.js');
const assert = require('assert');

describe('filter collection functions', function () {
    const tag1 = {name: 'tag1'};
    const tag2 = {name: 'tag2'};
    const post = {};

    beforeEach(function () {
        post.tags = [];
    });

    it('should exclude post with the given tag', function () {
        const excludeTag2 = filterCollection.excludeWithTagFn(tag2.name);

        post.tags.push(tag1);
        post.tags.push(tag2);
        assert(!excludeTag2(post));
    });

    it('should keep post without the given tag', function () {
        const excludeTag2 = filterCollection.excludeWithTagFn(tag2.name);

        post.tags.push(tag1);
        assert(excludeTag2(post));
    });
});
