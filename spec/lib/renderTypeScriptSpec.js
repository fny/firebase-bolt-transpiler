const bolt = require('firebase-bolt');
const SimpleBoltSchema = require('../../lib/SimpleBoltSchema.js');
const renderTypeScript = require('../../lib/renderTypeScript.js');
const _ = require('lodash');

const boltExample = `
type Type {}
type SimpleType {
  name: String
}
type GenericType<T> {
  name: T
}
type Pairs<X, Y> {
  x: X
  y: Y
}
type GenericExtension extends GenericType<Number> {
  extension: String;
}
type PairExtension extends Pair<Number, String> {
  extension: Number;
}
type NoDefinedProperties {}
type StringExtension extends String {}
type ObjectExtension extends Object {}
type PropertyLineCheck {
  // Builtins
  any: Any
  boolean: Boolean
  null: Null
  number: Number
  object: Object
  string: String

  // Union types
  union: Type | String | Number
  nullable_union: Type | String | Number | Null
  nullable_string: String | Null

  // Generics
  map: Map<StringExtension, Number>
  objects: Object[]
  pair: Pair<Number, String>
  generic_union: Pair<Number, String> | Number
  nested_generic_union: Pair<Pair<Number, String>, String> | Number
}
`;

const schema = new SimpleBoltSchema(bolt.parse(boltExample).schema);
const typesByName = _.keyBy(schema.types, 'name');
const propsByName = _.keyBy(typesByName.PropertyLineCheck.properties, 'name');

function interfaceOpen(interfaceName) {
  return renderTypeScript.interfaceOpen(typesByName[interfaceName]);
}
function propertyLine(propName) {
  return renderTypeScript.propertyLine(propsByName[propName]);
}

describe('renderTypeScript', () => {
  describe('interfaceOpen', () => {
    it('simple type with properties', () => {
      expect(interfaceOpen('SimpleType'))
        .toEqual('interface SimpleType {');
    });

    it('generic type with properties', () => {
      expect(interfaceOpen('GenericType'))
        .toEqual('interface GenericType<T> {');
    });

    it('generic type with multiple parameters', () => {
      expect(interfaceOpen('Pairs'))
        .toEqual('interface Pairs<X, Y> {');
    });

    it('type without any properties (should extend Any)', () => {
      expect(interfaceOpen('NoDefinedProperties'))
        .toEqual('interface NoDefinedProperties extends Any {');
    });

    it('type which extends another type', () => {
      expect(interfaceOpen('StringExtension'))
        .toEqual('interface StringExtension extends String {');
    });

    // it('type which extends Object', () => {
    //   expect(interfaceOpen('ObjectExtension'))
    //     .toEqual('interface ObjectExtension extends Object {');
    // });

    it('type which extends a generic with a single parameter', () => {
      expect(interfaceOpen('GenericExtension'))
        .toEqual('interface GenericExtension extends GenericType<number> {');
    });

    it('type which extends a generic with multiple parameters', () => {
      expect(interfaceOpen('PairExtension'))
        .toEqual('interface PairExtension extends Pair<number, string> {');
    });
  });

  describe('propertyLine', () => {
    it('renders builtins appropriately', () => {
      expect(propertyLine('any')).toEqual('any: any;');
      expect(propertyLine('boolean')).toEqual('boolean: boolean;');
      expect(propertyLine('number')).toEqual('number: number;');
      expect(propertyLine('null')).toEqual('null: void;');
      expect(propertyLine('object')).toEqual('object: Object;');
      expect(propertyLine('string')).toEqual('string: string;');
    });
  });

  //
  // Generics
  //

  it('arrays', () => {
    expect(propertyLine('objects')).toEqual('objects: { [key: string]: Object; };');
  });

  it('maps', () => {
    expect(propertyLine('map')).toEqual('map: { [key: string]: number; };');
  });

  it('pair', () => {
    expect(propertyLine('pair')).toEqual('pair: Pair<number, string>;');
  });

  //
  // Unions
  //

  it('union', () => {
    expect(propertyLine('union')).toEqual('union: Type | string | number;');
  });

  it('union with null', () => {
    expect(propertyLine('nullable_union')).toEqual('nullable_union?: Type | string | number;');
  });

  it('nullable', () => {
    expect(propertyLine('nullable_string')).toEqual('nullable_string?: string;');
  });

  it('union with generic', () => {
    expect(propertyLine('generic_union')).toEqual('generic_union: Pair<number, string> | number;');
  });

  it('nested union with generic', () => {
    expect(propertyLine('nested_generic_union'))
      .toEqual('nested_generic_union: Pair<Pair<number, string>, string> | number;');
  });
});
