export default {
  url: function (path, prefix, isFile) {
    const resolvedPath = `/${path}${isFile ? "" : "/"}`;

    return `${prefix ? prefix : ""}${resolvedPath.replace(/\/\/+/g, "/")}`;
  },
  image_variation: function (imgPath, variation) {
    const tmp = imgPath.split("/");

    return tmp[0] + "/" + variation + "/" + tmp[1];
  },

  keys: function (object) {
    return Object.keys(object);
  },
  tag_info: function (tags, tagName) {
    const file = `${tagName}.html`;

    return tags[file] ? tags[file] : { title: tagName, contents: "" };
  },
  tag_url: function (tag, tagCollection) {
    const tagPageObject = tagCollection.find((tagPageObject) => {
      return tag.name === tagPageObject.tag;
    });
    if (!tagPageObject) {
      throw new Error(`"${tag.name}" not found`);
    }
    return tagPageObject.permalink;
  },
};
