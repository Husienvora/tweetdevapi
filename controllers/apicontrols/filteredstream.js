const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const filteredstream = async (req, res) => {
  res.send("filteredstream");
};
module.exports = { filteredstream };
