export default function timedPlugin(plugin, name) {
  return (files, metalsmith, done) => {
    console.time(name);
    plugin(files, metalsmith, function (...rest) {
      console.timeEnd(name);
      done.apply(this, rest);
    });
  };
}
