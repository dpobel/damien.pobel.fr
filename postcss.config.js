module.exports = {
    map: false,
    plugins: {
        "postcss-import": {
            "addModulesDirectories": ['assets/ext'],
        },
        "postcss-preset-env": {
            "preserve": false,
        },
        "cssnano": {
            "preset": [
                "default",
                {"discardComments": {"removeAll": true}},
            ],
        },
    }
};
