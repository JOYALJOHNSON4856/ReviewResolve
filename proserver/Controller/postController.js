const posts=require('../Models/postschema')
const sollutions=require('../Models/productSchema')


//add posts

exports.addposts = async(req,res)=>{
    console.log("inside post controller");
    const userId =req.payload
    const postimage=req.file.filename
    // console.log(postimage);
    console.log(`${userId}`);
    const{username,brand,productname,reviews}=req.body
    console.log(`${brand},${productname},${postimage},${reviews}`);


    try{
        // const existingProduct =await posts.findOne({productname})
        // if(existingProduct){
        //     res.status(406).json("product already added ")
          
        // }else{
            const newposts= new posts({
                username,brand,productname,postimage,reviews,userId
            })
            await newposts.save()
            res.status(200).json(newposts)
        // }
       
    
    }catch(err){
        res.status(401).json("request failer ")
    }

}



// get all posts


exports.allPosts=async (req,res)=>{
   console.log("inside all sollutions");
try{
    const allposts=await posts.find()
    res.status(200).json(allposts)
}catch(err){
    res.status(401).json(err)
}
}


exports.seperatePosts = async (req, res) => {
    try {
        console.log("inside seperaer");
        const datas=req.body
        console.log(datas );
        const {brands} = req.body
        console.log(brands);
        // Check if brands were provided in the request body
        if (!brands || !Array.isArray(brands)) {
            return res.status(400).json({ error: 'Please provide an array of brand names in the request body.' });
        }

        // Filter posts based on the provided brand names
        const allPosts = await posts.find({ brand: { $in: brands } });

       return  res.status(200).json(allPosts);
    } catch (err) {
        console.log(`${err}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
};






exports.sollutions = async(req,res)=>{
    console.log("inside video controller");
    const userId =req.payload
    const productimage = req.files['productimage'][0].filename;
    const productvideo = req.files['productvideo'][0].filename;
    // console.log(postimage);
    console.log(`${userId}`);
    const{ username,brandname,productnames,complaint, description}=req.body
    console.log(`${username},${brandname},${productnames},${complaint},${description}${productimage},${productvideo}`);


    try{
        // const existingProduct =await posts.findOne({productname})
        // if(existingProduct){
        //     res.status(406).json("product already added ")
          
        // }else{
            const newsolutions= new sollutions({
                username,brandname,productnames,complaint, description,productimage,productvideo,description,userId
            })
            await newsolutions.save()
            res.status(200).json(newsolutions)
        // }
       
    
    }catch(err){
        res.status(401).json("request failer ")
    }

}



exports.allsollutions=async (req,res)=>{
   
    try{
        const allsollutions=await sollutions.find()
        res.status(200).json(allsollutions)
    }catch(err){
        res.status(401).json(err)
    }
    }



exports.seperatesollutions=async(req,res)=>{
    console.log("inside sepetare soluution");
    const userId = req.payload; 
 
    try {
        const allSolutions = await sollutions.find({ userId:userId});
        res.status(200).json(allSolutions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching solutions by user ID", error: err });
    }
}


exports.seperatecomments=async(req,res)=>{
    console.log("inside sepetare comments");
    const userId = req.payload; 
 
    try {
        const allcomments = await posts.find({ userId:userId});
        res.status(200).json(allcomments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching solutions by user ID", error: err });
    }
}


exports.deletepost=async(req,res)=>{
    console.log("inside delete cuserrrrrr");
    const {deleteid} = req.body 
    try {
        const deletedPost = await posts.findOneAndDelete({_id:deleteid });

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(deletedPost );
    } catch (err) {
        res.status(500).json({ message: "Error fetching solutions by user ID", error: err });
        console.log(err);
    }
  }







  