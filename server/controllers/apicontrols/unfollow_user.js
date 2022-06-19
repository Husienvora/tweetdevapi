const got = require("got");
const User = require("../../models/User");
const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const unfollow_user = async (req, res) => {
  const { username, target_user_id } = req.body;

  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;

  const tokendb = await User.find({ screen_name: username });
  console.log(tokendb);
  if (!tokendb) {
    throw new Error("Unauthenticated user");
  }
  const endpointURL = `https://api.twitter.com/2/users/${tokendb[0].user_id}/following/${target_user_id}`;
  const token = {
    key: tokendb[0].oauth_token,
    secret: tokendb[0].oauth_token_secret,
  };
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
    oauth.authorize(
      {
        url: endpointURL,
        method: "DELETE",
      },
      token
    )
  );

  const reqapi = await got.delete(endpointURL, {
    responseType: "json",
    headers: {
      Authorization: authHeader["Authorization"],
      "content-type": "application/json",
    },
  });
  res.send(reqapi.body);
};

module.exports = { unfollow_user };
