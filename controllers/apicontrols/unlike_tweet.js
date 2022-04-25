const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const unlike_tweet = async (req, res) => {
  res.send("unlike_tweet");
};
module.exports = { unlike_tweet };
