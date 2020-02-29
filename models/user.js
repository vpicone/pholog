var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  sub: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
