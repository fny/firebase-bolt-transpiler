'use strict';

const _ = require('lodash');

// Private: Mappings from some Bolt built-in types to their TypeScript equivalents
const BOLT_BUILTIN_MAPPING = {
  Any: 'any',
  Boolean: 'boolean',
  Number: 'number',
  Null: 'void',
  Object: '{}',
  String: 'string',
};

function convertBuiltin(builtin) {
  return BOLT_BUILTIN_MAPPING[builtin] || builtin;
}


function ts(type) {
  if (typeof type === 'string') {
    return convertBuiltin(type);
  }

  let str = convertBuiltin(type.name);

  if (type.params && type.params.length > 0) {
    str += '<';
    str += type.params.map(ts).join(', ');
    str += '>';
  }
  return str;
}

function tse(type) {
  if (typeof type === 'string') {
    return convertBuiltin(type);
  }

  let str = type.name;

  if (type.params && type.params.length > 0) {
    str += '<';
    str += type.params.map(ts).join(', ');
    str += '>';
  }
  return str;
}

// Private:
function unionPropertyLine(name, types) {
  const isNullable = _.some(types, type => type.name === 'Null');
  const tsTypes = types.filter(type => type.name !== 'Null');

  let str = '';
  str += name;
  str += isNullable ? '?' : '';
  str += ': ';
  str += tsTypes.map(ts).join(' | ');
  str += '';
  return str;
}

function mapPropertyLine(name, typeDefiniton) {
  const mapType = typeDefiniton.params[1].name;
  return `${name}: { [string]: ${convertBuiltin(mapType)} },`;
}

function genericPropertyLine(name, typeDef) {
  switch (typeDef.name) {
    case 'Map':
      return mapPropertyLine(name, typeDef);
    default:
      return `${name}: ${ts(typeDef)},`;
  }
}

function propertyLine(property) {
  const name = property.name;
  const typeDef = property.definition;

  switch (typeDef.type) {
    case 'type':
      return `${name}: ${convertBuiltin(typeDef.name)},`;
    case 'union':
      return unionPropertyLine(name, typeDef.types);
    case 'generic':
      return genericPropertyLine(name, typeDef);
    default:
      throw new Error(`Unknown type ${typeDef.type}`);
  }
}

// type - TopLevelType
//
// Returns the extension part of a TypeScript interface definition.
// e.g. the ` extends String` in `interface UserID extends String`
//
// Note this will return `extends Any` for any Bolt defintion without any
// defined parent or properties.
function interfaceExtension(type) {
  if (type.parent !== 'Object') {
    if (type.parent !== 'Any' || type.parent === 'Any' && type.properties !== []) {
      return ` extends ${tse(type.definition.derivedFrom)}`;
    }
    return '';
  }
  return '';
}

// type - TopLevelType
function interfaceOpen(type) {
  let str = '';
  str += '\nexport interface ';
  str += tse(type);
  str += interfaceExtension(type);
  str += ' {';
  return str;
}

// simpleBoltSchema - SimpleBoltSchema
function render(simpleBoltSchema) {
  let str = '// @flow\n';
  simpleBoltSchema.types
    .filter(type => type.definition.derivedFrom.name === 'Map')
    .forEach(type => {
      str += `export type ${type.name} = { [string]:  ${type.definition.derivedFrom.params[1].name} };
`;
    });
  simpleBoltSchema.types
    .filter(type => type.definition.derivedFrom.name !== 'Map')
    .forEach(type => {
      str += interfaceOpen(type);
      str += '\n';
      type.properties.forEach(property => {
        str += '  ';
        str += propertyLine(property);
        str += '\n';
      });
      str += '}\n';
    });
  return str;
}

render.interfaceOpen = interfaceOpen;
render.propertyLine = propertyLine;

module.exports = render;
