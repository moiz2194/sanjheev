const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const jwt = require('jsonwebtoken');
const Category=require('../model/category.js')
const Product=require('../model/product.js')
const Order=require('../model/order.js')
const cloudinary=require('cloudinary')
const { verifyToken, isadmin } = require('../middlewares/verifyauth');

//Add category
router.post('/addcategory',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
const category=await Category.create(req.body)
res.status(200).send({success:true,category})
}))
//update category
router.post('/updatecategory',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
const category=await Category.findByIdAndUpdate(req.body.id,{
    name:req.body.name,
    Parent_id:req.body.Parent_id,
    url:req.body.url

})
res.status(200).send({success:true,category})
}))
//Delete product
router.post('/deleteproduct',verifyToken,isadmin,asyncerror(async(req,res,next)=>{

const category=await Category.findByIdAndDelete(req.body.id)
res.status(200).send({success:true,category})
}))
//Add product
router.post('/addproduct',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const Images=[]
    if(req.body.images.length!==0){
        for (const element of req.body.image) {
            let result=await cloudinary.v2.uploader.upload(element,{
                folder:'products'
            })
            Images.push({public_id:result.public_id,url:result.url})
        }
        
    }
   
req.body.Images=Images
const product=await Product.create(req.body)
res.status(200).send({success:true,product})
}))
//Get all order
router.get('/orders',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const order=await Order.find().sort({createdAt:-1})
  
    res.status(200).send({success:true,order})
    }))
//Mark order complete
router.get('/completeorder',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const order=await Order.findByIdAndDelete(req.body.id)

    res.status(200).send({success:true,order})
    }))
module.exports=router