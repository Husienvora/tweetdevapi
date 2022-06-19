const got = require("got");

require("dotenv").config();

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const accessToken = async ({ oauth_token, oauth_token_secret }, verifier) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;

  const accessTokenURL = "https://api.twitter.com/oauth/access_token"; //until api.twitter is fixed

  const oauth = OAuth({
    consumer: {
      key: consumer_key,
      secret: consumer_secret,
    },
    signature_method: "HMAC-SHA1",
    hash_function: (baseString, key) =>
      crypto.createHmac("sha1", key).update(baseString).digest("base64"),
  });
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: accessTokenURL,
      method: "POST",
    })
  );

  // Get request token
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}&oauth_callback=oob`; // &oauth_callback=oob; //until api.twitter is fixed

  const req = await got.post(path, {
    headers: {
      Authorization: authHeader["Authorization"],
    },
  });
  if (req.body) {
    ans = new URLSearchParams(req.body);

    return ans;
  } else {
    throw new Error("Cannot get an OAuth request token");
  }
};
module.exports = { accessToken };
