const paths = require('./paths')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  // entry: [path.src + '/index.js'],
  entry: {
    home: paths.src + '/js/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: 'assets',
        ignore: ['*.DS_Store'],
      },
    ]),

    /**
     * HtmlWebpackPlugin
     *
     * Generates an HTML file from a template.
     */
    new HtmlWebpackPlugin({
      title: 'México Previene',
      // favicon: path.static + '/favicon.png',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),
    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: paths.src + '/partials/nav.html',
        priority: 'high',
        location: 'body',
        template_filename: [
          'index.html'
        ]
      }
    ]),
    new HtmlWebpackPartialsPlugin([
      {
        path: paths.src + '/partials/footer.html',
        priority: 'low',
        location: 'body',
        template_filename: [
          'index.html'
        ]
      }
    ]),
    new HtmlWebpackPartialsPlugin([
      {
        path: paths.src + '/partials/header.html',
        priority: 'low',
        location: 'head',
        template_filename: [
          'index.html'
        ]
      }
    ]),
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: {
    rules: [
      /**
       * JavaScript
       *
       * Use Babel to transpile JavaScript files.
       */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },

      /**
       * Styles
       *
       * Inject CSS into the head with source maps.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          // { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      /**
       * Images
       *
       * Copy image files to build folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg|mov)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][hash].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][hash].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },
    ],
  },
}
