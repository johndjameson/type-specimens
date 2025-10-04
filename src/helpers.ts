interface FetchOptions extends RequestInit {}

export const fetchJson = async (
  url: string,
  options: FetchOptions = {},
): Promise<any> =>
  await fetch(url, options).then((response) => response.json());
