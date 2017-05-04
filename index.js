'use strict';

const Prepack              = require('prepack'),
      prepack              = Prepack.prepack;/*,
      __assumeDataProperty = Prepack.__assumeDataProperty,
      __abstract           = Prepack.__abstract;
*/


class PrepackOptimizer {
  constructor(config) {
    this.options = Object.assign({}, config.plugins.prepack ||  {});
    this.options.sourceMaps = !!config.sourceMaps;
  }
  optimize(file) {
    try {
      const prepackOptions = Object.assign({
        filename: file.path,
       // inputSourceMapFilename: file.map? file.map.toString() : null
      }, this.options);

      const { code,  map } = prepack(file.data, prepackOptions);

      return Promise.resolve({
        map,
        data: code
      });
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

PrepackOptimizer.prototype.brunchPlugin = true;
PrepackOptimizer.prototype.type = 'javascript';

module.exports = PrepackOptimizer;
