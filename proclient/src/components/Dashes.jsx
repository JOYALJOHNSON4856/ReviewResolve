
import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import './Dashes.css'
import { addfollowedbrands, allPostAPI } from '../services/allApi';
import { BASEURL } from '../services/baseurl';
function Dashes() {
  const [postzz, setPostzz] = useState([]);
  const [trend,settrend]=useState([])
  const[brands,setbrands]=useState({
    email:"",
    brandname:""
  })
  const[usermails,setusermails]=useState('')
  

  // to add follwed brands in user scheme--------------------------------------------------------------
  const addbrandss = async (brandnamess) => {

  
    setbrands({
      ...brands,
      email: usermails,
      brandname:brandnamess
    });
   console.log(brands);
    try{
      const {email,brandname}=brands
      if(!email && !brandname){
           
      }else{
        const result = await addfollowedbrands(brands);
          
      if (result.status === 200) {
        toast.success(`successfully followed ${brandname}`);
        const currentBrands = JSON.parse(sessionStorage.getItem('brandfollow')) || [];

const newValue = brandname; 
currentBrands.push(newValue);
sessionStorage.setItem('brandfollow', JSON.stringify(currentBrands));
        setbrands({
          email: "",
          brandname: ""
        });
      }else{
  
        toast.error(`you are already followed ${brandname}`);
        setbrands({
          email: "",
          brandname: ""
        });
      }
      }
     
  
    }catch(err){
      console.log(`ndddd ${err}`);
    }
    };
    

// ----------------------------------------------------------------------------------------------------------------------------------

  

useEffect(()=>{

  setusermails(sessionStorage.getItem('Usermail').replace(/['"]+/g, ''))
 
  // fetching all uploaded posts--------------------------------------------------------------------------------
  const fetchData = async () => {
    try {
      const result = await allPostAPI();
      const sortedPosts = result.data.sort((a, b) => b.productlikes - a.productlikes);
      const filteredproducts=sortedPosts.filter((post, index) => result.data.findIndex(p => p.productname === post.productname) === index);
        const filteredPosts = result.data.filter((post, index) => result.data.findIndex(p => p.brand === post.brand) === index);
        setPostzz(filteredPosts);
        settrend(filteredproducts)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  
},[])

  return (
    <div  className=' dashmain text-center'>
        <h1 className='fw-bolder text-dark' id='trend'>Trending poducts</h1>
       
{/* mapping trending products lists */}

        <div className='trend' style={{width:'100%',display:'flex'}}>
  {trend?trend.slice(0, 5).map(post => (
    <div key={post._id} style={{width:'30%',marginLeft:'10px'}}>
      <Card key={post._id} style={{ width: '100%', height: '100%',padding:'5px',border:'2px solid black' }}>
        <Card.Img style={{height:'100%',width:'100%',border:'2px solid black'}} variant="top" src={`${BASEURL}/uploads/${post.postimage}` } />
        <Card.Body style={{border:'2px solid black'}}>
          <Card.Title style={{fontSize:'20px'}}>{post.brand}</Card.Title>
          <Card.Title style={{fontSize:'15px'}}>{post.productname}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )):'<h4>noting to display</h4>'}
</div>

        <h1 className='fw-bolder text-dark' id='trend'>Connect with brands</h1>
        <div style={{ width: '100%', height: '100%', overflowX: 'auto', display: 'flex' }}>

          {/* mapping brands for */}
  {postzz?postzz.map(post => (
    <div key={post._id} style={{ flex: '0 0 auto', width:'20%', marginLeft: '10px' }}>
      <Card style={{ width: '100%', height: '100%',padding:'5px',border:'2px solid black' }}>
        <Card.Img style={{ height: '100%', width: '100%', border: '2px solid black' }} variant="top" src={`${BASEURL}/uploads/${post.postimage}`} />
        <Card.Body style={{border:'2px solid black'}}>
          <Card.Title>{post.brand}</Card.Title>
          <button style={{border:'1px solid black'}} onClick={() => addbrandss(post.brand)} className='btn btn-secondary'>connect</button>
        </Card.Body>
      </Card>
    </div>
  )):'<h4>noting to display</h4>'}
</div>




    </div>
  )
}

export default Dashes
