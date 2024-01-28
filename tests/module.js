/**
 * @typedef {import('./container.test.js').Container} Container
 */

/**
 * @template T
 * @typedef {import('./container.test.js').Dependencies<T>} Dependencies
 */

/**
 * @template T
 * @typedef {import('./container.test.js').Dependency<T>} Dependency
 */

/**
 * @typedef {Dependencies<{
 *   linked: Dependency<number>
 * }>} ModuleDependencies
 * @type {ModuleDependencies}
 */
export default {
  linked() {
    return 2;
  }
};
