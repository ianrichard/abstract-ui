const path = require('path');
const config = require('./webpack.config.js');

const port = 3000;
let publicUrl = `ws://localhost:${port}/ws`;
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `${port}-${host}`;
}

config.devServer = {
  historyApiFallback: true,
  hot: true,
  contentBase: path.join(__dirname, '../build'),
  port: port,
  allowedHosts: ['.gitpod.io'],
  sockHost: publicUrl,
  sockPort: 443,
  sockPath: '',
};

config.devtool = 'inline-source-map';

module.exports = config;
