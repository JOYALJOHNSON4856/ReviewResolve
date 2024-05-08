const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')
// register

exports.register=async(req,res)=>{
  console.log('inside controller function');
  const{username,email,password}=req.body
  try{
    const existingUser=await users.findOne({email})
  if(existingUser){
    res.status(406).json("user already exist")
  }else{
    const newUser= new users({
        username,email,password
    })
    await newUser.save()
    res.status(200).json(newUser)
  }
  }
  catch(err){
    res.status(401).json(`regsster api failed f${err}`)
  }
 
}

// login
exports.login=async(req,res)=>{
  console.log('inside login function');
  const{username,email,password}=req.body
  try{
    const existingUser=await users.findOne({email,password})
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


exports.seperateusers=async(req,res)=>{
  console.log("inside sepetare cuserrrrrr");
  const userId = req.payload; 
  try {
      const seperateuser = await users.findById({_id:userId});
      console.log(seperateuser);
      res.status(200).json([seperateuser] );
  } catch (err) {
      res.status(500).json({ message: "Error fetching solutions by user ID", error: err });
      console.log(err);
  }
}






exports.profileupdate = async(req, res) => {
  console.log("inside post controller");
  const userId = req.payload;
  const postimage = req.file.filename;

  try {
    const existingUser = await users.findById({_id: userId});

    if(existingUser) {
      // Update the user's profile image with the new post image
      existingUser.profileimage = postimage;
      await existingUser.save();

      // Respond with the updated user document
      res.status(200).json(existingUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}




exports.allusers=async (req,res)=>{
  console.log("inside allusers");
try{
   const allposts=await users.find()
   console.log(allposts);
   res.status(200).json(allposts)
}catch(err){
   res.status(401).json(err)
}
}
