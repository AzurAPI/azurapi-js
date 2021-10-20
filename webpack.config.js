const helper = require('./webpack.helper');

module.exports = [
  helper.getConfigTemplate({
    module: { rules: [helper.getCustomTsLoaderOptions({ configFile: 'tsconfig.esm.json' })] },
    entry: ['./src/index.ts'],
    output: helper.getOutput({ type: 'umd' }),
    resolve: helper.getResolveFallback(),
  }),
];
