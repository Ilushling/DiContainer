/**
 * @template T
 * @typedef {T extends (...args: any) => infer R ? R : unknown} GetReturnType
 */

/**
 * @template F, T
 * @typedef {(container: DiContainer<T>) => GetReturnType<F>} Dependency
 */
/**
 * @template T
 * @typedef {{ [P in keyof T]: Dependency<T[P], T> }} Dependencies
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
 */
export default class DiContainer {
  #dependencies;
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
   * @template {keyof T} K
   * @param {K} key
   */
  has(key) {
    return key in this.#dependencies;
  }

  /**
   * @template {keyof T} K
   * @param {K} key
   * @returns {Instances<T>[K]}
   * @throws {Error}
   */
  get(key) {
    const dependencies = this.#dependencies;
    if (!(key in dependencies)) {
      throw new Error(`No ${key.toString()} dependency`);
    }

    const dependency = dependencies[key];
    if (typeof dependency !== 'function') {
      throw new Error(`${key.toString()} must be a function`);
    }

    const instances = this.#instances;
    if (!(key in instances)) {
      const instance = dependency(this);

      instances[key] = instance;
    }

    return instances[key];
  }
}
