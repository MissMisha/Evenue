var express = require("express");
var {doRegister,doFetch,saveFavourites,getFavourites,getfavrtCards,saveRating} = require("../controller/vendorController");
const verifyToken = require("../config/verify-token");

let router = express.Router();

router.post("/doregister",doRegister)
router.get("/fetchDetails",doFetch)
router.post("/savefavrts",verifyToken,saveFavourites)
router.get("/getfavrts",verifyToken,getFavourites)
router.post("/getfavrtCards",getfavrtCards)
router.post("/saveRating",saveRating)

module.exports = router