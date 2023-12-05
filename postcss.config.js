export default {
  map: false,
  plugins: {
    "postcss-import": {
      addModulesDirectories: ["assets/css"],
    },
    "postcss-preset-env": {
      preserve: false,
    },
    cssnano: {
      preset: ["default", { discardComments: { removeAll: true } }],
    },
  },
};
