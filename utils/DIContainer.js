import _ from "lodash";

class DIContainer {
  items = new Map();

  dirs = {};

  loadDir(compPatterns, opts) {
    const loadedComponents = {};
    for (const item of compPatterns) {
      const [Components] = _.castArray(item);
      _.mapValues(Components, (com, key) => {
        const comName = _.last(
          key.replace("/index.js", "").replace(".js", "").split("/")
        );
        const comVal = _.get(com, "default");
        if (comVal) {
          _.set(loadedComponents, comName, comVal);
        }
      });
    }
    this.register(loadedComponents);
  }

  register(input) {
    _.map(input, (com, key) => {
      this.items.set(key, com);
    });
  }

  resolve(name) {
    return this.items.get(name);
  }

  get(name) {
    return this.resolve(name);
  }

  has(name) {
    return this.items.has(name);
  }
}

export default DIContainer;