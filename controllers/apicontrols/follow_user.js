const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const follow_user = async (req, res) => {
  res.send("follow_user");
};
module.exports = { follow_user };
