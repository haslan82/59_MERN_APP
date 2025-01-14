const mangoose = require("mongoose");
const userSchema = new mangoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    unique: true,
    password: {type: String,minLength: [6,'Minumum 6 kareketer olmalı'], required: true},
    avatar:{
        public_id:{
            type: String,
        required: true,
        },
        url:{
            type: String,
        required: true,
        }
    },
    role: {type: String, required: true, default: "user"},
   
},{timestamps: true})

module.exports = mangoose.model("User", userSchema);