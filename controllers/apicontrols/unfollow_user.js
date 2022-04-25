const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const unfollow_user = async (req, res) => {
  res.send("unfollow_user");
};
module.exports = { unfollow_user };
