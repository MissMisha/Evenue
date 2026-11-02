let bcrypt = require('bcrypt')
let userColRef = require("../models/userSchema");

async function saveUserData(req,resp){
    const {name,email,password,role} = req.body;
    const hashedpwd = await bcrypt.hash(password,10);
    const newUser = await userColRef.create({
        name,
        email,
        password:hashedpwd
    });
    let doc = newUser;
    await doc.save().then((doc)=>{
        resp.json({status:true,msg:"Data saved successfully",doc})
    }).catch((err)=>{
        resp.json({status:false,msg:"Error saving data"});
    })

}

async function checkUser(req,resp){
   try{
    const {email,password} = req.query;
    const user = await userColRef.findOne({email:email});

   if(!user){
    return resp.json({status:false,msg:"User not found"})
   }

   const matchPwd = await bcrypt.compare(password,user.password);
   if(!matchPwd){
    return resp.json({status:false,msg:"Invalid credentials"})
   }

   return resp.json({status:true,msg:"Login Successfull",user});
   }
   catch(err){
    return resp.json({status:false,msg:"Error occured"})
   }
   
}

module.exports = {saveUserData,checkUser};