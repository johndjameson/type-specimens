export const fetchJson = async url =>
  await fetch(url).then(response => response.json())

export const fetchText = async url =>
  await fetch(url).then(response => response.text())

export const imageKitUrl = ({ path, transformations = {} }) => {
  const entries = Object.entries(transformations)

  if (entries.length === 0) {
    return `https://ik.imagekit.io/johndjameson/type-specimens/${path}`
  }

  const transform = entries
    .map(([param, value]) => `${param}-${value}`)
    .join(',')

  return `https://ik.imagekit.io/johndjameson/tr:${transform}/type-specimens/${path}`
}

export const parseSvg = svg => {
  let parser = new DOMParser()

  let element = parser.parseFromString(svg, 'image/svg+xml')

  let markup = element.children[0].innerHTML
  let viewBox = element.children[0].getAttribute('viewBox')

  return { markup, viewBox }
}
