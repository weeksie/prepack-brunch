const expect = require('chai').expect;
const Plugin = require('.');

// much of this is shamelessly lifted from the ugilfy-js brunch plugin

describe('prepack-brunch', () => {
  let plugin;

  const INPUT = `(function() {
  function fib(x) {
    return x <= 1 ? x : fib(x - 1) + fib(x - 2);
  }

  let x = Date.now();
  if (x * 2 > 42) x = fib(10);
  global.result = x;
})();`;

  const EXPECTED = `(function () {
  var _$0 = Date.now();

  if (typeof _$0 !== "number") {
    throw new Error("Prepack model invariant violation: " + _$0);
  }

  result = _$0 * 2 > 42 ? 55 : _$0;
})();`;

  beforeEach(() => {
    plugin = new Plugin(Object.freeze({
      plugins: {},
    }));
  });

  it('should have #optimize method', () => {
    expect(plugin).to.respondTo('optimize');
  });

  it('should produce the correct result', () => {
    return plugin.optimize({data: INPUT})
                 .then(result => {
                   expect(result).to.eql({map: null, data: EXPECTED});
                 });
  });

  /* TODO, no idea why prepack isn't putting out a sourcemap.
  it('should prepack and produce a sourcemap', () => {
    plugin = new Plugin({plugins: {}, sourceMaps: true});
    const expectedMap = "";
    return plugin.optimize({data: INPUT, path: 'file.js'})
                 .then(result => {
                   expect(result.data).to.equal(EXPECTED);
                   expect(result.map).to.equal(expectedMap);
                 });
  });
  */

});
