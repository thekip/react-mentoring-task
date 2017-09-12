const envConfig = require('./configs/env-config');

module.exports = envConfig.IS_DEV ? require('./configs/webpack.dev') : require('./configs/webpack.prod');
