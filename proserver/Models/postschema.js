const mongoose=require('mongoose')

const postschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    productname:{
        type:String,
        required:true,
    },
    postimage:{
        type:String,
        required:true,
    },
    reviews:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0,
    },
    productlikes:{
        type:Number,
        default:0,
    }
})

const posts=mongoose.model("posts",postschema)
module.exports =posts