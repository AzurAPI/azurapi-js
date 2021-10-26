import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

const isObject = item => item && typeof item === 'object' && !Array.isArray(item);

/* To deep merge a custom config with the default */
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
  externals: [nodeExternals()],
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

const cjsModules = ['commonjs', 'commonjs2'];
const getOutput = ({ type, name }) => {
  const ext = cjsModules.includes(type) ? 'cjs' : 'js';

  return {
    path: resolve('build'),
    filename: `azurapi.${name || type}.bundle.${ext}`,
    library: { type },
  };
};

const getResolveFallback = () => ({
  fallback: { fs: false, http: false, https: false, url: false, path: false },
});

export {
  isObject,
  mergeDeep,
  getResolveFallback,
  getConfigTemplate,
  getOutput,
  defaultConfig,
  getCustomTsLoaderOptions,
};
