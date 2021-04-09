# damien.pobel.fr source code

[![Build
Status](https://travis-ci.org/dpobel/damien.pobel.fr.svg?branch=master)](https://travis-ci.org/dpobel/damien.pobel.fr)

Source code of [damien.pobel.fr](https://damien.pobel.fr/), see [Powered by
Metalsmith (and Github, TravisCI, Myth,
npm...)](https://damien.pobel.fr/post/powered-by-metalsmith/) for some details.

## Requirements

* `apt-get install graphicsmagick`

## Tasks

* `npm test` to run the unit tests
* `npm run build` to build the website (or `npm run build:dev`)
* `npm run restorecache` to put the image variations in the src directory from a
  previous build
* `npm run deploy` to deploy the site (requires the SSH key to be decoded)
