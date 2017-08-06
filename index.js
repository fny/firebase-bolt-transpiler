const bolt = require('firebase-bolt');
const SimpleBoltSchema = require('./lib/SimpleBoltSchema.js');
const renderTypeScript = require('./lib/renderTypeScript.js');
const renderFlow = require('./lib/renderFlow.js');

module.exports = {
  typescript: (boltString) => {
    const parsed = bolt.parse(boltString);
    const schema = new SimpleBoltSchema(parsed.schema);
    return renderTypeScript(schema);
  },
  flow: (boltString) => {
    const parsed = bolt.parse(boltString);
    const schema = new SimpleBoltSchema(parsed.schema);
    return renderFlow(schema);
  }
};
