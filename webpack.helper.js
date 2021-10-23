const path = require('path');

const isObject = item => item && typeof item === 'object' && !Array.isArray(item);
const mergeDeep = (target, source) => {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const getCustomTsLoaderOptions = options => {
  return { ...tsLoader, use: [{ ...tsLoader.use[0], options }] };
};

const getConfigTemplate = config => {
  const mergedConfig = mergeDeep(defaultConfig, { ...config });
  console.log(mergedConfig);
  return mergedConfig;
};

const getOutput = ({ type, name }) => ({
  path: path.resolve(__dirname, 'build'),
  filename: `azurapi.${name || type}.bundle.js`,
  library: { type },
});

const getResolveFallback = () => ({
  fallback: { fs: false, http: false, https: false, url: false, path: false },
});

const tsLoader = {
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
    },
  ],
  exclude: [/node_modules/],
};

const defaultConfig = {
  module: {
    rules: [tsLoader],
  },
  resolve: {
    extensions: ['.ts'],
  },
  ignoreWarnings: [/module has no exports/],
};

module.exports = {
  isObject,
  mergeDeep,
  getResolveFallback,
  getConfigTemplate,
  getOutput,
  defaultConfig,
  getCustomTsLoaderOptions,
};
