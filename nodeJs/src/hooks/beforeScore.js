// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = require('../logger');
const util = require('util');

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

module.exports = function () {
  return context => {

    const { params } = context;

    context.params.query['$select'] = ['seconds', 'name', 'token', 'steps'];
    context.params.query['$sort'] = {
      steps: 1,
      seconds: 1
    };

    return context;
  };
};
