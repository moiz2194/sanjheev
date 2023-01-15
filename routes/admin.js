const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const jwt = require('jsonwebtoken');
const Category=require('../model/category.js')
const Product=require('../model/product.js')
const Order=require('../model/Order.js')
const User=require('../model/user.js')
const cloudinary=require('cloudinary')
const { verifyToken, isadmin } = require('../middlewares/verifyauth');

//Add category
router.post('/addcategory',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const result=await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"categories"
    })
    if(req.body.Parent_id){
const parentcategory=await Category.findById(req.body.Parent_id)
let total_subcategories=parentcategory.total_subcategories+1
    await Category.findByIdAndUpdate(parentcategory._id,{
        total_subcategories
    })
    }
    req.body.public_id=result.public_id
    req.body.url=result.url
const category=await Category.create(req.body)
res.status(200).send({success:true,category})
}))
//update category
router.post('/updatecategory',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    let category;
    if(req.body.image){
        const result=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:'products'
        })
 category=await Category.findByIdAndUpdate(req.body.id,{
    ...req.body,public_id:result.public_id,url:result.url
 })
     

    }else{
 category=await Category.findByIdAndUpdate(req.body.id,req.body)
    }
res.status(200).send({success:true,category})
}))
//update category
router.post('/updateproduct',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
let product;
let Images=[]
    if(req.body.images){
        
        for (const element of req.body.images) {
            const result=await cloudinary.v2.uploader.upload(element,{
                folder:'products'
            })
            Images.push({public_id:result.public_id,url:result.url})
            
        }
       
 product=await Product.findByIdAndUpdate(req.body.id,{
    ...req.body,Images
 })
     

    }else{
 product=await Product.findByIdAndUpdate(req.body.id,req.body)
 
    }
res.status(200).send({success:true,product})
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
router.post('/completeorder',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const order=await Order.findByIdAndDelete(req.body.id)

    res.status(200).send({success:true,order})
    }))
router.post('/getalluser',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    const users=await User.find()

    res.status(200).send({success:true,users})
    }))
module.exports=router