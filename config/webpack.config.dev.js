const path = require('path');
const config = require('./webpack.config.js');

const port = 8080;

config.devServer = {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../build'),
    port,
};

if (process.env.GITPOD_WORKSPACE_URL) {
    const [host] = process.env.GITPOD_WORKSPACE_URL.split('://');
    config.devServer = {
        ...config.devServer,
        allowedHosts: ['.gitpod.io'],
        sockHost:  `${port}-${host}`,
        sockPort: 443,
        sockPath: '',
    }
}

config.devtool = 'inline-source-map';

module.exports = config;