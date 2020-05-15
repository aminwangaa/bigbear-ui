//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    }
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true
            }
          }
        }
      ],
    })
    config.module.rules.push({
      test: /\.(gif|jpe?g|png|svg)$/,
      use: {
        loader: 'url-loader',
        options: { name: '[name].[ext]' }
      }
    });
    const isprod = config.mode === 'production'
    isprod ? config.devtool = 'none' : null;

    let tser = isprod ? config.optimization.minimizer : []
    let maxAssetSize = 1024 * 1024
    config.performance = {
      maxAssetSize: maxAssetSize
    }
    config.optimization = {
      minimizer: tser,
      minimize: isprod ? true : false,
      splitChunks: {//分割代码块
        chunks: 'all',
        maxSize: maxAssetSize,
      },
      runtimeChunk: true
    }
    //config.plugins.push(new BundleAnalyzerPlugin())
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

