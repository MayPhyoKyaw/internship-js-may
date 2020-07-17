var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    mode: 'development',
    entry: [
        './api/bin/www.ts'
      ],
      output: {
        path: path.resolve( __dirname, './dist/api' ),
        filename: 'index.js'
      },
      module: {
        rules: [
          {
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' },
            options: { inline: true, fallback: false },
          },
        ],
      },
      resolve: {
        extensions: [ '', '.js', '.ts' ]
      },
      target: 'node',
      externals: [ 'aws-sdk', 'commonjs2 firebase-admin', nodeExternals() ], 
      node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
};