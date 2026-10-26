var mongoose = require("mongoose")

var favrtSchema= {
    email:String,
    vendors:[String]
}
let schema = mongoose.Schema;
var obj = new schema(favrtSchema,{versionKey:false})
var favrtColRef = mongoose.model("Favourites",obj)

module.exports= favrtColRef;