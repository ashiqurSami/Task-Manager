const mongoose=require('mongoose');
const taskSchema=mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    email:{type:String},
},{timestamps: true,versionKey:false});

const taskModel=mongoose.model('tasks',taskSchema);
module.exports = taskModel