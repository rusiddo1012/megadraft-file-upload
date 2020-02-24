var publidDir = __dirname + '/demo';
module.exports = {
  mode: 'development',
  entry: [
     './demo/index.js'
   ],
   output: {
    filename: 'bundle.js',
    path: publidDir
  },
  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        },
        type: 'javascript/auto'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json', '.gql', '.graphql', '.jsx', '.css']
  },
  devServer: {
    inline: true,
    contentBase: `${publidDir}/public`
  }
 };