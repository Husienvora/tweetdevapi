const got = require("got");
const needle = require("needle");
const { URLSearchParams } = require("url");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const retweetlookup = async (req, res) => {
  const { tweet_id } = req.body;
  const token = process.env.BEARER_TOKEN;

  // You can replace the ID given with the Tweet ID you wish to lookup Retweeting users for
  // You can find an ID by using the Tweet lookup endpoint
  const id = tweet_id;

  const endpointURL = `https://api.twitter.com/2/tweets/${id}/retweeted_by`;

  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    "tweet.fields": "lang,author_id", // Edit optional query parameters here
    "user.fields": "created_at", // Edit optional query parameters here
  };

  // this is the HTTP header that adds bearer token authentication
  const apires = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2RetweetedByUsersJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (apires.body) {
    return res.send(apires.body);
  } else {
    throw new Error("Unsuccessful request");
  }
};
module.exports = { retweetlookup };
