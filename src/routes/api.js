const express= require("express");
const router=express.Router();
const userController=require('../controller/userController');
const userAuthMiddleWare=require('../middlewire/userAuthVerifyMiddleware')
const taskController=require('../controller/taskController')

//user route
router.post("/register",userController.registration);
router.get("/login",userController.login)
router.get("/profile-details",userAuthMiddleWare,userController.profileDetails)
router.post("/update-profile",userAuthMiddleWare,userController.profileUpdate)

//OTP
router.post("/verify-email/:email",userController.verifyEmail)

//task
router.post("/create-task",userAuthMiddleWare,taskController.createTask)
router.delete("/delete-task/:id",userAuthMiddleWare,taskController.deleteTask)
router.post("/update-task/:id",userAuthMiddleWare,taskController.updateTask)
router.get("/get-list-status/:status",userAuthMiddleWare,taskController.listTaskByStatus)
router.get("/task-status-count",userAuthMiddleWare,taskController.taskStatusCount)




module.exports=router;