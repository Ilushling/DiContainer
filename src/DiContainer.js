/**
 * @template T
 * @typedef {T extends (arg: infer R) => any ? R : unknown} GetArgType
 */
/**
 * @template T
 * @typedef {T extends (...args: any) => infer R ? R : unknown} GetReturnType
 */

/**
 * @template F, T
 * @typedef {(container: GetArgType<F>) => GetReturnType<F>} Dependency
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
   * @throws {DependencyNotFoundError|DependencyNotFunctionError}
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
