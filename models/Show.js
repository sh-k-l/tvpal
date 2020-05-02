const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imdb: {
    type: String,
  },
  image: {
    type: String,
  },
  country: {
    type: String,
  },
  status: {
    type: String,
  },
  seenEpisodes: {
    type: [Number],
    default: [],
  },
});

ShowSchema.methods.getPublic = function getPublic() {
  return {
    id: this._id,
    name: this.name,
    imdb: this.imdb,
    image: this.image,
    country: this.country,
    status: this.status,
    seenEpisodes: this.seenEpisodes,
  };
};

module.exports = ShowSchema;
