var cloudinary=require("cloudinary").v2;  
 // v2 is object inside which our needed functions are present without v2 
 // it is the main export of cloudinary then if we will use the functions then we will have to always write .v2 along with it 
require('dotenv').config();//reading .env file
function getCloudinaryObject()
    {
    console.log(process.env.cloud_api_key+"****")
    cloudinary.config({ 
                cloud_name:process.env.cloud_name, 
                api_key:process.env.cloud_api_key, 
                api_secret: process.env.cloud_api_secret // Click 'View API Keys' above to copy your API secret
            });
        return cloudinary;   
    }       
    
module.exports={getCloudinaryObject}