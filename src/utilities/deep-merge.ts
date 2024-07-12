/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: never) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function mergeDeep(target: never, source: never) {
  if (isObject(target) && isObject(source)) {
    for (const key in source as object) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, source);
}
