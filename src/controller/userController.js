const userModel=require('../model/User');
const jwt=require('jsonwebtoken');
const otpModel=require('../model/OTP');
const sendEmailHelper=require('../utility/SendEmailHelper')




//registration
exports.registration=async(req,res)=> {
    let reqBody = req.body;
    try {
        let result = await userModel.create(reqBody);
        res.status(200).json({status: "success", data: result});

    } catch (e) {
        res.status(400).json({status: "Fail", error: e.toString()});
    }
}


//log  in
exports.login=async (req,res)=>{
    let reqBody=req.body;
    try{
        let count=await userModel.find(reqBody).count();
        if (count===1){
            let payload={
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data:reqBody['email']
            }
            let token=jwt.sign(payload,"SecretKey5678");
            res.status(200).json({status:"success",data:token});
        }
        else{
            res.status(400).json({status:"Fail",data:"No user Found"});
        }
    }catch (e) {
        res.status(400).json({status:"Fail",error:e.toString()});
    }
}


//profile details
exports.profileDetails=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let data=await userModel.find({email:email});
        res.status(200).json({status:"success",data:data});
    }catch (e) {
        res.status(400).json({status:"Fail",error:e.toString()});
    }
}


//profile update
exports.profileUpdate=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let reqBody=req.body;
        let data=await userModel.updateOne({email:email},reqBody)
        res.status(200).json({status:"success",data:data});
    }catch (e) {
        res.status(400).json({status:"Fail",error:e.toString()});
    }
}


//Send OTP to Email
exports.verifyEmail=async(req,res)=>{
    let email=req.params.email;
    let OTPcode=Math.floor(100000+Math.random()*900000)
    let text="Your verification code is ="+OTPcode;
    let subject="Verification Code"

    let cnt=await userModel.find({email:email}).count();
    if (cnt===1){
        await sendEmailHelper(email,text,subject)
        await otpModel.create({email:email,otp:OTPcode})
        res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})
    }else{
        res.status(401).json({status:"fail",data:"No User Found"})
    }
}
