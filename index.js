import DiContainer from './src/DiContainer.js';
import Factory from './src/Factory.js';

/**
 * @import {
 *  IDiContainer,
 *  Dependencies,
 *  Dependency
 * } from './src/IDiContainer.js'
 * 
 * @import { IDiContainerFactory } from './src/IFactory.js'
 */

export {
  DiContainer,
  Factory
};

/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @typedef {IDiContainer<T>} IDiContainer
 */

/**
 * @template {Record<PropertyKey, Function>} T
 * 
 * @typedef {Dependencies<T>} Dependencies
 */

/**
 * @template {Function} T
 * 
 * @typedef {Dependency<T>} Dependency
 */

/**
 * @typedef {IDiContainerFactory} IDiContainerFactory
 */
