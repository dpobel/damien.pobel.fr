export default function noop() {
  return (_files, _metalsmith, done) => {
    done();
  };
}
