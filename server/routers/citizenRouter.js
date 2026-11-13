let express = require("express")
let {saveEvents,fetchServices,fetchVendors,extractCitizenDetails,saveCitizenData,saveUserDetails,getUserDetails} = require("../controller/citizenController");
const verifyToken = require("../config/verify-token");

let router = express.Router();

router.post("/saveEvents",saveEvents)
router.get("/fetchServices",verifyToken,fetchServices)
router.get("/fetchVendors",verifyToken,fetchVendors)
router.post("/extractAadhaar",extractCitizenDetails)
router.post("/saveCitizenData",saveCitizenData)
router.post("/saveUserDetails",saveUserDetails)
router.get("/getUserDetails",getUserDetails)

module.exports = router
