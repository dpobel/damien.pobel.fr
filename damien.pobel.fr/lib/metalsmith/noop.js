export default function noop() {
  return function (files, metalsmith, done) {
    done();
  };
}
