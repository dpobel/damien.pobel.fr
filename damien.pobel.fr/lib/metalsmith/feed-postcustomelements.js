import url from "node:url";

export default function (file) {
  return {
    ...file,
    categories: file.tags.map((tag) => tag.name),
    date: file.published.toDate(),
    // `file.path` is not updated anymore by permalinks, so `url` needs to
    // be build here…
    url: url.resolve("https://damien.pobel.fr", file.permalink),
  };
}
