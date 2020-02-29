const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  updatedAt: Date,
  picture: String,
  sub: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
