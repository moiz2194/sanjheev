const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const Product=require('../model/product.js');
const jwt = require('jsonwebtoken');
const User=require('../model/user.js')
const { verifyToken } = require('../middlewares/verifyauth');
const Apifeature=require('../utilis/apifeature.js')
const Category=require('../model/category.js')
const Order=require('../model/order.js')

//

router.post('/login',asyncerror(async(req,res,next)=>{
    const mobile=req.body.mobile;
    const user=await User.findOne({mobile});
    if(!user){
       return next(new ErrorHandler("user not found",404))
    }
    const token=jwt.sign({id:user._id},'appsecret');
    res.status(200).send({success:true,token})
   }))
   
   
   router.post('/register',asyncerror(async(req,res,next)=>{
    const {mobile}=req.body;
    if(mobile.toString().length!==10){
        return next(new ErrorHandler('Enter correct mobile number',405))
    }
    const user=await User.create(req.body);
    const token=jwt.sign({id:user._id},'appsecret');
    res.status(200).send({success:true,token})
   }))
//get my profile info
router.get('/me',verifyToken,asyncerror(async(req,res,next)=>{
  const user=await User.findById(req._id);
  res.status(200).send({success:true,user})
 }))


router.get('/getallproduct',asyncerror(async(req,res,next)=>{
 
  let apiFeature= new Apifeature(Product.find(),req.query)
    .Search()
  
    let files = await apiFeature.query;
   res.status(200).send({success:true,files})
}))


router.get('/allcategory',asyncerror(async(req,res,next)=>{
 
  let apiFeature= new Apifeature(Category.find(),req.query)
    .Search()
    .main()
  
    let files = await apiFeature.query;
   res.status(200).send({success:true,files})
}))

router.post('/getsubcategory',asyncerror(async(req,res,next)=>{
   const {id}=req.body
  let apiFeature= new Apifeature(Category.find(),req.query)
    .Search()
    .sub(id)
    let files = await apiFeature.query;
   res.status(200).send({success:true,files})
}))

//get all product
router.post('/allproduct',asyncerror(async(req,res,next)=>{
    const {lastcategory_id}=req.body
    let apiFeature= new Apifeature(Product.find(),req.query)
      .Search()
      .product(lastcategory_id)
    
      let files = await apiFeature.query;
     res.status(200).send({success:true,files})
  }))
// add order
router.post('/order',verifyToken,asyncerror(async(req,res,next)=>{
  const user=await User.findById(req._id);
  req.body.Address=user.Address;
  req.body.name=user.name;
  req.body.mobile=user.mobile;
    const order=await Order.create(req.body)
    res.status(200).send({success:true,order})
}))

module.exports=router