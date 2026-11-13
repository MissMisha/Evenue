var vendorColRef= require("../models/vendorSchema")
var {getCloudinaryObject} = require("../config/cloudConfig")
var path = require("path");
const favrtColRef = require("../models/favrtSchema");

let cloudinary = getCloudinaryObject();

async function doRegister(req,res){
    console.log("request body", req.body)
    let shopPic = "nopic.png";
    let businessCert = "nopic.png";
    if(req.files != null){
       
            shopPic = req.files.shopPicture.name;
            let picpath = path.join(__dirname,"..","uploads",shopPic)
            req.files.shopPicture.mv(path.join(__dirname,"..","uploads",shopPic));
            console.log(path.join(__dirname,"..","uploads",shopPic))
        
        
            businessCert = req.files.businessCertificate.name;
            let certpath = path.join(__dirname,"..","uploads",businessCert)
            req.files.businessCertificate.mv(path.join(__dirname,"..","uploads",businessCert));
        
        await cloudinary.uploader.upload(picpath).then(function(picurlResult){
            shopPic = picurlResult.url;
        })

        await cloudinary.uploader.upload(certpath).then(function(picurlResult){
            businessCert = picurlResult.url;
        })

        req.body.shopPicture = shopPic
        req.body.businessCertificate = businessCert
        req.body.ratingSum = 0;
        req.body.users_rated= 0;
        
        let doc = new vendorColRef(req.body);
        doc.save().then((doc)=>{
            console.log(res);
            res.json({status:true,"msg":"Data saved successfully","doc":doc})
        }).catch((err)=>{
            console.log(err)
            res.json({status:true,"msg":err})
        })
    }
   
}

async function doFetch(req,res){
    const {email} = req.query;
    console.log(email)
    var doc = await vendorColRef.find({email: email})
    .then((doc)=>{
        // console.log(doc)
        res.json({status:true, "msg":"Details fetched successfully","details":doc})
    }).catch((err)=>{
        console.log(err)
    })

}

async function saveFavourites(req,res){
   const {email,vendorId} = req.body;

    const user = await favrtColRef.findOne({ email });
    console.log("user"+user)
    if (user?.vendors.includes(vendorId)) {
        // var vendors = user.vendors;
        // vendors = vendors.filter(id => id !== vendorId);
        // console.log(vendors);
        
        // user.save();
        const result = await favrtColRef.updateOne(
        { email: email },
        { $pull: { vendors: vendorId } }
        );
      res.json({status:true,msg:"Favourite deleted successfully"})
    } else {
      // Not favourited: add it
      const result =await favrtColRef.updateOne(
        { email },
        { $addToSet: { vendors: vendorId } },
        { upsert: true }
      );
      console.log(result)

      res.json({status:true,msg:"Favourite saved successfully",result})
    }
   
}

async function getFavourites(req,resp) {
    const {email} = req.query;
    const result = await favrtColRef.find({email:email}).then((doc)=>{
        resp.json({status:true,msg:"Data retrieved successfully",doc})
    }).catch((err)=>{
        resp.json({status:false,msg:"Something went wrong",err})
    });
}

async function getfavrtCards(req,resp){
    const ary = req.body.ary;
    const result = await vendorColRef.find({
        email:{$in: ary}
    }).then((doc)=>{
        console.log(doc)
        resp.json({status:true,doc})
    }).catch((err)=>{
        resp.json({status:false,err})
    })
}

async function saveRating(req,resp) {
    const rating = req.body.rating;
    const email = req.body.email;

    const result = await vendorColRef.updateOne(
        {email:email},
        {
            $inc:{
                ratingSum:rating,
                users_rated:1
            }
        }
    ).then((doc)=>{
        console.log(doc)
        resp.json({status:true,msg:"Successfully saved"})
    }).catch((err)=>{
        resp.json({status:false,msg:"Some error occured",err})
    })
}




module.exports = {doRegister,doFetch,saveFavourites,getFavourites,getfavrtCards,saveRating} 
