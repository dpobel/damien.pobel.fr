import { File } from "metalsmith"

export const excludeWithMetadataFn = (prop: string) => {
  return (post: File) => {
    return !post[prop];
  };
};

export const excludeWithoutMetadataFn = (prop: string) => {
  return (post: File) => {
    return !!post[prop];
  };
};
