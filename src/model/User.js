const mongoose=require('mongoose');

const userSchema =mongoose.Schema(
    {
        email:{type:String,Unique:true},
        fName:{type:String},
        lName:{type:String},
        mobile:{type:String},
        password:{type:String},
    },
    {timestamps: true,versionKey:false}
);

const userModel=mongoose.model('users',userSchema);
module.exports=userModel;