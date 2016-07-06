const fs = require('fs');
const glob = require('glob');
const path = require('path');
const parser = require('../index.js').typescript;
const diffMatchers = require('jasmine-diff-matchers');

const samplesPath = path.join(__dirname, '../samples/*.bolt');
const samplesFiles = glob.sync(samplesPath);
const samples = samplesFiles.map(file => {
  return {
    name: path.basename(file),
    boltFile: file,
    tsFile: file.replace('.bolt', '.ts'),
  };
});

beforeEach(() => {
  jasmine.addMatchers(diffMatchers);
});

function testSample(sample) {
  it(sample.name, (done) => {
    const boltString = fs.readFileSync(sample.boltFile).toString();
    const tsString = fs.readFileSync(sample.tsFile).toString();
    expect(parser(boltString)).toEqual(tsString);
    done();
  });
}

describe('Samples', () => {
  for (let i = 0; i < samples.length; i++) {
    testSample(samples[i]);
  }
});
