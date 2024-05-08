const admin=require('../Models/adminschema')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
    console.log('inside controller function');
    const{adminname,adminemail,password}=req.body
    try{
      const existingadmin=await admin.findOne({adminemail})
    if( existingadmin){
      res.status(406).json("user already exist")
    }else{
      const newUser= new admin({
          adminname,adminemail,password
      })
      await newUser.save()
      res.status(200).json(newUser)
    }
    }
    catch(err){
      res.status(401).json(`regsster api failed f${err}`)
    }
   
  }
  

  exports.login=async(req,res)=>{
    console.log('inside login function');
    const{adminemail,password}=req.body
    try{
      const existingUser=await admin.findOne({adminemail,password})
    if(existingUser){
      const token=jwt.sign({userId:existingUser._id},"ndnv52dtbv")
      res.status(200).json({
        existingUser,token
      })
    }else{
      
      res.status(404).json('incorrect email/password')
    }
    }
    catch(err){
      res.status(401).json(`regsster api failejd f${err}`)
    }
   
  }
  