const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Generate html files for JS bundles
      new HtmlWebpackPlugin({
        template: './src/index.html', //path to index.html
        filename: 'index.html',
        chunks: ['main'], //name of the chunk to be loaded
      }),

      //Generate manifest.json
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
          //not sure about this code
          {
            src: path.resolve('src/assets/large-icon.png'),
            size: '1024x1024', // you can also use the specifications pattern
          },
          //not sure about this code
          {
            src: path.resolve('src/assets/maskable-icon.png'),
            size: '1024x1024',
            purpose: 'maskable',
          },
        ],
      }),

      //Generate service worker in bundle
      new InjectManifest({
        swSrc: './src-sw.js',
        ewDest: 'sw.js',
      }),
      
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
          }
        },
        
      ],
    },
  };
};
