let express = require("express")
let {saveEvents,fetchServices,fetchVendors,extractCitizenDetails,saveCitizenData} = require("../controller/citizenController")

let router = express.Router();

router.post("/saveEvents",saveEvents)
router.get("/fetchServices",fetchServices)
router.get("/fetchVendors",fetchVendors)
router.post("/extractAadhaar",extractCitizenDetails)
router.post("/saveCitizenData",saveCitizenData)

module.exports = router
