const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true,'Your number is already taken']

    },
    Parent_id:{
        type:String,
    }
});
const model=mongoose.model("category",userSchema)

module.exports=model;