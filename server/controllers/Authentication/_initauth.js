const got = require("got");

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

require("dotenv").config();

const { requestToken } = require("./requestToken");

const authdb = require("../../models/authdb");
const _initauth = async (req, res) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  console.log(consumer_key, consumer_secret);

  // this example uses PIN-based OAuth to authorize the user

  const authorizeURL = new URL("https://api.twitter.com/oauth/authorize");

  // Get request token
  const oAuthRequestToken = await requestToken();
  // Get authorization
  authorizeURL.searchParams.append(
    "oauth_token",
    oAuthRequestToken.get("oauth_token")
  );
  //save the below auth var in database and retrieve it in exec function from the database
  const auth = {
    id: "1",
    oauth_token: oAuthRequestToken.get("oauth_token"),
    oauth_token_secret: oAuthRequestToken.get("oauth_token_secret"),
  };
  //-------------------------------------------------------
  //console.log(auth);

  //console.log(authaccess);

  //await authdb.findByIdAndDelete({ id: "1" });
  await authdb.create(auth);
  res.send(authorizeURL.href);
};

module.exports = { _initauth };
