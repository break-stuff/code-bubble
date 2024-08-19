/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: never) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Merges the content of two objects
 * @param target object being merged into
 * @param sources data to merge into the target
 * @returns object
 */
export function mergeDeep(target: never, source: never) {
  if (!isObject(target) || !isObject(source)) {
    return target;
  }

  for (const key in source as object) {
    if (isObject(source[key])) {
      Object.assign(target, { [key]: mergeDeep(target[key] || { [key]: {} }, source[key]) });
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return target;
}