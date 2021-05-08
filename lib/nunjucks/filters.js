module.exports = {
  url: function (path, prefix, isFile) {
    return (prefix ? prefix : "") + "/" + path + (isFile ? "" : "/");
  },
  image_variation: function (imgPath, variation) {
    var tmp = imgPath.split("/");

    return tmp[0] + "/" + variation + "/" + tmp[1];
  },

  keys: function (object) {
    return Object.keys(object);
  },
  tag_info: function (tags, tagName) {
    const file = `${tagName}.html`;

    return tags[file] ? tags[file] : { title: tagName, contents: "" };
  },
};
