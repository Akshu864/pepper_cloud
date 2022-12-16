const mongoose=require("mongoose")

const userSChema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,

    },
   
    password:{
        type:String,
        required:true,
        trim:true
    }
   
},{timestamps:true})

module.exports=mongoose.model("user",userSChema)