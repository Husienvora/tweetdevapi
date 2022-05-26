const got = require("got");
const needle = require("needle");
require("dotenv").config();
const { URLSearchParams } = require("url");

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const userTimeline = (req, res) => {
  const { userID } = req.body;
  const url = `https://api.twitter.com/2/users/${userID}/tweets`;

  // The code below sets the bearer token from your environment variables
  // To set environment variables on macOS or Linux, run the export command below from the terminal:
  // export BEARER_TOKEN='YOUR-TOKEN'
  const bearerToken = process.env.BEARER_TOKEN;

  const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
      max_results: 100,
      "tweet.fields": "created_at,attachments",
      "media.fields": "height,url",
      expansions: "author_id,attachments.media_keys",
    };

    const options = {
      headers: {
        "User-Agent": "v2UserTweetsJS",
        authorization: `Bearer ${bearerToken}`,
      },
    };

    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    while (hasNextPage) {
      let resp = await getPage(params, options, nextToken);
      console.log(resp);
      if (
        resp &&
        resp.meta &&
        resp.meta.result_count &&
        resp.meta.result_count > 0
      ) {
        userName = resp.includes.users[0].username;
        if (resp.data) {
          userTweets.push.apply(userTweets, resp.data);
        }

        if (resp.meta.next_token) {
          userTweets.push(resp.includes.media);
          nextToken = resp.meta.next_token;
        } else {
          userTweets.push(resp.includes.media);
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }

    res.send(userTweets);
  };

  const getPage = async (params, options, nextToken) => {
    if (nextToken) {
      params.pagination_token = nextToken;
    }

    try {
      const resp = await needle("get", url, params, options);

      if (resp.statusCode != 200) {
        console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
        return;
      }
      return resp.body;
    } catch (err) {
      throw new Error(`Request failed: ${err}`);
    }
  };

  getUserTweets();
};

module.exports = { userTimeline };
