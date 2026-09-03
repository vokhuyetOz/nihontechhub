// eslint-disable-next-line @typescript-eslint/no-var-requires
var config = require('./jest.config');
config.testRegex = 'unit.test\\.js$'; //Overriding testRegex option

module.exports = config;
