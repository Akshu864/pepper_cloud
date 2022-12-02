const mongoose=require("mongoose")

const userSChema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
        trim:true
    }
   
},{timestamps:true})

module.exports=mongoose.model("user",userSChema)