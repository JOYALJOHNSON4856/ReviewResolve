const mongoose=require('mongoose')

const messageSchema= new mongoose.Schema({
    messagename:{
        type:String,
        required:true,
        min: [6, 'must be atlest 6']
    },
    messageemail:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
   
})

const messages=mongoose.model("messages",messageSchema)
module.exports =messages