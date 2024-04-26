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
 * @typedef {new <T>(params: T) => DiContainer<T>} DiContainerConstructable
 */

/**
 * @template T
 * 
 * @implements {IDiContainer}
 */
export default class DiContainer {
  /**
   * @typedef {import('./IDiContainer.js').IDiContainer<T>} IDiContainer
   */

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

  /** @type {IDiContainer['has']} */
  has(key) {
    //@ts-ignore
    return key in this.#dependencies;
  }

  /** @type {IDiContainer['get']} */
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

    let dependency = dependencies[key];

    if (typeof dependency !== 'function') {
      throw Object.assign(new Error(
        `${key.toString()} must be a function`,
        {
          cause: {
            key
          }
        }
      ), {
        name: 'DependencyNotFunctionError'
      });
    }

    /**
     * @typedef {T[typeof key]} D 
     */

    const container = /** @type {GetArgType<D>} */ (this);

    /** @type {(container: GetArgType<D>) => Instances<T>[typeof key]} */
    dependency = dependency.bind(dependencies);

    const instances = this.#instances;
    if (!(key in instances)) {
      const instance = dependency(container);

      instances[key] = instance;
    }

    return instances[key];
  }
}
