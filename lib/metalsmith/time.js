module.exports = function timedPlugin(plugin, name) {
  return function (files, metalsmith, done) {
    console.time(name);
    plugin(files, metalsmith, function () {
      console.timeEnd(name);
      done.apply(this, arguments);
    });
  };
};
