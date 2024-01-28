/**
 * @template T
 * @typedef {import('./DiContainer.js').default<T>} DiContainer
 */

/**
 * @template T
 * @typedef {import('./DiContainer.js').Dependencies<T>} Dependencies
 */

/**
 * @template T
 * @typedef {import('./DiContainer.js').DiContainerConstructable<T>} DiContainerConstructable
 */

/**
 * @typedef {object} DiContainerFactoryParams
 * @property {DiContainerConstructable<any>} DiContainer
 */
export default class DiContainerFactory {
  /** @type {DiContainerFactoryParams['DiContainer']} */
  #DiContainer;

  /** @param {DiContainerFactoryParams} params */
  constructor({ DiContainer }) {
    this.#DiContainer = DiContainer;
  }

  /**
   * @template T
   * @param {T} dependencies
   */
  create(dependencies) {
    return /** @type {DiContainer<T>} */ (new this.#DiContainer(dependencies));
  }
}
