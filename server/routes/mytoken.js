const express = require("express");
const router = express.Router();
const controller = require("../controllers/token.controller");

router.post("/tokensave", controller.savetoken);
router.get("/", controller.gettoken);
router.post("/transfer", controller.transfer);
module.exports = router;