import url from "url";

export default function (file) {
  return {
    ...file,
    categories: file.tags.map((tag) => tag.name),
    // RFC 822 Date and time Wed, 02 Oct 2002 13:00:00 GMT
    date: file.published.format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
    // `file.path` is not updated anymore by permalinks, so `url` needs to
    // be build here…
    url: url.resolve("https://damien.pobel.fr", file.permalink),
  };
}
