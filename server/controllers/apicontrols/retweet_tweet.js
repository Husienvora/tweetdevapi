const got = require("got");
const User = require("../../models/User");
const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const retweet_tweet = async (req, res) => {
  const { username, tweet_id } = req.body;
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const tokendb = await User.find({ screen_name: username });

  console.log(tokendb);
  if (!tokendb) {
    throw new Error("Unauthenticated user");
  }
  const id = tokendb[0].user_id;
  const data = {
    tweet_id: tweet_id,
  };
  const endpointURL = `https://api.twitter.com/2/users/${id}/retweets`;
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
    key: tokendb[0].oauth_token,
    secret: tokendb[0].oauth_token_secret,
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: endpointURL,
        method: "POST",
      },
      token
    )
  );
  const apireq = await got.post(endpointURL, {
    json: data,
    responseType: "json",
    headers: {
      Authorization: authHeader["Authorization"],
      "user-agent": "vsRetweetTweetJS",
      "content-type": "application/json",
      accept: "application/json",
    },
  });
  if (req.body) {
    res.send(apireq.body);
  } else {
    throw new Error("Unsuccessful request");
  }
};
module.exports = { retweet_tweet };
