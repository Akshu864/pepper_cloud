const userModel=require('../model/userModel.js')
const bcrypt=require('bcrypt')



// //normal validations

// const isValidRequestBody=function(value){
//     return Object.keys(value).length>0
// }

// //validation for checking type
// const isValid=(value)=>{
//     if(typeof value=='undefined' || typeof value== null) return false;
//     if(typeof value=='string' && value.trim().length==0) return false
//     if(typeof value!='string') return false
//     return true
// }


// // user creation 
// const createUser=async function(req,res){
//     try{
    
//         let requestBody=req.body

//         if(!isValidRequestBody(requestBody)){
//            return  res.status(400).send({status:false,Msg:"plzz enter the data"})
//         }

//         let{name,email,phone,password}=requestBody

//         if(!isValid(name)){
//            return res.status(400).send({status:false,Msg:"username is required"})
//         }

        
//         if(!isValid(email)){
//             return res.status(400).send({status:false,Msg:"email required"})
//          }


//         const emailExt=await userModel.findOne({email:email})
//         if(emailExt){
//             return res.status(400).send({staus:false,msg:"email already exist"})
//         }
       
//         if(!isValid(phone)){
//            return res.staus(400).send({status:false,Msg:"this is not valid phone"})
//         }
//         const phoneExt=await userModel.findOne({phone:phone})
//           if(phoneExt){
//             return res.status(400).send({staus:false,msg:"phone already exist"})
//           }
//           if(!isValid(password)){
//              return res.staus(400).send({status:false,Msg:"this is not valid name"})
//           }

//           requestBody.password=await bcrypt.hash(requestBody.password,10)
//           let saveData=await userModel.create(requestBody)
//           console.log(saveData)
          
//         return res.status(201).send({status:true,msg:"succss",data:saveData})
        

//         }
//         catch(err){
//             return res.status(500).send({status:"error",msg:err.msg})
        
//         }
//         console.error(err)
//     }




const createUser = async function (req, res) {
    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: "Please provide the data" })
        }

        if (!body.name) {
            return res.status(400).send({ Status: false, message: "Please enter the  name" })
        }
      
       
        //---------Email and Phone validation -------------------------------------------------------------//
        if (!body.email) {
            return res.status(400).send({ Status: false, message: "Please enter the email" })
        }
       
        if (!body.phone) {
            return res.status(400).send({ Status: false, message: "Please enter the mobile number" })
        }
        
        //---------Email and Phone uniqcheck -------------------------------------------------------------//
        let uniqueCheck = await userModel.findOne({ email: body.email.toLowerCase().trim() })
        if (uniqueCheck) {
            if (uniqueCheck.email) {
                return res.status(400).send({ Status: false, message: "This email has been used already" })
            }
        }
        let uniqueCheckPhone = await userModel.findOne({ phone: body.phone })
        if (uniqueCheckPhone) {
            if (uniqueCheckPhone.phone) {
                return res.status(400).send({ Status: false, message: "This phone has been used already" })
            }
        }
        //----------------------------------------------------------------------------------------------------------//
        if (!body.password) {
            return res.status(400).send({ Status: false, message: "Please enter the password" })
        }
        
 
        body.password = await bcrypt.hash(body.password, 10)

        //----------------------------------------User Creation-------------------------------------------------------//

        const createUser = await userModel.create(body)
        return res.status(201).send({status:true,data:createUser})
    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//get user


const getUser = async function (req, res) {

    try {

        const {userId} = req.query
    
       
        const userGet = await userModel.findOne({ _id: userId }).select({"__v": 0})
        if (!userGet)
            return res.status(400).send({ status: false, message: "no data found with user Id" })

        return res.status(200).send({ status: true, message: "user Details", data: userGet })

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }

}

//update user
const updateUser=async function(req,res){
    try{
    let userId=req.params.userId
    console.log(userId)
    let data=req.body
    console.log(data)
    const {name,email,password,phone}=data
    let finalUpdate=await userModel.findOneAndUpdate({_id:userId},{$set:{name,email,password,phone}},{new:true,upsert:true})
    console.log(finalUpdate)
    return res.status(200).send({status:true,message:"successfully changed",data:finalUpdate})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false,msg:err.msg})
    }
  }


    

module.exports={createUser,getUser,updateUser}