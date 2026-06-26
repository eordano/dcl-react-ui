const BASE =
  typeof document !== "undefined"
    ? new URL(import.meta.env.BASE_URL, document.baseURI).href
    : import.meta.env.BASE_URL;

export const asset = (path) => BASE + path;
