var express = require("express");
var {doRegister,doFetch,saveFavourites,getFavourites,getfavrtCards} = require("../controller/vendorController");
const verifyToken = require("../config/verify-token");

let router = express.Router();

router.post("/doregister",doRegister)
router.get("/fetchDetails",doFetch)
router.post("/savefavrts",verifyToken,saveFavourites)
router.get("/getfavrts",verifyToken,getFavourites)
router.post("/getfavrtCards",getfavrtCards)

module.exports = router