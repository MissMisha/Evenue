const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
     // Check if token exists
     const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Token missing or invalid"
        });
    }  
   const token = authHeader.split(" ")[1];

   try{
    const decoded = jwt.verify(
        token,
        process.env.jwt_secret
    );
    req.user = decoded;
    next();  // this allows the request to proceed to the actual API
   }
   catch(err){
    return res.json({msg:"Session expired"})
   }
}

module.exports = verifyToken;