const excludeWithMetadataFn = (prop) => {
    return (post) => {
        return !post[prop];
    };
};

module.exports = {
    excludeWithMetadataFn: excludeWithMetadataFn,
}
