// Initializes the `donations` service on path `/donations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/donations.model');
const hooks = require('./donations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/donations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('donations');

  service.hooks(hooks);
};