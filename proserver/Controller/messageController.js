
const messages=require('../Models/messageschema')
const jwt=require('jsonwebtoken')
// register
exports.addmessage = async(req,res)=>{
    console.log("inside post controller");
    const{messagename,messageemail,subject, message}=req.body
    console.log(`${messagename},${messageemail},${subject},${message}`);


    try{
            const newposts= new messages({
               messagename,messageemail,subject, message
            })
            await newposts.save()
            res.status(200).json(newposts)
        // }
       
    
    }catch(err){
        res.status(401).json("request failer ")
    }

}



exports.message=async (req,res)=>{
    console.log("inside allusers");
  try{
     const allposts=await messages.find()
     console.log(allposts);
     res.status(200).json(allposts)
  }catch(err){
     res.status(401).json(err)
  }
  }
  