module.exports = {
  env: {
    node: true,
    es2022: true,
    mocha: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  parser: "@typescript-eslint/parser",
  root: true,
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
