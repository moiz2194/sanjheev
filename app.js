const express = require('express');
const app = express();
const connecttomongo = require('./db');
const cors = require('cors')
const bodyParser=require('body-parser')

const errorMiddleware = require('./middlewares/error.js')
app.use(cors({
    origin:'http://localhost:3000'
}))
connecttomongo();


// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' })); 
app.use(express.json({limit: '50mb'}));
app.use('/api/user', require('./routes/buyer.js'));
app.use('/api/admin', require('./routes/admin.js'));
// 0 0 0 * * *

app.use(errorMiddleware);
module.exports = app;