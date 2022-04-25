const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const like_tweet = async (req, res) => {
  res.send("like_tweet");
};
module.exports = { like_tweet };
