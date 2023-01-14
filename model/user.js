const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true,'Your number is already taken']

    },
    mobile:{
        type:Number,
        required:true,
        unique:[true,'Your number is already taken']
    },
    Address:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }
});
const model=mongoose.model("User",userSchema)

module.exports=model;