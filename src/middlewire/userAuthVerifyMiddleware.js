const jwt=require("jsonwebtoken");
const dotEnv=require('dotenv');
dotEnv.config();

module.exports = (req,res,next)=>{
    let token=req.headers['token'];
    jwt.verify(token,process.env.KEY,function (err,data){
        if (err){
            console.log(token);
            res.status(401).json({status:"unauthorized"})
        }
        else{
            let email=data['data'];
            console.log(email)
            req.headers.email=email
            next();
        }
    })
}