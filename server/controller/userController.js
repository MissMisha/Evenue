let userColRef = require("../models/userSchema");

async function saveUserData(req,resp){

    let doc = new userColRef(req.body);
    await doc.save().then((doc)=>{
        resp.json({status:true,msg:"Data saved successfully",doc})
    }).catch((err)=>{
        resp.json({status:false,msg:"Error saving data"});
    })

}

module.exports = {saveUserData};