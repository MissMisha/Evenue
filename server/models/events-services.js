var mongoose = require("mongoose")

var eventServiceSchema ={
    event:String,
    services:[String]
}

let Schema = mongoose.Schema;
var obj = new Schema(eventServiceSchema,{versionKey:false})
var servicesColRef = mongoose.model("EventsServices",obj)

module.exports = servicesColRef