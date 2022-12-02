const userModel=require('../model/userModel.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//normal validations

const isValidRequestBody=function(value){
    return Object.keys(value).length>0
}

//validation for checking type
const isValid=(value)=>{
    if(typeof value=='undefined' || typeof value== null) return false;
    if(typeof value=='string' && value.trim().length==0) return false
    if(typeof value!='string') return false
    return true
}


//user creation 
const createUser=async function(req,res){
    try{
        let requestBody=req.body

        if(!isValidRequestBody(requestBody)){
           return  res.status(400).send({status:false,Msg:"plzz enter the data"})
        }

        let{username,name,phone,password}=requestBody

        if(!isValid(username)){
           return res.status(400).send({status:false,Msg:"username not valid"})
        }
        const userExt=await userModel.findOne({username:username})
        if(userExt){
            return res.status(400).send({staus:false,msg:"username already exist"})
        }
        if(!isValid(name)){
            return res.staus(400).send({status:false,Msg:"this is not valid name"})
        }
        if(!isValid(phone)){
           return res.staus(400).send({status:false,Msg:"this is not valid phone"})
        }
        const phoneExt=await userModel.findOne({phone:phone})
          if(phoneExt){
            return res.status(400).send({staus:false,msg:"phone already exist"})
          }
          if(!isValid(password)){
             return res.staus(400).send({status:false,Msg:"this is not valid name"})
          }

          requestBody.password=await bcrypt.hash(requestBody.password,10)
          let saveData=await userModel.create(requestBody)
          
        return res.status(201).send({status:true,msg:"succss",data:saveData})
        }

        catch(err){
            return res.status(500).send({status:"error",msg:err.msg})
        }
        
    }


    //Api login


    const login=async function(req,res){
        try{
            let body=req.body

        let checkDetail=await userModel.findOne({username:body.username})
        console.log(checkDetail)
        if(!checkDetail){
            return res.status(404).send({status:false,msg:"could not find the details of the user"})
        }

         let checkPassword=await bcrypt.compare(body.password,checkDetail.password)
         
         if(!checkPassword){
            return res.status(404).send({status:false,msg:"pssswrd not correct"})
         }

         //let token
         let username=checkDetail.username

         let token=jwt.sign({
            username:username

         },"akshay-1",{expiresIn:"36000s"})
         
         
        
         return res.status(200).send({status:true,msg:"user logined",user:checkDetail})

        }
        catch(err){
            return res.status(500).send({status:"error",msg:err.msg})
        }
    }




    

module.exports={createUser,login}