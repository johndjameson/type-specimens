export const fetchJson = async url =>
  await fetch(url).then(response => response.json())
