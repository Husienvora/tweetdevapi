const got = require("got");

const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");

const getRequest = async ({ oauth_token, oauth_token_secret }) => {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;

  // You can replace Tweet ID given with the Tweet ID you wish to like.
  // You can find a Tweet ID by using the Tweet lookup endpoint
  const usernames = "TwitterDev,Husien_vora";
  const params =
    "user.fields=created_at,description&expansions=pinned_tweet_id";
  const endpointURL = `https://api.twitter.com/2/users/by?usernames=${usernames}&${params}`;

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
        method: "GET",
      },
      token
    )
  );

  const req = await got(endpointURL, {
    headers: {
      Authorization: authHeader["Authorization"],
      "user-agent": "v2UserLookupJS",
    },
  });
  if (req.body) {
    return JSON.parse(req.body);
  } else {
    throw new Error("Unsuccessful request");
  }
};
//hello world 1
module.exports = { getRequest };
