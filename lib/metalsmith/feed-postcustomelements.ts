import { File } from "metalsmith"

export default function (file: File): File {
  return {
    ...file,
    categories: file.tags.map((tag) => tag.name),
    // RFC 822 Date and time Wed, 02 Oct 2002 13:00:00 GMT
    date: file.published.format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
  };
}
