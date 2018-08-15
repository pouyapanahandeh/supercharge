const score = require('./score/score.service.js');
const game = require('./game/game.service.js');
const pictures = require('./pictures/pictures.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(score);
  app.configure(game);
  app.configure(pictures);
};
