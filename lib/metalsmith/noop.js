module.exports = function noop() {
  return function (files, metalsmith, done) {
    done();
  };
};
