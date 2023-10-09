const express= require("express");
const router=express.Router();
const userController=require('../controller/userController');

//user route
router.post("/register",userController.registration);







module.exports=router;