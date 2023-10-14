const taskModel=require('../model/Task');

exports.createTask=async (req,res)=>{
    try{
        let reqBody=req.body
        reqBody.email=req.headers['email']
        let result=await taskModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(401).json({status:"fail",data:e.toString()})
    }
}

exports.deleteTask=async(req,res)=>{
    try{
        let id=req.params.id
        let query={_id:id}
        let result=await taskModel.deleteOne(query);
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(401).json({status:"fail",data:e.toString()})
    }
}

exports.updateTask=async(req,res)=>{
    try{
        let id =req.params.id
        let reqBody=req.body
        reqBody.status="updated"
        let query={_id:id}
        let result=await taskModel.updateOne(query,reqBody)
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(401).json({status:"fail",data:e.toString()})
    }
}

exports.listTaskByStatus=async(req,res)=>{
    try{
        let status=req.params.status
        let email=req.headers['email']
        let result=await taskModel.find({email:email,status:status})
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(401).json({status:"fail",data:e.toString()})
    }
}

exports.taskStatusCount=async (req,res)=>{
    try{
        let email=req.headers['email']
        let result=await taskModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:result})
    }catch (e) {
        res.status(401).json({status:"fail",data:e.toString()})
    }
}
