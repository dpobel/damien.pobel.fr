const excludeWithMetadataFn = (prop) => {
  return (post) => {
    return !post[prop];
  };
};

const excludeWithoutMetadataFn = (prop) => {
  return (post) => {
    return !!post[prop];
  };
};

module.exports = {
  excludeWithMetadataFn,
  excludeWithoutMetadataFn,
};
