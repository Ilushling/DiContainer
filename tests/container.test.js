import assert from 'node:assert';
import { describe, it } from 'node:test';

import DiContainer from '../src/DiContainer.js';
import module from './module.js';

/**
 * @template T
 * @typedef {import('../src/DiContainer.js').Dependencies<T>} Dependencies
 */

/**
 * @typedef {import('./module.js').moduleDependencies} moduleDependencies
 */

/**
 * @typedef {moduleDependencies & {
 *   a: () => number,
 *   b: (container: DiContainer<aDependencies>) => number,
 *   c: (container: DiContainer<aDependencies>) => number
 * }} aDependencies
 * @type {Dependencies<aDependencies>}
 */
const dependencies = {
  ...module,
  a() {
    return 1;
  },
  b(container) {
    const a = container.get('a');

    return a;
  },
  c(container) {
    const b = container.get('b');
    const linked = container.get('linked');

    return b + linked;
  }
};

const container = new DiContainer(dependencies);

describe('container', () => {
  const a = container.get('a');

  it('get simple', () => {
    assert.strictEqual(a, 1);
  });

  const b = container.get('b');
  it('get inner', () => {
    assert.strictEqual(b, a);
  });

  const linked = container.get('linked');
  it('get linked dependency', () => {
    assert.strictEqual(linked, 2);
  });

  const c = container.get('c');
  it('get complex', () => {
    assert.strictEqual(b + linked, c);
  });
});