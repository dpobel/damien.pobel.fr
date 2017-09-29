module.exports = function (file) {
    var elements;

    elements = file.tags.map(function (tag) {
        return {category: tag.name};
    });
    // RFC 822 Date and time Wed, 02 Oct 2002 13:00:00 GMT
    elements.push({pubDate: file.published.format('ddd, DD MMM YYYY HH:mm:ss [GMT]')});
    return elements;
};
