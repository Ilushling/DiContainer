/**
 * @import { IDiContainerFactory } from './IFactory.js'
 * 
 * @import { DiContainerConstructable } from './DiContainer.js'
 */

/**
 * @implements {IDiContainerFactory}
 */
export default class DiContainerFactory {
  /**
   * @typedef {DiContainerFactoryDependencies} DiContainerFactoryParams
   * @typedef {DiContainerFactoryDependencies} DiContainerFactoryProperties
   * 
   * @typedef {object} DiContainerFactoryDependencies
   * @property {DiContainerConstructable} DiContainer
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
