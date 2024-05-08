const mongoose=require('mongoose')

const adminSchema= new mongoose.Schema({
    adminname:{
        type:String,
        required:true,
        min: [6, 'must be atlest 6']
    },
    adminemail:{
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
    }
   
})

const admin=mongoose.model("admin",adminSchema)
module.exports =admin