const needle = require("needle");
require("dotenv").config();
const getUser = async (req, res) => {
  const { username } = req.body;
  const token = process.env.BEARER_TOKEN;

  const endpointURL = "https://api.twitter.com/2/users/by?usernames=";

  const params = {
    usernames: username, // Edit usernames to look up
    "user.fields": "created_at,description", // Edit optional query parameters here
    expansions: "pinned_tweet_id",
  };

  const res1 = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res1.body) {
    return res.send(res1.body);
  } else {
    throw new Error("Unsuccessful request");
  }
};
module.exports = { getUser };
