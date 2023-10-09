const userModel=require('../model/User');
const jwt=require('jsonwebtoken');

//registration
exports.registration=async(req,res)=>{
    let reqBody=req.body;
    try{
        let result=await userModel.create(reqBody);
        res.status(200).json({status:"success",data:result});

    }catch (e) {
        res.status(400).json({status:"Fail",error:e.toString()});
    }
}