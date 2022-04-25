const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const undo_retweet = async (req, res) => {
  const { name } = req.body;
  res.send(name);
};
module.exports = { undo_retweet };
