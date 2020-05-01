module.exports = {
    map: false,
    plugins: {
        "postcss-import": {},
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
