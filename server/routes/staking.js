const express = require("express");
const router = express.Router();
const controller = require("../controllers/pool.controller");

router.get("/klaypool", controller.getklaypool);
router.get("/kip7pool", controller.getkip7pool);
router.post("/create_klaypool", controller.saveklaypool);
router.post("/create_kip7pool", controller.savekip7pool);
router.get("/singlepool", controller.getsinglepool);
router.post("/create_singlepool", controller.savesinglepool);
router.post("/single_staking", controller.single_staking);
router.post("/klaypool_staking", controller.klaypool_staking);
router.post("/kip7pool_staking", controller.kip7pool_staking);
router.post("/claim", controller.claim);
module.exports = router;