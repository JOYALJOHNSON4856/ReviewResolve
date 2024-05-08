const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min: [6, 'must be atlest 6']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
    },
    likedComments: {
        type:Array
    },
    brands: {
        type:Array
    },
    likedproducts:{
        type:Array
    },
    likedsollutions:{
        type:Array
    },
    profileimage:{
        type:String,
        default:"image-1712549743123-images.jpeg"
    },
})

const users=mongoose.model("users",userSchema)
module.exports =users