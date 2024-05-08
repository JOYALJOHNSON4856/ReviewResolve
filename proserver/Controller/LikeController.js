 const posts=require('../Models/postschema')
 const sollutions=require('../Models/productSchema')

 exports.addlikes = async(req,res)=>{
    console.log("inside like controller");
  try{

    const {_id} = req.body;
    const post = await posts.findById(_id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Increment the like count
    post.likes++;

    // Save the updated post
    await post.save();

    // Return the updated post with the incremented like count
    res.json({ message: 'Post liked successfully', post });
} catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}



exports.addproductslikes = async(req,res)=>{
   console.log("inside productlike controller");
   try {
          
      const { productname } = req.body;
        console.log("Product Name:", productname);

        // Directly query the database to check for "boombox" products
        const boomboxProducts = await posts.find({ productname: productname });
        console.log("Boombox Products:", boomboxProducts);

        // Update all documents with the product name "boombox"
        const result = await posts.updateMany({ productname: productname }, { $inc: { productlikes: 1 } });
        console.log("Update Result:", result);

        // Check if any products were updated
        if (result.nModified > 0) {
            res.json({ message: `Product likes for "${productname}" incremented successfully` });
        } else {
            console.log("No products found with the name 'boombox'");
            res.status(404).json({ error: `No products found with the name "${productname}"` });
        }
    }
 catch (error) {
    console.error('Error incrementing product likes:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}




exports.addsollutionlike = async(req,res)=>{
    console.log("inside like controller");
  try{

    const {_id} = req.body;
    const post = await sollutions.findById(_id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Increment the like count
    post.solutionlikes++;

    // Save the updated post
    await post.save();

    // Return the updated post with the incremented like count
    res.json({ message: 'Post liked successfully', post });
} catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}