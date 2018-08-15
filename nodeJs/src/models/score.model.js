// score-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const score = new Schema({
    steps: { type: Number, required: true },
    seconds: { type: Number, required: true },
    name: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('score', score);
};
