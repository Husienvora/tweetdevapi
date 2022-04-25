const express = require("express");

const router = express.Router();
const { _initauth } = require("../controllers/Authentication/_initauth");
const { exec } = require("../controllers/Authentication/exec");
const { createtweet } = require("../controllers/apicontrols/createtweet");
const { deletetweet } = require("../controllers/apicontrols/deletetweet");
const { filteredstream } = require("../controllers/apicontrols/filteredstream");
const { follow_lookup } = require("../controllers/apicontrols/follow_lookup");
const { follow_user } = require("../controllers/apicontrols/follow_user");
const { like_tweet } = require("../controllers/apicontrols/like_tweet");
const { retweet_tweet } = require("../controllers/apicontrols/retweet_tweet");
const { retweetlookup } = require("../controllers/apicontrols/retweetlookup");
const { Stream } = require("../controllers/apicontrols/Stream");
const { undo_retweet } = require("../controllers/apicontrols/undo_retweet");
const { unfollow_user } = require("../controllers/apicontrols/unfollow_user");
const { unlike_tweet } = require("../controllers/apicontrols/unlike_tweet");
router.route("/authentication").get(_initauth).post(exec);
router.route("/like").post(like_tweet).delete(unlike_tweet);
router
  .route("/follow")
  .get(follow_lookup)
  .post(follow_user)
  .delete(unfollow_user);
router.route("/retweet").post(retweet_tweet).delete(undo_retweet);
router.route("/stream").post(Stream);
router.route("/filteredstream/:no").post(filteredstream);
router.route("/retweetedby/:id").post(retweetlookup);
router.route("/tweet").post(createtweet).delete(deletetweet);

module.exports = router;
