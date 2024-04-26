/**
 * @template T
 * 
 * @typedef {object} IDiContainer
 * @property {() => Dependencies<T>} getDependencies
 * @property {<K extends string>(key: K) => K extends keyof T ? true : false} has
 * @property {<K extends keyof T>(key: K) => Instances<T>[K]} get
 */

/**
 * @typedef {new <T>(params: T) => IDiContainer<T>} DiContainerConstructable
 */

/**
 * @template F
 * 
 * @typedef {(container: GetArgType<F>) => GetReturnType<F>} Dependency
 */

/**
 * @template T
 * 
 * @typedef {{ [P in keyof T]: Dependency<T[P]> }} Dependencies
 */

/**
 * @template T
 * 
 * @typedef {GetReturnType<T>} Instance
 */

/**
 * @template T
 * 
 * @typedef {{ [P in keyof T]: Instance<T[P]> }} Instances
 */

/**
 * @template T
 * 
 * @typedef {T extends (arg: infer R) => any ? R : any} GetArgType
 */

/**
 * @template T
 * 
 * @typedef {T extends (...args: any) => infer R ? R : any} GetReturnType
 */
