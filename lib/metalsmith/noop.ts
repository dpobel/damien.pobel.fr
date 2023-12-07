import type { Plugin } from "metalsmith";

export default function noop(): Plugin {
  return function (files, metalsmith, done) {
    done();
  };
}
