// Initializes the `score` service on path `/score`
const createService = require('feathers-mongoose');
const createModel = require('../../models/score.model');
const hooks = require('./score.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/score', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('score');

  service.hooks(hooks);
};
