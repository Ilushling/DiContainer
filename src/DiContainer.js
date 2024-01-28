/**
 * @template T
 * @typedef {T extends (arg: infer R) => any ? R : any} GetArgType
 */
/**
 * @template T
 * @typedef {T extends (...args: any) => infer R ? R : any} GetReturnType
 */

/**
 * @template F
 * @typedef {(container: GetArgType<F>) => GetReturnType<F>} Dependency
 */
/**
 * @template T
 * @typedef {{ [P in keyof T]: Dependency<T[P]> }} Dependencies
 */

/**
 * @template T
 * @typedef {GetReturnType<T>} Instance
 */
/**
 * @template T
 * @typedef {{ [P in keyof T]: Instance<T[P]> }} Instances
 */

/**
 * @template T
 * @typedef {new (params: T) => DiContainer<T>} DiContainerConstructable
 */

/**
 * @template T
 */
export default class DiContainer {
  /** @type {Dependencies<T>} */
  #dependencies;

  /** @type {Instances<T>} */
  #instances;

  /** @param {Dependencies<T>} dependencies */
  constructor(dependencies) {
    this.#dependencies = dependencies;

    const instances = /** @type {Instances<T>} */ ({});

    this.#instances = instances;
  }

  getDependencies() {
    return this.#dependencies;
  }

  /**
   * @template {string} K
   * @param {K} key
   * @returns {K extends keyof T ? true : false}
   */
  has(key) {
    // @ts-ignore
    return key in this.#dependencies;
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   */
  get(key) {
    const dependencies = this.#dependencies;
    if (!(key in dependencies)) {
      throw Object.assign(new Error(`${key.toString()} dependency not found`), {
        name: 'DependencyNotFoundError'
      });
    }

    const dependency = dependencies[key]?.bind(dependencies);
    if (typeof dependency !== 'function') {
      throw Object.assign(new Error(`${key.toString()} must be a function`), {
        name: 'DependencyNotFunctionError'
      });
    }

    const instances = this.#instances;
    if (!(key in instances)) {
      const container = /** @type {GetArgType<T[K]>} */ (this);

      const instance = dependency(container);

      instances[key] = instance;
    }

    return instances[key];
  }
}
