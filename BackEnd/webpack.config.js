/*
Webpack is a build tool for bundling frontend code mainly but can also be used for backend. We are using
this right now for bundling the ExpressJS backend to convert into serverless with AWS Lambda and API
Gateway. 

This file specifies how the backend should be bundled. 
*/

const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: "./src/lambda.js",
  target: "node",
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    // library: 'serverlessExpressEdge',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
        { test: /\.node$/, use: "node-loader"}
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
};
