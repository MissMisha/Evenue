let express = require("express");
let {saveUserData} = require("../controller/userController")
let router = express.Router();

router.post("/saveUserData",saveUserData);

module.exports = router