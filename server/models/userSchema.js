var mongoose = require("mongoose");

var userSchema ={
    email:{
        type:String,
        unique:true
    },    
    name:String,
    password:String,
    role:String
}

let schema = mongoose.Schema;
var obj = new schema(userSchema,{versionKey:false});
var userColRef = mongoose.model("Users",obj);

module.exports = userColRef;