var mongoose = require("mongoose")
var citizenSchema = {
    email: {
        type:String,
        required:true,
        unique:true
    },    
    name: String,
    aadharNumber:String,
    contactNumber: String,
    dob:String,
    gender:String,
    address: String,
    city: String
}

let mongooseSchema = mongoose.Schema;
var collobj = new mongooseSchema(citizenSchema,{versionKey:false})
var citizenColRef = mongoose.model("Citizens",collobj)

module.exports= citizenColRef