// Initializes the `game` service on path `/game`
const createService = require('./game.class.js');
const hooks = require('./game.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate,
    app: app
  };

  // Initialize our service with any options it requires
  app.use('/game', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('game');

  service.hooks(hooks);
};
