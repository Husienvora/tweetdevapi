const express = require("express");

const router = express.Router();
const { _initauth } = require("../controllers/Authentication/_initauth");
const { exec } = require("../controllers/Authentication/exec");
const { createtweet } = require("../controllers/apicontrols/createtweet");
const { deletetweet } = require("../controllers/apicontrols/deletetweet");
const { filteredstream } = require("../controllers/apicontrols/filteredstream");
const {
  following_lookup,
} = require("../controllers/apicontrols/following_lookup");
const { follow_user } = require("../controllers/apicontrols/follow_user");
const { like_tweet } = require("../controllers/apicontrols/like_tweet");
const { retweet_tweet } = require("../controllers/apicontrols/retweet_tweet");
const { retweetlookup } = require("../controllers/apicontrols/retweetlookup");
const { Stream } = require("../controllers/apicontrols/Stream");
const { undo_retweet } = require("../controllers/apicontrols/undo_retweet");
const { unfollow_user } = require("../controllers/apicontrols/unfollow_user");
const { unlike_tweet } = require("../controllers/apicontrols/unlike_tweet");
const {
  followers_lookup,
} = require("../controllers/apicontrols/followers_lookup");
const { userTimeline } = require("../controllers/apicontrols/userTimeline");
const { Block_user } = require("../controllers/apicontrols/Block_user");
const { unBlock_user } = require("../controllers/apicontrols/unBlock_user");
const { getAvatar } = require("../controllers/apicontrols/get-twitter-avatars");
const { getUser } = require("../controllers/apicontrols/getUser");
const {
  getNoofferandfin,
} = require("../controllers/apicontrols/getNoofferandfin");
const { Logout } = require("../controllers/apicontrols/Logout");
router.route("/authentication").get(_initauth).post(exec);
router.route("/like").post(like_tweet).delete(unlike_tweet);

router
  .route("/follow")

  .post(follow_user)
  .delete(unfollow_user);
router.route("/retweet").post(retweet_tweet).delete(undo_retweet);
router.route("/stream").post(Stream);
router.route("/filteredstream").post(filteredstream);
router.route("/retweetedby").post(retweetlookup);
router.route("/tweet").post(createtweet).delete(deletetweet);
router.route("/follow/following").post(following_lookup);
router.route("/follow/followers").post(followers_lookup);
router.route("/user-photo").post(getAvatar);
router.route("/finduser").post(getUser);
router.route("/block").post(Block_user);
router.route("/unblock").delete(unBlock_user);
router.route("/getnoof").post(getNoofferandfin);
router.route("/usertimeline").post(userTimeline);
router.route("/Logout").post(Logout);
module.exports = router;
