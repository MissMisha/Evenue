
var mongoose = require("mongoose")
var vendorSchema = {
    email: {
        type:String,
        required:true,
        unique:true
    },    
    name: String,
    contactNumber: String,
    businessDetails: String,
    businessName: String,
    area: String,
    address: String,
    city: String,
    establishedIn: String,
    categories:[String],
    websiteUrl: String,
    instagramId: String,
    shopPicture: String,
    businessCertificate: String,
    ratingSum:Number,
    users_rated:Number
}

let mongooseSchema = mongoose.Schema;
var collobj = new mongooseSchema(vendorSchema,{versionKey:false})
var vendorColRef = mongoose.model("Vendors",collobj)

module.exports= vendorColRef