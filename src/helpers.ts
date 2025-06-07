interface FetchOptions extends RequestInit {}

export const fetchJson = async (url: string, options: FetchOptions = {}): Promise<any> =>
  await fetch(url, options).then((response) => response.json());

export const fetchText = async (url: string, options: FetchOptions = {}): Promise<string> =>
  await fetch(url, options).then((response) => response.text());

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

interface SvgData {
  attributes: { [key: string]: string };
  content: string;
}

export const parseSvg = (svg: string): SvgData => {
  const attributes: { [key: string]: string } = {};
  const svgNode = new DOMParser().parseFromString(svg, 'image/svg+xml')
    .children[0] as SVGSVGElement;

  svgNode.getAttributeNames().forEach((name) => {
    if (name.toLowerCase() === 'viewbox') {
      attributes.viewBox = svgNode.getAttribute(name) || '';
    } else {
      attributes[name.toLowerCase()] = svgNode.getAttribute(name) || '';
    }
  });

  return { attributes, content: svgNode.innerHTML };
};