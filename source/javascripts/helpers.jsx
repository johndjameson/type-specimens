// *************************************
//
//   Helpers
//   -> Utility functions
//
// *************************************

// -------------------------------------
//   Create Markup
// -------------------------------------

export function createMarkup(markup) {
  return { __html: markup }
}

// -------------------------------------
//   Parse SVG
// -------------------------------------

export function parseSvg(svg) {
  let parser = new DOMParser()

  let element = parser.parseFromString(svg, 'image/svg+xml')

  let markup = element.children[0].innerHTML
  let viewBox = element.children[0].getAttribute('viewBox')

  return { markup, viewBox }
}
