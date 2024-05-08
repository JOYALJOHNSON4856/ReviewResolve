const users = require('../Models/userSchema');

// Controller function to add a liked comment ID to a user's likedComments array
exports.addLikedComment = async (req, res) => {
    try {
        const { email, commentId } = req.body;
         console.log("inside comment controller");
        // Find the user by username
        const user = await users.findOne({email});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the commentId is already in the likedComments array
        const isCommentLiked = user.likedComments.includes(commentId);
        if (isCommentLiked) {
            return res.status(409).json({ error: 'Comment already liked by the user' });
        }

        // Add the commentId to the likedComments array
        user.likedComments.push(commentId);
        
        // Save the updated user document
        await user.save();
        
        return res.status(200).json({ message: 'Comment added to likedComments' });
        
    } catch (error) {
        console.error('Error adding liked comment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};







exports.addbrands = async (req, res) => {
    try {
        console.log("inside brand controller");
        const { email, brandname } = req.body;
       
        // Find the user by username
        const user = await users.findOne({email});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the commentId is already in the likedComments array
        const isCommentLiked = user.brands.includes(brandname);
        if (isCommentLiked) {
            return res.status(409).json({ error: 'brand already follwed by user' });
        }

        // Add the commentId to the likedComments array
        user.brands.push(brandname);
        
        // Save the updated user document
        await user.save();
        
        return res.status(200).json({ message: 'Comment added to likedComments' });
        
    } catch (error) {
        console.error('Error adding liked comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.addlikedbrands = async (req, res) => {
    try {
        console.log("inside likedbrand controller");
        const { email, productname } = req.body;
       console.log(email,productname);
        // Find the user by username
        const userz = await users.findOne({email});
        if (!userz) {
            return res.status(404).json({ error: 'User not found' });
        }
           console.log('dddd');
        // Check if the commentId is already in the likedComments array
        const isproductLiked = userz.likedproducts.includes(productname);
        if (isproductLiked) {
            return res.status(409).json({ error: 'brand already follwed by user' });
        }

        // Add the commentId to the likedComments array
        userz.likedproducts.push(productname);
        
        // Save the updated user document
        await userz.save();
        
        return res.status(200).json({ message: 'like added to products' });
        
    } catch (error) {
        console.error('Error adding liked comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.addlikedsollutions = async (req, res) => {
    try {
        console.log("inside likedsollution controller");
        const { email, productid } = req.body;
       console.log(email,productid);
        // Find the user by username
        const userz = await users.findOne({email});
        if (!userz) {
            return res.status(404).json({ error: 'User not found' });
        }
           console.log('dddd');
        // Check if the commentId is already in the likedComments array
        const issollutionLiked = userz.likedsollutions.includes(productid);
        if (issollutionLiked) {
            return res.status(409).json({ error: 'sollution already liked by user' });
        }

        // Add the commentId to the likedComments array
        userz.likedsollutions.push(productid);
        
        // Save the updated user document
        await userz.save();
        
        return res.status(200).json({ message: 'like added to products' });
        
    } catch (error) {
        console.error('Error adding liked comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};