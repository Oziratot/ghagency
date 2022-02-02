// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PUBLIC_PATH = process.env.PUBLIC_PATH || '';

const withTM = require('next-transpile-modules')(['react-imask', 'imask']); // pass the modules you would like to see transpiled

module.exports = withTM({
  assetPrefix: PUBLIC_PATH,
  env: {
    PUBLIC_PATH,
    YA_METRIKA_ID: '',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.module.rules.push(
      {
        test: /\.(jpe?g|png|gif|ico|zip|pdf)$/i,
        loader: 'file-loader',
        options: {
          name: dev ? '[path][name].[ext]' : '[path][name].[hash:6].[ext]',
        }
      },
      {
        test: /\.svg$/,
        issuer: /\.jsx?$/,
        use: [
          { loader: '@svgr/webpack', options: { svgoConfig: { plugins: [ { cleanupIDs: false }, { prefixIds: false }, { removeViewBox: false } ] } } },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.s?css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: dev ? '[path][name].[ext]' : '[path][name].[hash:6].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    );

    // config.plugins.push(
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   reportFilename: 'report.html',
      //   defaultSizes: 'parsed',
      //   openAnalyzer: false,
      //   generateStatsFile: false,
      //   logLevel: 'info',
      // }),
    // );

    return config
  },
});
