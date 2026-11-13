const servicesColRef = require("../models/events-services")
const vendorColRef = require("../models/vendorSchema")
const {extractAadhaarDetailsWithOpenRouter} = require("../config/ai-config");
const citizenColRef = require("../models/citizenSchema");
const favrtColRef = require("../models/favrtSchema");
const userDetailsColRef = require("../models/userDetailsSchema");


async function saveEvents(req,res){
    let data = [
        {"event":"Birthday","services":["Cake","Decoration","Catering","Hall"]},
        {"event":"Durga Pooja","services":["Cake","Idols","Decoration","Coffee","Music","Catering"]},
        {"event":"Wedding","services":["Hall","Decoration","Catering","Photography","Music","Makeup"]},
        {"event":"Engagement","services":["Hall","Decoration","Catering","Photography","Music"]},
        {"event":"Anniversary","services":["Cake","Decoration","Catering","Photography","Hall"]},
        {"event":"Baby Shower","services":["Decoration","Catering","Cake","Photography","Hall"]},
        {"event":"Housewarming","services":["Pooja Services","Decoration","Catering","Cleaning"]},
        {"event":"Corporate Event","services":["Hall","Catering","Audio Visuals","Decoration","Photography"]},
        {"event":"Conference","services":["Hall","Audio Visuals","Catering","Seating Arrangement","Registration Desk"]},
        {"event":"Festival Fair","services":["Hall","Stalls","Decoration","Security","Cleaning","Catering"]},
    ]

    const count = await servicesColRef.countDocuments();
    if(count ==0) {
        let doc = await servicesColRef.insertMany(data).then((doc)=>{
        console.log(doc);
        res.json({"status":true,"msg":"Data saved successfully",doc})
        }).catch((err)=>{
            res.json({"status":false,"msg":err})
        })
    }
    else {
        let doc = await servicesColRef.find().then((doc)=>{
            res.json({"status":true,"msg":"Data saved successfully",doc})
        })
    }

    // let doc = await servicesColRef.find().then((doc)=>{
    //         res.json({"status":true,"msg":"Data saved successfully",doc})
    // }).catch((err)=>{
    //     res.json({"status":true})
    // })
    

}

async function fetchServices(req,res){
    const eventName = req.query.event;
    let doc = await servicesColRef.findOne({event:eventName}).then((doc)=>{
        console.log(doc)
        res.json({status:true,msg:"Services fetched successfully",doc})
    }).catch((err=>{
        res.json({status:false,msg:err})
    }))
}

async function fetchVendors(req,res){
    try{
    const {service,page=1} = req.query;
    const limit = 4;
    const skip = (Number(page)-1)*limit;

    let doc = await vendorColRef.find({categories:service})
    .skip(skip)
    .limit(limit);

    const totalVendors = await vendorColRef.countDocuments({categories:service})

    let totalPages = Math.ceil(totalVendors/limit);
    console.log(doc)
    return res.json({
        status:true,
        doc:doc,
        currentPage : Number(page),
        totalPages:totalPages,
        totalVendors:totalVendors
    })
    }
    catch(err){
        console.log(err)

        return res.json({status:false,msg:"Error fetching vendors"})
    }
   
}

async function extractCitizenDetails(req,res){
    const image = req.files?.aadhaarImage
    const side = req.body.side

    if (!image) {
        return res.status(400).json({status:false,msg:"Aadhaar image is required"})
    }
    if (!image.mimetype?.startsWith("image/")) {
        return res.status(400).json({status:false,msg:"Only Aadhaar image files are supported"})
    }
    if (side !== "front" && side !== "back") {
        return res.status(400).json({status:false,msg:"Aadhaar side must be front or back"})
    }

    try {
        const details = await extractAadhaarDetailsWithOpenRouter(image, side)
        res.json({status:true,details})
    } catch (err) {
        console.error("Aadhaar extraction failed:", err?.code || err?.status || "unknown provider error")
        const status = err?.status || 500
        const msg = err?.code === "OPENROUTER_KEY_MISSING"
            ? "OpenRouter API key is not configured."
            : err?.code === "OPENROUTER_IMAGE_UNSUPPORTED"
                ? "The configured OpenRouter free model does not support image input."
                : err?.code === "OPENROUTER_INVALID_JSON" || err?.code === "OPENROUTER_INVALID_DATA"
                    ? "OpenRouter returned unreadable Aadhaar data. Please try a clearer image."
                    : status === 429
                        ? "OpenRouter is busy. Please try again shortly."
                        : status === 503
                            ? "OpenRouter is temporarily unavailable. Please try again."
                            : status === 504
                                ? "OpenRouter timed out. Please try again."
                                : "Unable to process Aadhaar image"
        res.status(status).json({status:false,msg})
    }
}

function saveCitizenData(req,res){
    let doc = new citizenColRef(req.body);
    doc.save().then((doc)=>{
        res.json({status:true,msg:"Citizen Data saved successfully",doc})
    })
    .catch((err)=>{
        res.json({status:false,err})
    })
}

async function saveUserDetails(req,res){
    try {
        const doc = await userDetailsColRef.create(req.body);
        return res.json({status:true,msg:"User details saved successfully",doc});
    } catch (err) {
        console.error("Unable to save user details:", err);
        return res.status(400).json({status:false,msg:"Unable to save user details"});
    }
}

async function getUserDetails(req,res){
    const {email} = req.query;

    if (!email) {
        return res.status(400).json({status:false,msg:"Email is required"});
    }

    try {
        const doc = await userDetailsColRef.findOne({email});

        if (!doc) {
            return res.status(404).json({status:false,msg:"Profile details not found"});
        }

        return res.json({status:true,doc});
    } catch (err) {
        console.error("Unable to fetch user details:", err);
        return res.status(500).json({status:false,msg:"Unable to fetch user details"});
    }
}

module.exports = {saveEvents,fetchServices,fetchVendors,extractCitizenDetails,saveCitizenData,saveUserDetails,getUserDetails}