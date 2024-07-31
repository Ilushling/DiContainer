/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @typedef {object} IDiContainer
 * @property {() => Dependencies<T>} getDependencies
 * @property {<K extends string>(key: K) => K extends keyof T ? true : false} has
 * @property {<K extends keyof T>(key: K) => Instances<T>[K]} get
 */

/**
 * @template {Function} F
 * 
 * @typedef {(container: GetArgType<F>) => GetReturnType<F>} Dependency
 */

/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @typedef {{ [P in keyof T]: Dependency<T[P]> }} Dependencies
 */

/**
 * @template {Function} T
 * 
 * @typedef {GetReturnType<T>} Instance
 */

/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @typedef {{ [P in keyof T]: Instance<T[P]> }} Instances
 */

/**
 * @template {Function} T
 * 
 * @typedef {T extends (arg: infer R) => unknown ? R : unknown} GetArgType
 */

/**
 * @template {Function} T
 * 
 * @typedef {T extends (...args: any) => infer R ? R : any} GetReturnType
 */
