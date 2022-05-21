const needle = require("needle");
require("dotenv").config();

const followers_lookup = async (req, res) => {
  const { userId } = req.body;

  const url = `https://api.twitter.com/2/users/${userId}/followers`;
  const bearerToken = process.env.BEARER_TOKEN;

  const getFollowers = async () => {
    let users = [];
    let params = {
      max_results: 1000,
      "user.fields": "created_at",
    };

    const options = {
      headers: {
        "User-Agent": "v2FollowersJS",
        authorization: `Bearer ${bearerToken}`,
      },
    };

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving followers...");
    while (hasNextPage) {
      let resp = await getPage(params, options, nextToken);
      if (
        resp &&
        resp.meta &&
        resp.meta.result_count &&
        resp.meta.result_count > 0
      ) {
        if (resp.data) {
          users.push.apply(users, resp.data);
        }
        if (resp.meta.next_token) {
          nextToken = resp.meta.next_token;
        } else {
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }

    res.send(users);
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

  getFollowers();
};
module.exports = { followers_lookup };
