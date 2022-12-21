export class DIContainer {
  dependencies;
  instances;

  constructor(dependencies) {
    this.dependencies = dependencies;
    this.instances = {};
  }

  /**
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return key in this.dependencies;
  }

  /**
   * @param {string} key
   * @returns {object}
   */
  get(key) {
    if ((key in this.instances) === false) {
      const instance = this.dependencies[key](this);
      this.instances[key] = instance;
    }

    return this.instances[key];
  }
}