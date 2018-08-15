// Initializes the `pictures` service on path `/pictures`
const createService = require('feathers-mongoose');
const createModel = require('../../models/pictures.model');
const hooks = require('./pictures.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/pictures', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('pictures');

  service.hooks(hooks);
};
