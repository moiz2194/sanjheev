const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    mobile:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true,
    },
    product_id:{
        type:String,
        required:true
    },
    quantity:{
      type:Number,
      default:1  
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
const model=mongoose.model("order",userSchema)

module.exports=model;