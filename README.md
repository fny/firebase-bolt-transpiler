# Firebase Bolt Transpiler :zap:

[![Build Status](https://travis-ci.org/fny/firebase-bolt-transpiler.svg?branch=master)](https://travis-ci.org/fny/firebase-bolt-transpiler) [![npm version](https://badge.fury.io/js/firebase-bolt-transpiler.svg)](http://badge.fury.io/js/firebase-bolt-transpiler) [![Dependencies](https://david-dm.org/fny/firebase-bolt-transpiler.svg)](https://david-dm.org/fny/firebase-bolt-transpiler)

Transpile your Bolt files into TypeScript! Java and Swift coming soon.

Featuring `GenericSupport<T>` and `NestedGenericSupport<NestedGenericSupport<GenericSupport<T>>>`

## Usage

    const boltTranspiler = require('boltTranspiler');

    boltTranspiler.typescript('type Person { name: String }')
    // => 'interface Person { name: string; }'

## Known Issues

 - `type ExtendedObject extends Object {}` doesn't return `interface ExtendedObject extends Object {}` since the Bolt compiler marks everything as derived from `Object` by default
 - Array types (e.g. `Object[]`) aren't tranlated to arrays in TypeScript since the Bolt compiler turns all arrays into `Map<String, Object>` generics

## Wishlist

 - Better TypeScript formatting
 - Validate generated TypeScript with the TypeScript parser
 - Ability to prefix/suffix generated interface names
 - Commandline tools
 - Better samples
 - Extensions for Gulp users
 - Swift support
 - Java support
