const User = require("../models/user.js");
const jwt = require("jsonwebtoken");    

const authenticationMid=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token) return res.status(500).json({message:'Erişim için login olun !!!'});
   
const decodedData = jwt.verify(token,"SECRETTOKEN");

if(!decodedData) return res.status(500).json({message:'Erişim tokenınız gecerli degil !!!'});
   req.user=await User.findById(decodedData.id);
   next();
}

const roleChecked = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) return res.status(500).json({message:'Bu işlem için yetkiniz yok!!'});
        next();
    }
}




  module.exports ={authenticationMid,  roleChecked}