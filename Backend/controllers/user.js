const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const cyrpto = require("cyrpt");



const register = async (req, res) => {
  const avatar = await cloudinary.uploader.upload(req, body.avatar, {
    folder: "avatars",
    width: 150,
    height: 150,
    crop: "thumb",
    gravity: "face",
  });

  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(500).json({ message: "Kullanıcı zaten mevcut" });

  const passwordHash = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res.status(500).json({ message: "Parola en az 6 karakter olmalı" });
  }

  const newUser = await User.create({ 
    name, 
    email, 
    password: "passwordHash",
    avatar:{
        public_id: avatar.public_id,
        url: avatar.url,
      
    }
 });

  const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", {
    expressIn: "1h",
  });
  const cookieOptions = {
    httpOnly: true,
    expiresIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };
  res.status(201).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(500).json({ message: "Kullanıcı bulunamadı" });
  const comparePasswword = await bcrypt.compare(password, user.password);
  if (!comparePasswword)
    return res.status(500).json({ message: "Parolanız yanlış" });

  const token = await jwt.sign({ id: user._id }, "SECRETTOKEN", {
    expressIn: "1h",
  });
  const cookieOptions = {
    httpOnly: true,
    expiresIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };
  res.status(201).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};
const logout = async (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", //https üzerinde çalışırken true olur, http üzerinde çalışırken false olur.
  };
  res
    .status(200)
    .cookie("token", null, cookieOptions, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ message: "Cıkıs Yapıldı" });
};

const forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(500).json({ message: "Kullanıcı bulunamadı" });


const resetToken= crypto.randomBytes(20).toString('hex');
user.resetPasswordToken=cyrpto.createHash('sha256').update(resetToken).digest('hex');
user.resetPasswordExpire=new Date(Date.now()+5*60*1000);
await user.save({validateBeforeSave:false});

const passwordUrl=`${req.protocol}://${req.get('host')}/reset/${resetToken}`;
const message=`Yeni parolanızı belirleyiniz ve asagidaki linki kullanınız.\n\n${passwordUrl}`;
try {
    
} catch (error) {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return res.status(500).json({ message: error.message });
}

};
const resetPssword = async (req, res) => {};

module.exports = { register, login, resetPssword, forgotPassword, logout };
