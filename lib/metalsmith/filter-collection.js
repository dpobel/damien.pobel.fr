export const excludeWithMetadataFn = (prop) => {
  return (post) => {
    return !post[prop];
  };
};

export const excludeWithoutMetadataFn = (prop) => {
  return (post) => {
    return !!post[prop];
  };
};
