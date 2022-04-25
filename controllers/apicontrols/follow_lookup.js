const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const follow_lookup = async (req, res) => {
  res.send("follow_lookup");
};
module.exports = { follow_lookup };
