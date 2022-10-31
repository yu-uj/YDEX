const express = require("express");
const router = express.Router();

const mytoken = require("./mytoken");
const staking = require("./staking");
const swap = require("./swap");
const dashboard = require("./dashboard");

router.use("/mytoken", mytoken);
router.use("/staking", staking);
router.use("/swap", swap);
router.use("/dashboard", dashboard);

module.exports = router;
