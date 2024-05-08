const mongoose=require('mongoose')

const productsschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    brandname:{
        type:String,
        required:true,
    },
    productnames:{
        type:String,
        required:true,
    },
    complaint:{
        type:String,
        required:true,
    },
    productimage:{
        type:String,
        required:true,
    },
    productvideo:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
      userId:{
        type:String,
        required:true,
    },
    solutionlikes:{
        type:Number,
        default:0,
    },
 
})

const sollutions=mongoose.model("sollutions",productsschema)
module.exports =sollutions
