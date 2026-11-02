let express = require("express");
let {saveUserData,checkUser} = require("../controller/userController")
let router = express.Router();

router.post("/saveUserData",saveUserData);
router.get("/verify-user",checkUser);

module.exports = router