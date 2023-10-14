const express= require("express");
const router=express.Router();
const userController=require('../controller/userController');
const userAuthMiddleWare=require('../middlewire/userAuthVerifyMiddleware')


//user route
router.post("/register",userController.registration);
router.get("/login",userController.login)
router.get("/profile-details",userAuthMiddleWare,userController.profileDetails)
router.post("/update-profile",userAuthMiddleWare,userController.profileUpdate)

//OTP
router.post("/verify-email/:email",userController.verifyEmail)





module.exports=router;