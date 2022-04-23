const authdb = require("../models/authdb");
const User = require("../models/User");
const { accessToken } = require("./accessToken");
const { getRequest } = require("./getRequest");
const exec = async (req, res) => {
  const { pin } = req.body;

  // Get the access token
  id = "1";
  auth = await authdb.findOne({ id: "1" });
  await authdb.deleteOne({ id: "1" });
  auth = {
    oauth_token: auth.oauth_token,
    oauth_token_secret: auth.oauth_token_secret,
  };

  //retrieve auth from the database.
  console.log(auth);
  const oAuthAccessToken = await accessToken(auth, pin.trim());
  // Make the request
  console.log(oAuthAccessToken);
  const authaccess = {
    oauth_token: oAuthAccessToken.get("oauth_token"),
    oauth_token_secret: oAuthAccessToken.get("oauth_token_secret"),
    user_id: oAuthAccessToken.get("user_id"),
    screen_name: oAuthAccessToken.get("screen_name"),
  };
  User.create(authaccess);

  const response = await getRequest(authaccess);
  res.send(response);
};
module.exports = { exec };
