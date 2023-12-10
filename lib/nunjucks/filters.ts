export default {
  url: function (path: string, prefix?: string, isFile?: boolean) {
    const resolvedPath = `/${path}${isFile ? "" : "/"}`;

    return `${prefix ? prefix : ""}${resolvedPath.replace(/\/\/+/g, "/")}`;
  },
  image_variation: function (imgPath: string, variation: string) {
    const tmp = imgPath.split("/");

    return tmp[0] + "/" + variation + "/" + tmp[1];
  },

  keys: function (object: Record<string, unknown>) {
    return Object.keys(object);
  },
  tag_info: function (tags, tagName: string) {
    const file = `${tagName}.html`;

    return tags[file] ? tags[file] : { title: tagName, contents: "" };
  },
};
