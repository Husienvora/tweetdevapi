const mongoose = require("mongoose");

const User = new mongoose.Schema({
  oauth_token: {
    type: String,
    required: [true, "Please provide oauth_token"],
  },
  oauth_token_secret: {
    type: String,
    required: [true, "Please provide oauth_token_secret"],
  },
  user_id: {
    type: String,
    required: [true, "Please provide user_id"],
  },
  screen_name: {
    type: String,
    required: [true, "Please provide screen_name"],
  },
});
module.exports = mongoose.model("User", User);
