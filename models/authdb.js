const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide id"],
  },
  oauth_token: {
    type: String,
    required: [true, "Please provide oauth_token"],
  },
  oauth_token_secret: {
    type: String,
    required: [true, "Please provide oauth_token_secret"],
  },
});
module.exports = mongoose.model("authdb", authSchema);
