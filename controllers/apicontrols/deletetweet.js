const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const deletetweet = async (req, res) => {
  res.send("deletetweet");
};
module.exports = { deletetweet };
