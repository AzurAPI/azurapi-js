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

const defaultConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};

const getCustomTsLoaderOptions = options => {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options,
      },
    ],
    exclude: /node_modules/,
  };
};

const getConfigTemplate = config => {
  const mergedConfig = mergeDeep(defaultConfig, { ...config });
  console.log(mergedConfig);
  return mergedConfig;
};

const getOutput = ({ type, name }) => ({
  path: path.resolve(__dirname, 'build'),
  filename: `azurapi.${name || type}.bundle.js`,
  library: { name: `azurapi.${name || type}`, type },
});

const getResolveFallback = () => ({
  fallback: { fs: false, http: false, https: false, url: false, path: false },
});

module.exports = {
  isObject,
  mergeDeep,
  getResolveFallback,
  getConfigTemplate,
  getOutput,
  defaultConfig,
  getCustomTsLoaderOptions,
};
