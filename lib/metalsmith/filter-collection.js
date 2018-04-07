const excludeWithTagFn = (tagName) => {
    return (post) => {
        return !post.tags.map((struct) => struct.name).includes(tagName);
    };
};

module.exports = {
    excludeWithTagFn: excludeWithTagFn,
}
