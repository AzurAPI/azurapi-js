import { getConfigTemplate, getCustomTsLoaderOptions, getOutput, getResolveFallback } from './webpack.helper.mjs';

export default [
  getConfigTemplate({
    module: { rules: [getCustomTsLoaderOptions({ configFile: 'tsconfig.esm.json' })] },
    entry: ['./src/index.ts'],
    output: getOutput({ type: 'umd' }),
    resolve: getResolveFallback(),
  }),
  getConfigTemplate({
    module: { rules: [getCustomTsLoaderOptions({ configFile: 'tsconfig.cjs.json' })] },
    entry: ['./src/index.ts'],
    target: 'node',
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    output: getOutput({ type: 'commonjs', name: 'commonjs' }),
  }),
];
