export default function noop() {
  return (files, metalsmith, done) => {
    done();
  };
}
