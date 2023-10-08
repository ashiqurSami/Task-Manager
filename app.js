const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyparser=require("body-parser");
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const hpp =require('hpp');
const cors =require('cors');
const dotEnv=require("dotenv");
const mongoose =require('mongoose');
const limiter=rateLimit({windowMs:15*60*1000,max:3000})


dotEnv.config();
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(bodyparser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(limiter)


const url=`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@notepad.ia1rli9.mongodb.net/`;
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("Connected successfully"))
    .catch((err)=>{
        console.log(err);
    });

app.use("/api/v1",router)
// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports=app;
