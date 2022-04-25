const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const retweet_tweet = async (req, res) => {
  res.send("retweet-tweet");
};
module.exports = { retweet_tweet };
