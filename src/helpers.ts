interface FetchOptions extends RequestInit {}

export const fetchJson = async (url: string, options: FetchOptions = {}): Promise<any> =>
  await fetch(url, options).then((response) => response.json());

interface ImageKitTransformations {
  [key: string]: string | number;
}

interface ImageKitUrlParams {
  path: string;
  transformations?: ImageKitTransformations;
}

export const imageKitUrl = ({ path, transformations = {} }: ImageKitUrlParams): string => {
  const entries = Object.entries(transformations);

  if (entries.length === 0) {
    return `https://ik.imagekit.io/johndjameson/type-specimens/${path}`;
  }

  const transform = entries
    .map(([param, value]) => `${param}-${value}`)
    .join(',');

  return `https://ik.imagekit.io/johndjameson/tr:${transform}/type-specimens/${path}`;
};