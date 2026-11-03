const servicesColRef = require("../models/events-services")
const vendorColRef = require("../models/vendorSchema")
const {extractAadhaarDetails} = require("../config/ai-config");
const citizenColRef = require("../models/citizenSchema");
const favrtColRef = require("../models/favrtSchema");


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
    console.log("reached controller")
    const image = req.files?.aadhaarImage
    const side = req.body.side

    if (!image) {
        return res.status(400).json({status:false,msg:"Aadhaar image is required"})
    }
    if (side !== "front" && side !== "back") {
        return res.status(400).json({status:false,msg:"Aadhaar side must be front or back"})
    }

    try {
        const details = await extractAadhaarDetails(image, side)
        console.log(details)
        res.json({status:true,details})
    } catch (err) {
        console.error("Aadhaar extraction failed:", err)
        res.status(500).json({status:false,msg:"Unable to process Aadhaar image"})
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


module.exports = {saveEvents,fetchServices,fetchVendors,extractCitizenDetails,saveCitizenData}