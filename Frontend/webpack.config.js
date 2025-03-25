const path = require('path');

module.exports = {
  entry: './src/index.js', // نقطة الدخول الخاصة بك (أو نقطة البداية للمشروع)
  output: {
    path: path.resolve(__dirname, 'dist'), // مجلد الخرج
    filename: 'bundle.js', // اسم ملف الخرج
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // استخدام Babel لتحويل الشيفرة
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // معالجة ملفات CSS
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};
module.exports = {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify")
      }
    }
  };
  