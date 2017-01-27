'use strict';

const _ = require('lodash');

class TypeProperty {
  constructor(name, typeDefinition) {
    this.name = name;
    this.definition = typeDefinition;
    this.params = typeDefinition.params;
    this.types = typeDefinition.types;
  }
}

class TopLevelType {
  constructor(name, typeDefinition) {
    this.name = name;
    this.definition = typeDefinition;
    this.parent = typeDefinition.derivedFrom.name;
    this.params = typeDefinition.params;
    this.properties = _.map(typeDefinition.properties, (typeDef, propName) => {
      return new TypeProperty(propName, typeDef);
    });
  }
}

class SimpleBoltSchema {
  // boltSchema - schema produced by `bolt#parse`
  constructor(boltSchema) {
    this.types = _.map(boltSchema, (typeDef, typeName) => {
      return new TopLevelType(typeName, typeDef);
    });
  }
}

module.exports = SimpleBoltSchema;
