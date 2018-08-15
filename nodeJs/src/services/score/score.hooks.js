const afterScore = require('../../hooks/afterScore');
const beforeScore = require('../../hooks/beforeScore');

module.exports = {
  before: {
    all: [beforeScore()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [afterScore()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
