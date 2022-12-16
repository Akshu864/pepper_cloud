
const express=require('express')

const router=express.Router()

const userController=require("../controller/userController")


router.post('/register',userController.createUser)
router.get('/get',userController.getUser)
router.put('/update/:userId',userController.updateUser)




module.exports=router