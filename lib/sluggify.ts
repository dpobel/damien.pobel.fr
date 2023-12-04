export default function (tag: string): string {
  return tag.replace(/ /g, "-");
};
