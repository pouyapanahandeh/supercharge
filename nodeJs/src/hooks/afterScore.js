// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = require('../logger');
const util = require('util');

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

module.exports = function () {
  return context => {

    const { app } = context;

    if (context.method === 'find')
      context.result = context.result.data;

    else if (context.method === 'create') {
      // determine position of score
      const posted_score_steps = context.result.steps;
      const posted_score_seconds = context.result.seconds;

      const scoreService = app.service('score');
      return scoreService.find({ query: { $sort: { steps: 1, seconds: 1 } } }).then(function (res) {
        //determine position
        for (var i = 0; i < res.length; ++i) {
          if (res[i].steps >= posted_score_steps) {
            if (res[i].steps === posted_score_steps && res[i].seconds <= posted_score_seconds) {
              context.result = {
                position: i + 1,
                score: context.result
              };
              return context;
            }
          }
        }
        context.result = {
          position: res.length + 1,
          score: context.result
        };
        return context;
      });
    }

    return context;
  };
};
