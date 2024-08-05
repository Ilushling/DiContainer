/**
 * @import {
 *  IDiContainer,
 *  Dependencies,
 *  Instances,
 *  GetArgType
 * } from './IDiContainer.js'
 */

/**
 * @typedef {new <T extends Dependencies<Record<PropertyKey, Function>>>(
 *  params: T
 * ) => DiContainer<T>
 * } DiContainerConstructable
 */

/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @implements {IDiContainer<T>}
 */
export default class DiContainer {
  /**
   * @template {Record<PropertyKey, Function>} T
   * 
   * @typedef {DiContainerDependencies<T>['dependencies']} DiContainerParams
   */

  /**
   * @template {Record<PropertyKey, Function>} T
   * 
   * @typedef {DiContainerDependencies<T>
   *  & DiContainerStates<T>} DiContainerProperties
   */

  /**
   * @template {Record<PropertyKey, Function>} T
   * 
   * @typedef {object} DiContainerDependencies
   * @property {Dependencies<T>} dependencies
   */

  /**
   * @template {Record<PropertyKey, Function>} T
   * 
   * @typedef {object} DiContainerStates
   * @property {Instances<T>} instances
   */

  /** @type {DiContainerProperties<T>['dependencies']} */
  #dependencies;

  /** @type {DiContainerProperties<T>['instances']} */
  #instances;

  /** @param {DiContainerParams<T>} dependencies */
  constructor(dependencies) {
    this.#dependencies = dependencies;

    const instances = /** @type {Instances<T>} */ ({});

    this.#instances = instances;
  }

  getDependencies() {
    return this.#dependencies;
  }

  /** @type {IDiContainer<T>['has']} */
  has(key) {
    //@ts-ignore
    return key in this.#dependencies;
  }

  /** @type {IDiContainer<T>['get']} */
  get(key) {
    const dependencies = this.#dependencies;
    if (!(key in dependencies)) {
      throw Object.assign(
        new Error(
          `${key.toString()} dependency not found`,
          {
            cause: {
              key
            }
          }
        ),
        {
          name: 'DependencyNotFoundError'
        }
      );
    }

    const dependency = dependencies[key];

    const instances = this.#instances;
    if (!(key in instances)) {
    /**
     * @typedef {typeof key} K
     * @typedef {T[K]} D
     */

    const container = /** @type {GetArgType<D>} */ (this);

      const instance = dependency(container);

      instances[key] = instance;

      return instance;
    }

    return instances[key];
  }
}
