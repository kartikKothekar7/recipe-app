const mongoose=require('mongoose')

//below we create schema of user conatining email and password
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true})

module.exports=mongoose.model("user",userSchema)