/**
 * @typedef {object} IDiContainerFactory
 * @property {<T>(dependencies: T) => IDiContainer<T>} create
 */
  
/**
 * @typedef {object} DiContainerFactoryProperties
 * @property {DiContainerConstructable} DiContainer
 * 
 * @typedef {DiContainerFactoryProperties} DiContainerFactoryParams
 */

/**
 * @typedef {import('./DiContainer.js').DiContainerConstructable} DiContainerConstructable
 */

/**
 * @template T
 * 
 * @typedef {import('./IDiContainer.js').IDiContainer<T>} IDiContainer
 */
