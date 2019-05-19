export function buildQuery(params: { [key: string]: string | number }) {
  return Object.entries(params).reduce((accumulatedQuery, [key, value]) => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value.toString());
    return `${accumulatedQuery}&${encodedKey}=${encodedValue}`;
  }, "?");
}
