const express=require('express');

const router=express.Router()

const userController=require('../Controller/userController')
const adminController=require('../Controller/adminController')
const postController=require('../Controller/postController');
const CommentController=require('../Controller/CommentController')
const likeController=require('../Controller/LikeController')
const messageController=require('../Controller/messageController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');


//register===========================


router.post('/user/register',userController.register)

//loginapi------------------------------------

router.post('/user/login',userController.login)

// add post

router.post('/posts/add',jwtMiddleware,multerConfig.single('postimage'),postController.addposts)



// all posts


router.get('/posts/all',postController.allPosts)


// add likes id to user

router.post('/user/comment',CommentController.addLikedComment)



// update like count
router.put('/posts/likes',likeController.addlikes)





//add brands to user

router.post('/user/follows',CommentController.addbrands)


//get followed posts

router.post('/posts/brands',postController.seperatePosts)


// add liked braand to user

router.post('/user/brands',CommentController.addlikedbrands)

//adding likes to product

router.put('/posts/productlike',likeController.addproductslikes)


// add sollutions

router.post('/sollutions/add',jwtMiddleware,multerConfig.fields([
    { name: 'productimage', maxCount: 1 },
    { name: 'productvideo', maxCount: 1 }
]),postController.sollutions)


// get all videos
router.get('/sollutions/all',postController.allsollutions)


//add likes to videos
router.put('/sollutions/likes',likeController.addsollutionlike)




router.post('/user/sollutions',CommentController.addlikedsollutions)




// to get users sollutionas

router.post('/posts/sollutions',jwtMiddleware,postController.seperatesollutions)


//to get user comments
router.post('/posts/comments',jwtMiddleware,postController.seperatecomments)


//to get seperate user
router.post('/user/seperate',jwtMiddleware,userController.seperateusers)



//add profile pic
router.post('/users/update',jwtMiddleware,multerConfig.single('postimage'),userController.profileupdate)

//to delete posts
router.delete('/post/delete',postController.deletepost)

// admin register
router.post('/admin/register',adminController.register)

//admin login
router.post('/admin/login',adminController.login)

// get all users
router.get('/users/all',userController.allusers)

//send messahe
router.post('/admin/message',messageController.addmessage)

//get all messagea
router.get('/messages/all',messageController.message)

module.exports=router