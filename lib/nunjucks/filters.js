module.exports = function (env) {
    env.addFilter('url', function (path, prefix) {
        return (prefix ? prefix : '') + '/' + path + '/';
    });
};
