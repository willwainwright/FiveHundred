export function sortArrayBy(arr, prop) {
  return arr.sort((a, b) => a[prop] - b[prop]);
}
