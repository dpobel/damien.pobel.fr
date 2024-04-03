# damien.pobel.fr source code

![Build status](https://github.com/dpobel/damien.pobel.fr/actions/workflows/main.yml/badge.svg)

Source code of [damien.pobel.fr](https://damien.pobel.fr/), see [Powered by
Metalsmith (and Github, TravisCI, Myth,
npm...)](https://damien.pobel.fr/post/powered-by-metalsmith/) for some details.

## Requirements

- `apt-get install graphicsmagick`

## Tasks

- `npm test` to run the unit tests
- `npm run dp:build` to build the website (or `npm run dp:build:dev`)
- `npm run dp:restorecache` to put the image variations in the src directory from a
  previous build
- `npm run dp:deploy` to deploy the site (requires the SSH key to be decoded)
