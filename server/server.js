var express = require("express");
var mongoose = require("mongoose");
var fileuploader = require("express-fileupload");
var cors = require("cors")
var path = require("path");
var {doMongooseConnection} = require("./config/mongooseConnect")
var vendorRouter = require("./routers/vendorRouter")
var citizenRouter = require("./routers/citizenRouter")


let app = express();
app.use(cors());

app.use(fileuploader()); // it identifies file from incoming multipart form data and make it available in req.files 
app.use(express.json());
app.use(express.urlencoded({extended:true}))  // parses url encoded data 

require('dotenv').config();
console.log(process.env.mongo_url)
app.listen(2001,()=>{
    console.log("Server started at port 2001");
})
doMongooseConnection();
app.use("/vendor",vendorRouter);
app.use("/citizen",citizenRouter);
