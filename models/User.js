const mongoose = require('mongoose');
const ShowSchema = require('./Show');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    lowercase: true,
    minLength: 3,
    maxlength: 15,
    required: false,
  },
  shows: [ShowSchema],
});

UserSchema.methods.getPublic = function getPublic() {
  const shows = this.shows.map((s) => s.getPublic());

  return {
    name: this.name,
    shows: shows,
    username: this.username,
    email: this.email,
  };
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
