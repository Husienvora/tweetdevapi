const got = require("got");

const { URLSearchParams } = require("url");

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const Stream = async (req, res) => {
  const { no, name } = req.body;
  res.send({ name: name, no: no });
};
module.exports = { Stream };
