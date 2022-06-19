const got = require("got");
const needle = require("needle");
require("dotenv").config();
const { URLSearchParams } = require("url");

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const getNoofferandfin = async (req, res) => {
  const { userID } = req.body;

  const endpointUrl = `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${userID}`;
  console.log(endpointUrl);
  const resapi = await got.get(endpointUrl).then((res) => {
    return res.body;
  });
  res.send(resapi);
};
module.exports = { getNoofferandfin };
