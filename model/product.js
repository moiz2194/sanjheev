const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    lastcategory_id:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    GST:{
        type:String,
        required:true
    },
    hsn_code:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Mcarton:{
        type:Number
    },
    Minimum_Order:{
        type:Number
    },
    Inner_packing:{
        type:Number
    },
    Unit:{
        type:String
    },
    Images:[
        {
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        }
        
    ]

});
const model=mongoose.model("Product",userSchema)

module.exports=model;