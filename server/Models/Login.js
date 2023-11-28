const mongoose =require("mongoose")
const validator=require("validator");
const LoginSchema=new mongoose.Schema({
    email:{
        type: String,
        required: [true,"please enter email"],
        unique: true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type: String,
        required: [true, "please enter the password"],
        maxlength:[6,'password cannot exceed 6 chatacter'],

    }
  });
  
  const LoginModel = mongoose.model('login', LoginSchema);
  
  module.exports =LoginModel;