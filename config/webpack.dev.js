const config = require('./webpack.common');
const paths = require('./paths');

module.exports = Object.assign({}, config, {
  output: Object.assign({}, config.output, {
    filename: 'rx-collection.js',
    path: paths.build,
  }),
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: paths.src,
        loader: 'awesome-typescript-loader',
        options: {
          cacheDirectory: paths.cache,
          configFileName: paths.tsconfig,
          mapRoot: '../dist/umd',
          target: 'es5',
          forkChecker: true,
        },
      },
    ],
  },
});
