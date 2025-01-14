const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

const register=async(req,res)=>{
    const {name, email, password}=req.body;
   
        const user= await User.findOne({email});
        if(user) return res.status(500).json({message:'Kullanıcı zaten mevcut'});

  
        const passwordHash=await bcrypt.hash(password,10);

if(password.length<6){
    return res.status(500).json({message:'Parola en az 6 karakter olmalı'});
}

const newUser = await User.create({name, email, password:'passwordHash'});
   

const token = await jwt.sign({id:newUser._id}, "SECRETTOKEN",{expressIn:'1h'});
const cookieOptions={
  
    httpOnly:true,
    expiresIn:new Date(Date.now()+5*24*60*60*1000),
}
res.status(201).cookie('token',token,cookieOptions).json({
    newUser,
    token
})


};
const login=async(req,res)=>{
    const {email, password}=req.body;
    const user= await User.findOne({email});
    if(!user) return res.status(500).json({message:'Kullanıcı bulunamadı'});
    const comparePasswword=await bcrypt.compare(password,user.password);
    if(!comparePasswword) return res.status(500).json({message:'Parolanız yanlış'});

    const token = await jwt.sign({id:user._id}, "SECRETTOKEN",{expressIn:'1h'});
    const cookieOptions={
  
        httpOnly:true,
        expiresIn:new Date(Date.now()+5*24*60*60*1000),
    }
    res.status(201).cookie('token',token,cookieOptions).json({
        user,
        token
    })
};
const logout=async(req,res)=>{
    const cookieOptions={
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:req.secure || req.headers['x-forwarded-proto'] === 'https'  //https üzerinde çalışırken true olur, http üzerinde çalışırken false olur.
    }
    res.status(200).cookie('token',null,cookieOptions,{expires:new Date(Date.now()),httpOnly:true}).json({message:'Cıkıs Yapıldı'})
};

const forgotPassword=async(req,res)=>{};
const resetPssword=async(req,res)=>{};

module.exports = {register,login,resetPssword,forgotPassword,logout};