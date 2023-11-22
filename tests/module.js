/**
 * @template T
 * @typedef {import('../src/DiContainer.js').default<T>} DiContainer
 */
/**
 * @template T
 * @typedef {import('../src/DiContainer.js').Dependencies<T>} Dependencies
 */

/**
 * @typedef {{
 *   linked: () => number
 * }} moduleDependencies
 * @type {Dependencies<moduleDependencies>}
 */
export default {
  linked() {
    return 2;
  }
};