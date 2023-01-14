const mongoose=require('mongoose');
const uri='mongodb+srv://paper-magic-supplies:DGbJk4hwLHgCuq3z@cluster0.dctfvch.mongodb.net/?retryWrites=true&w=majority';
const connecttomongo=()=>
{
    mongoose.connect(uri).then((data)=>{
        console.log('Connected to databse successfully '+ data.Connection.name)
    }).catch((err)=>{
        console.log(err);
    })
};
module.exports=connecttomongo;
