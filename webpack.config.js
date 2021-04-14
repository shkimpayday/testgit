const path = require("path");
//process.env.NODE_ENV = "production"; 실 서비스 사용시 사용해야됨

const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  name: "word-relay-setting",
  mode: "development", // 실서비스 : production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client",
  }, //입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"], //browserslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel", // hot 리로딩을 위해 사용(데이터 변경없이 새로고침)
          ],
        },
      },
    ],
  },

  plugins: [new RefreshWebpackPlugin()], // hot 리로딩을 위해 사용(데이터 변경없이 새로고침)

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  }, //출력
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
