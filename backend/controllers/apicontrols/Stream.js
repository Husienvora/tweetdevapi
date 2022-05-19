const got = require("got");
const needle = require("needle");
require("dotenv").config();
const { URLSearchParams } = require("url");

const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const Stream = async (req, res) => {
  const { amount } = req.body;
  const token = process.env.BEARER_TOKEN;
  const streamURL = "https://api.twitter.com/2/tweets/sample/stream";
  function streamConnect(retryAttempt) {
    const stream = needle.get(streamURL, {
      headers: {
        "User-Agent": "v2SampleStreamJS",
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    });
    streamarr = [];

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);

          streamarr.push(json.data);

          if (streamarr.length > amount) {
            res.send(streamarr);
            stream.request.abort();
          }

          // A successful connection resets retry count.

          retryAttempt = 0;
        } catch (e) {
          // Catches error in case of 401 unauthorized error status.
          if (data.status === 401) {
            console.log(data);
            process.exit(1);
          } else if (
            data.detail ===
            "This stream is currently at the maximum allowed connection limit."
          ) {
            console.log(data.detail);
            process.exit(1);
          } else {
            // Keep alive signal received. Do nothing.
          }
        }
      })
      .on("err", (error) => {
        if (error.code !== "ECONNRESET") {
          console.log(error.code);
          process.exit(1);
        } else {
          // This reconnection logic will attempt to reconnect when a disconnection is detected.
          // To avoid rate limits, this logic implements exponential backoff, so the wait time
          // will increase if the client cannot reconnect to the stream.
          setTimeout(() => {
            console.warn("A connection error occurred. Reconnecting...");
            streamConnect(++retryAttempt);
          }, 2 ** retryAttempt);
        }
      });
    return stream;
  }

  (async () => {
    streamConnect(0);
  })();
  return;
};
module.exports = { Stream };
