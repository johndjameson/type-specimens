export const fetchJson = async (url) =>
  await fetch(url).then((response) => response.json());

export const fetchText = async (url) =>
  await fetch(url).then((response) => response.text());

export const imageKitUrl = ({ path, transformations = {} }) => {
  const entries = Object.entries(transformations);

  if (entries.length === 0) {
    return `https://ik.imagekit.io/johndjameson/type-specimens/${path}`;
  }

  const transform = entries
    .map(([param, value]) => `${param}-${value}`)
    .join(',');

  return `https://ik.imagekit.io/johndjameson/tr:${transform}/type-specimens/${path}`;
};

export const parseSvg = (svg) => {
  const attributes = {};
  const svgNode = new DOMParser().parseFromString(svg, 'image/svg+xml')
    .children[0];

  svgNode.getAttributeNames().forEach((name) => {
    if (name.toLowerCase() === 'viewbox') {
      attributes.viewBox = svgNode.getAttribute(name);
    } else {
      attributes[name.toLowerCase()] = svgNode.getAttribute(name);
    }
  });

  return { attributes, content: svgNode.innerHTML };
};
