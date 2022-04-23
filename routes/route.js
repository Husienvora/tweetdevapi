const express = require("express");

const router = express.Router();
const { _initauth } = require("../controllers/_initauth");
const { exec } = require("../controllers/exec");

router.route("/authentication").get(_initauth).post(exec);

module.exports = router;
