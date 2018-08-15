const _ = require('lodash');
const errors = require('@feathersjs/errors');
const rstr = require("randomstring");
const createModel = require('../../models/game.model');


function getRandomSubarray(arr, size) {
  if (arr.length < size) return arr;
  var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.app = options.app;
    createModel(this.app);
  }

  async find (params) {
    return this.get(null, params);
  }

  async get (size, params) {
    const app = this.app;
    const picturesService = app.service('pictures');

    try {
      const size_int = parseInt(size);

      if (size_int > 20 || size_int < 5) throw new Error();

      // get pictures from db
      const pictures = await picturesService.find({
        query: {
          $limit: 1000
        }
      });

      const pictures_filtered = pictures.data.map(function (picture) {
        return picture.url;
      });

      // get pictures from db
      const token = rstr.generate(32);

      // choose random pictures
      const pictures_rand = getRandomSubarray(pictures_filtered, size_int);

      // save game to database
      const mongooseClient = app.get('mongooseClient');
      const GameModel = mongooseClient.model('game');
      const res = await GameModel.create({
        token: token,
        pictures: pictures_rand
      });
      if (!res) throw new Error();

      return {
        message: 'Successful operations',
        game: {
          token: token,
          pictures: pictures_rand
        }
      };

    } catch (e) { console.log(e); throw new errors.BadRequest('Invalid input', { size: size });}

  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
