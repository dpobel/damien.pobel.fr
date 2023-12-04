import type { Plugin } from "metalsmith";

export default function timedPlugin(plugin: Plugin, name: string): Plugin {
  return function (files, metalsmith, done) {
    console.time(name);
    void plugin(files, metalsmith, function (...args) {
      console.timeEnd(name);
      done(...args);
    });
  };
};
