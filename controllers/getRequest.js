const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const getRequest = async ({ oauth_token, oauth_token_secret }) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const id = "1516717736604618752";

  // You can replace Tweet ID given with the Tweet ID you wish to like.
  // You can find a Tweet ID by using the Tweet lookup endpoint
  const data = {
    tweet_id: "1517380152048553985",
  };

  const endpointURL = `https://api.twitter.com/2/users/${id}/likes`;

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
  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
  };
  console.log(token);

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: endpointURL,
        method: "POST",
      },
      token
    )
  );

  const req = await got.post(endpointURL, {
    json: data,
    responseType: "json",
    headers: {
      Authorization: authHeader["Authorization"],
      "user-agent": "v2LikeTweetJS",
      "content-type": "application/json",
      accept: "application/json",
    },
  });
  if (req.body) {
    return req.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};
//hello world 1
module.exports = { getRequest };
