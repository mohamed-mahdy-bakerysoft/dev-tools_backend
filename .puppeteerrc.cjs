const { join } = require('path');
const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV == 'production') {
  /**
   * @type {import("puppeteer").Configuration}
   */
  module.exports = {
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  };
} else {
  module.exports = {};
}