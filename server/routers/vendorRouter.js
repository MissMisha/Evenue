var express = require("express");
var {doRegister,doFetch,saveFavourites,getFavourites,getfavrtCards} = require("../controller/vendorController")

let router = express.Router();

router.post("/doregister",doRegister)
router.get("/fetchDetails",doFetch)
router.post("/savefavrts",saveFavourites)
router.get("/getfavrts",getFavourites)
router.post("/getfavrtCards",getfavrtCards)

module.exports = router