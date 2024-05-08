
import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Button from 'react-bootstrap/Button';
import { Likecomment, addlikedbrands, followedposts, updatelike, updateproductlike } from '../services/allApi';
import { BASEURL } from '../services/baseurl';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {  toast } from 'react-toastify';

function Posts() {

  // cretae array to store brands that user followed
  const[brandsarray,setbrandarray]=useState({
    brands:[]
    
  })

  const [brandz,setbrandz]=useState("")
  const[likes,setlikes]=useState(false)
 const[userid,setuserid]=useState({
  _id:""
 })
  const[usermail,setusermail]=useState('')
  const[usermails,setusermails]=useState('')
  const [allpost, setAllPost] = useState([]);
  const [show, setShow] = useState(false);
  const[likedatas,setlikedatas]=useState({
    email:"",
    productname:""
  })
  const[productlikedatas,setproductlikedatas]=useState({
    productname:""
  })

  // to show and close side bar
  const handleClose = () => setShow(false);
  const handleShow = (productName) => {
    setShow(productName);
  };
  const [expandedCards, setExpandedCards] = useState({});
  const[userdata,setuserdata]=useState({
    email:"",
    commentId:""
  })


// to add liked products to user schema
  const addproductlike=async(productName,usermail)=>{

   console.log(usermail);
    setlikedatas({
      ...likedatas,
      email:usermail,
      productname:productName
    })
    setproductlikedatas({
      ...productlikedatas,
      productname:productName
    })
    try{
      const {email,productname}=likedatas
      const {_id}=userid
      if(!email && !productname){
  
      }else{
        const result = await addlikedbrands(likedatas) //calling api
          
      if (result.status === 200) {
        toast.success("product liked successfully")
        const{productname}=productlikedatas
        const result =await updateproductlike(productlikedatas)  //update product like
        setlikedatas({
          email: "",
          productname: ""
        });
        setuserid({
          
          _id:""
        })
      }else{
  
        toast.error("product already likeded")
        setlikedatas({
          email: "",
          productname: ""
        });
            setuserid({
          
            _id:""
          })
      }
      }
     
  
    }catch(err){
      console.log(`ndddd ${err}`);
    }
    };


    // to add likess to comments
  const handleThumbsUpClick = async (reviewID,usermail) => {
    setlikes(!likes)
    setuserid({
      ...userid,
      _id:reviewID
    })
    setuserdata({
      ...userdata,
      email: usermail,
      commentId:reviewID
    });
    console.log(userdata);
  try{
    const {email,commentId}=userdata
    const {_id}=userid
    if(!email && !commentId){

    }else{
      const result = await Likecomment(userdata); //api call to add like
        
    if (result.status === 200) {
      toast.success("like added")
      
      const resultz =await updatelike(userid)  // update like for commemmnts
      if(result.status === 200){
        setlikes(!likes)
      }
      setuserdata({
        email: "",
        commentId: ""
      });
    }else{

      toast.error("comment already liked")
      setuserdata({
        email: "",
        commentId: ""
      });
    }
    }
   

  }catch(err){
    console.log(`ndddd ${err}`);
  }
  };
  




  useEffect(() => {
  setbrandz(sessionStorage.getItem('brandfollow'))
   
const storedBrands = JSON.parse(sessionStorage.getItem('brandfollow')) || [];
//   console.log(brandz);


  const postData = {
    brands: storedBrands
  };

  console.log(postData);
  
  // to get the followed posts so that it can display
    const fetchData = async () => {
      try {
        if(postData){
          console.log(postData);
          const result = await followedposts(postData)
          const sortedPosts = result.data.sort((a, b) => b.likes - a.likes);
          setAllPost(sortedPosts);
        }else{
          alert("dddd")
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    setusermail(sessionStorage.getItem('Usermail').replace(/['"]+/g, ''))
  console.log(usermail);
  
 

  }, [likes]);
  

  const uniqueProductNames = Array.from(new Set(allpost?.map((review) => review.productname)));
 
  return (
    <div style={{ width: '100%', alignItems: 'center' }}>
      {uniqueProductNames.map((productName) => {
        const firstReview = allpost.find((review) => review.productname === productName);
        const isExpanded = expandedCards[productName] || false;
        const img = firstReview ? `${BASEURL}/uploads/${firstReview.postimage}` : 'gg';
  
        return (
          <div key={productName} style={{width:'50%' ,marginTop: '40px', marginLeft:'60px',border: '2px solid black' }}>
            <Card key={productName} style={{ width: '100%', height: '100%' }}>
          <Card.Body>
          <Card.Title style={{fontSize:'40px'}} >{firstReview.brand}</Card.Title>
          <Card.Title >{productName}</Card.Title>
          <Card.Img style={{ height: '100%', width: '100%', border: '2px solid black' }} variant="top" src={`${BASEURL}/uploads/${firstReview.postimage}` } />
          <Card.Title style={{ height: '100%', width: '100%', border: '2px solid black',padding:'10px' }} > <h6> {firstReview ? firstReview.reviews : ''}</h6></Card.Title>
         
          <Button className='btn btn-light' style={{ border: 'none' }} onClick={() => addproductlike(productName, usermail)} > <FavoriteIcon/></Button>
          <Button className='btn btn-light' style={{ border: 'none',marginLeft:'10px' }} onClick={() => handleShow(productName)}> <CommentIcon /></Button>
          </Card.Body>
        </Card>
            {/* Offcanvas component rendered outside of the Card component */}
            <Offcanvas show={show === productName} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>{productName} Reviews</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* Render reviews here */}
                {allpost
                  .filter((review) => review.productname === productName)
                  .map((review) => (
                    <div key={review._id} style={{borderBottom:'1px solid black'}}>
                      <h5>{review.username}</h5>
                      <p>{review.reviews} {review.likes} <ThumbUpOffAltIcon onClick={() => handleThumbsUpClick(review._id, usermail)} fontSize='small' /> </p> 
                      
                    </div>
                  ))}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        );
      })}
    </div>
  );
  
}

export default Posts;