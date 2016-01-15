module.exports = function (env) {
    env.addFilter('url', function (path, prefix) {
        return (prefix ? prefix : '') + '/' + path + '/';
    });

    env.addFilter('image_variation', function (imgPath, variation) {
        var tmp = imgPath.split('/');

        return tmp[0] + '/' + variation + '/' + tmp[1];
    });

    env.addFilter('keys', function (object) {
        return Object.keys(object);
    });
};
