export default class DiContainerFactory {
  /**
   * @typedef {import('./IFactory.js').IDiContainerFactory} IDiContainerFactory
   */

  /**
   * @typedef {import('./IFactory.js').DiContainerFactoryProperties} DiContainerFactoryProperties
   * 
   * @typedef {import('./IFactory.js').DiContainerFactoryParams} DiContainerFactoryParams
   */

  /** @type {DiContainerFactoryProperties['DiContainer']} */
  #DiContainer;

  /** @param {DiContainerFactoryParams} params */
  constructor({ DiContainer }) {
    this.#DiContainer = DiContainer;
  }

  /** @type {IDiContainerFactory['create']} */
  create(dependencies) {
    return new this.#DiContainer(dependencies);
  }
}
