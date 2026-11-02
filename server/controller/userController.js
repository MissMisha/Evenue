let userColRef = require("../models/userSchema");

async function saveUserData(req,resp){

    let doc = new userColRef(req.body);
    await doc.save().then((doc)=>{
        resp.json({status:true,msg:"Data saved successfully",doc})
    }).catch((err)=>{
        resp.json({status:false,msg:"Error saving data"});
    })

}

async function checkUser(req,resp){
    let email = req.query.email;
    let doc = await userColRef.find({email:email}).then((doc)=>{
        resp.json({status:true,msg:"User found successfully",doc})
    }).catch((err)=>{
        resp.json({status:false,msg:"Error logging in"});
    })
}

module.exports = {saveUserData,checkUser};