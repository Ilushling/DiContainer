/**
 * @import {
 *  ContainerDependency,
 *  Dependencies
 * } from './container.test.js'
 */

/**
 * @typedef {Dependencies<{
 *  linked: ContainerDependency<number>;
 * }>} ModuleDependencies
 */

/**
 * @type {ModuleDependencies}
 */
export default {
  linked() {
    return 2;
  }
};
