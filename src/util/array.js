export function sortBy(arr, prop) {
    return arr.sort((a, b) => a[prop] - b[prop]);
}