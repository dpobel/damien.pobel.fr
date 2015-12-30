module.exports = function (env) {
    env.addFilter('url', function (path) {
        return '/' + path + '/';
    });
};
