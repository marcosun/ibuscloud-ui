/**
 * Compare whether path matches current path.
 * Return true if matches, return false if not.
 * @param {(number|RegExp|string)} matchPath - RegExp that will be matched
 * against with current path.
 * @param {string} currentPath - Current pathname.
 * @return {boolean}
 */
export default function doesPathMatch(matchPath, currentPath) {
  return RegExp(matchPath).test(currentPath);
}
