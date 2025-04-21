export default {
  url: (path, prefix, isFile) => {
    const resolvedPath = `/${path}${isFile ? "" : "/"}`;

    return `${prefix ? prefix : ""}${resolvedPath.replace(/\/\/+/g, "/")}`;
  },
  image_variation: (imgPath, variation) => {
    const tmp = imgPath.split("/");

    return `${tmp[0]}/${variation}/${tmp[1]}`;
  },

  keys: (object) => Object.keys(object),
  tag_info: (tags, tagName) => {
    const file = `${tagName}.html`;

    return tags[file] ? tags[file] : { title: tagName, contents: "" };
  },
  tag_url: (tag, tagCollection) => {
    const tagPageObject = tagCollection.find((tagPageObject) => {
      return tag.name === tagPageObject.tag;
    });
    if (!tagPageObject) {
      throw new Error(`"${tag.name}" not found`);
    }
    return tagPageObject.permalink;
  },
};
