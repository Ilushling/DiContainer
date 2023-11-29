/**
 * @template T
 * @typedef {import('../src/DiContainer.js').default<T>} DiContainer
 */
/**
 * @template T
 * @typedef {import('../src/DiContainer.js').Dependencies<T>} Dependencies
 */

/**
 * @typedef {Dependencies<{
 *   linked: () => number
 * }>} ModuleDependencies
 * @type {ModuleDependencies}
 */
export default {
  linked() {
    return 2;
  }
};