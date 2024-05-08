
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { Likecomment, addlikedbrands, allPostAPI, updatelike, updateproductlike } from '../services/allApi';
import { BASEURL } from '../services/baseurl';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {  toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Search1() {
  const[userid,setuserid]=useState({
    _id:""
   })
    const[usermail,setusermail]=useState('')

  const [expandedCards, setExpandedCards] = useState({});
  const [allpost, setAllPost] = useState([]);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const[userdata,setuserdata]=useState({
    email:"",
    commentId:""
  })
  const[likedatas,setlikedatas1]=useState({
    email:"",
    productname:""
  })
  const[productlikedatas,setproductlikedatas1]=useState({
    productname:""
  })


  const handleClose = () => setShow(false);
  const handleShow = (productName) => {
    setShow(productName);
  };



  // add likes to products

  const addproductlike2=async(productName,usermail)=>{

    console.log(usermail);
     setlikedatas1({
       ...likedatas,
       email:usermail,
       productname:productName
     })
     setproductlikedatas1({
       ...productlikedatas,
       productname:productName
     })
     try{
       const {email,productname}=likedatas
       const {_id}=userid
       if(!email && !productname){
   
       }else{
         const result = await addlikedbrands(likedatas)
           
       if (result.status === 200) {
         toast.success(`product likes`)
         const{productname}=productlikedatas
         const result =await updateproductlike(productlikedatas) // update product like
         setlikedatas1({
           email: "",
           productname: ""
         });
         setuserid({
           
           _id:""
         })
       }else{
   
         toast.error("already liked")
         setlikedatas1({
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





     // add like to comment



  const handleThumbsUpClick = async (reviewID,usermail) => {


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
      const result = await Likecomment(userdata);
        
    if (result.status === 200) {
      toast.success("like added")
      const result =await updatelike(userid) // update like for comments
      setuserdata({
        email: "",
        commentId: ""
      });
    }else{

      toast.error("comment already liked")
    }
    }
   

  }catch(err){
    console.log(`ndddd ${err}`);
  }
  };
  
  useEffect(() => {

    // fetch all data to provide users while searching
    const fetchData = async () => {
      try {
        const result = await allPostAPI();
        const sortedPosts = result.data.sort((a, b) => b.likes - a.likes);
        setAllPost(sortedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    setusermail(sessionStorage.getItem('Usermail').replace(/['"]+/g, ''))
  console.log(usermail);
  }, []);

  // handle user seach by using search query
  const handleSearch = () => {
    // Get unique product names based on searchQuery
    const uniqueProductNames = Array.from(new Set(allpost
      .filter((post) =>
        post.productname.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((post) => post.productname)
    ));
    
    const uniqueProducts = uniqueProductNames.map((productName) => {
      // Filter posts for the current product name
      const productPosts = allpost.filter((post) => post.productname === productName);
      return { productName, productPosts };
    });
  
    return uniqueProducts;
  };
  
  return (
    <div className='text-center'>
    <h3 id='trend' className='fw-bolder text-dark' style={{marginTop:'20px'}}>Search for review</h3>
    <div className="inp" style={{width:'60%',marginLeft:'20%'}}>

      <input
        type="text"
        className='form-control'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by product name..."
      />
      {searchQuery !== '' && handleSearch().map((product) => {
        const productName = product.productName;
        const productPosts = product.productPosts;

        const firstReview = allpost.find((review) => review.productname === productName);
        const isExpanded = expandedCards[productName] || false;
        const img = firstReview ? `${BASEURL}/uploads/${firstReview.postimage}` : 'gg';
        return (
          <div style={{border:'2px solid black',marginTop:'20px'}} key={productName}>
          <Card key={productName} style={{ width: '100%', height: '100%' }}>
          <Card.Body>
          <Card.Title style={{fontSize:'40px'}} >{firstReview.brand}</Card.Title>
          <Card.Title >{productName}</Card.Title>
          <Card.Img style={{ height: '100%', width: '100%', border: '2px solid black' }} variant="top" src={`${BASEURL}/uploads/${firstReview.postimage}` } />
          <Card.Title style={{ height: '100%', width: '100%', border: '2px solid black',padding:'10px' }} > <h6> {firstReview ? firstReview.reviews : ''}</h6></Card.Title>
         
          <Button className='btn btn-light' style={{ border: 'none' }} onClick={() => addproductlike2(productName, usermail)} > <FavoriteIcon/></Button>
          <Button className='btn btn-light' style={{ border: 'none',marginLeft:'10px' }} onClick={() => handleShow(productName)}> <CommentIcon /></Button>
          </Card.Body>
        </Card>
            <Offcanvas show={show === productName} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>{productName} Reviews</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
    
                {allpost
                  .filter((review) => review.productname === productName)
                  .map((review) => (
                    <div key={review._id} style={{borderBottom:'1px solid black'}}>
                      <p>{review.username}</p>
                      <p>{review.reviews} {review.likes} <ThumbUpOffAltIcon onClick={() => handleThumbsUpClick(review._id, usermail)} fontSize='small' /> </p> 
                      
                    </div>
                  ))}
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        );
      })}
    </div>
     </div>
  );
  
}

export default Search1;

