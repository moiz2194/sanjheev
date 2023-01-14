const express = require('express');
const app = express();
const connecttomongo = require('./db');
const cors = require('cors')
const bodyParser=require('body-parser')
const cloudinary=require('cloudinary')
const errorMiddleware = require('./middlewares/error.js')
app.use(cors())
connecttomongo();


// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' })); 
app.use(express.json({limit: '50mb'}));
app.use('/api/user', require('./routes/buyer.js'));
app.use('/api/admin', require('./routes/admin.js'));
// 0 0 0 * * *
cloudinary.v2.config({
    cloud_name:'df7gvtw9c',
    api_key:"613152172267948",
    api_secret:"C6aB6_FBQ63E7NtpxFR_MXWHdMg"
})
app.use(errorMiddleware);
module.exports = app;