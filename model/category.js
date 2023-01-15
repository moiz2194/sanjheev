const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true,'name is already taken']

    },
    url:{ 
        type:String,
        required:true

    },
    public_id:{
        type:String,
        required:true
    },
    total_subcategories:{
        type:Number,
        default:0
    },
    Parent_id:{
        type:String,
    }
});
const model=mongoose.model("category",userSchema)

module.exports=model;