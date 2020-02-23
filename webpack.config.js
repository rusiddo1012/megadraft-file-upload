var publidDir = __dirname + '/dist';
module.exports = {
  mode: 'development',
  entry: [
     './src/plugin.js'
   ],
   output: {
    path: publidDir,
    publicPath: `${publidDir}/`,
    filename: 'megadraft-file-upload.js',
    library: 'megadraft-file-upload',
  },
  module: {
    rules: [{
      test   : /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["@babel/preset-env", "@babel/preset-react"]
      },
      type: 'javascript/auto'
    }]
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json', '.gql', '.graphql', '.jsx']
  }
 }; 