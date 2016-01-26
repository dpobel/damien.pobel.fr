/* global describe, it */
var postCustomElements = require('../../lib/metalsmith/feed-postcustomelements.js'),
    moment = require('moment'),
    assert = require('assert');

describe('postCustomElements metalsmith-feed function', function () {
    var tags = ['tag1', 'tag2'],
        published = moment(),
        file = {tags: tags, published: published};
        
    it('should return an array', function () {
        var res = postCustomElements(file);

        assert(Array.isArray(res));
        assert.equal(1 + tags.length, res.length); // 1 for pubDate element
    });

    it('should add a category element per tag', function () {
        var res = postCustomElements(file),
            i = 0;

        res.forEach(function (element) {
            if ( !element.pubDate ) {
                assert(element.category);
                assert.equal(tags[i], element.category);
                i++;
            }
        });
        assert(i);
    });

    it('should add a pubDate element with the published date', function () {
        var res = postCustomElements(file),
            pubDateFound = false;

        res.forEach(function (element) {
            if ( element.pubDate ) {
                pubDateFound = true;
                assert.equal(published.format('ddd, DD MMM YYYY HH:mm:ss [GMT]'), element.pubDate);
            }
        });
        assert(pubDateFound);
    });
});
