const got = require("got");

require("dotenv").config();

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const requestToken = async () => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const requestTokenURL =
    "https://twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write"; //until api.twitter gets fixed

  // Get request token
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
      url: requestTokenURL,
      method: "POST",
    })
  );

  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"],
    },
  });
  if (req.body) {
    const ans = new URLSearchParams(req.body);

    return ans;
  } else {
    throw new Error("Cannot get an OAuth request token");
  }
};
module.exports = { requestToken };
