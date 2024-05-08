
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Dashes.css'
import { allPostAPI, createPostAPI } from '../services/allApi';
import {  toast } from 'react-toastify';
function Review() {
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [UniqueProductss,  setUniqueProductss] = useState([]);
 
  const[options,setoptions]=useState([])
  
  const[token,settoken]=useState("")
  const[tokens,settokens]=useState("")
  const[user,setuser]=useState("")
  const[usernames,setusername]=useState({
    username:""
  })
  const[post,setpost]=useState({
    brand:"",
    productname:"",
    postimage:"",
    reviews:""
  })

  useEffect(()=>{
    if( sessionStorage.getItem("token")){
     settoken(sessionStorage.getItem("token").replace(/['"]+/g, ''))
  
     console.log(token);
    }else{
     settoken("")
    }
    if( sessionStorage.getItem("existingUser")){
      const usermails=JSON.parse(sessionStorage.getItem("existingUser"))
      setuser(usermails.username)
      setusername({...usernames,username:user})
      console.log(user);
      console.log(tokens);
     }else{
      settokens("")
      setuser("")
     }
     


  },[token])


  useEffect(() => {
    //  to fetch all post and extract brandname and product name to create datalist
    const fetchData = async () => {
      try {
        const response = await allPostAPI();
        const data = response.data;
        console.log("Fetched data:", data);
        setoptions(data);
  
        const brands = new Set(data.map(product => product.brand));
        const productss=new Set(data.map(product => product.productname));
        console.log("Unique brands:", brands);
        setUniqueBrands([...brands]);
        setUniqueProductss([...productss]);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    fetchData();
  }, []);
  



  // to upload review from userr
  const handlePost = async (e) => {
    e.preventDefault();
    console.log(token);

    const { brand, productname, postimage, reviews } = post;
    const{username }=usernames
    if (!username ||!brand || !productname || !postimage || !reviews) {
      toast.warning("Please fill all fields");
      return; // Return early if fields are not filled
    }else{


      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("brand", brand);
      reqBody.append("productname", productname);
      reqBody.append("postimage", postimage);
      reqBody.append("reviews", reviews);
    
      if(token){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      console.log(reqBody);
      console.log(reqHeader);
        try {
          const result = await createPostAPI(reqBody, reqHeader);
          if (result.status === 200) {
            console.log(result.data);
            toast.success("Successfully posted review");
            setpost({
              brand:"",
              productname:"",
              postimage:"",
              reviews:""
            })
          } else {
            console.log(result);
            console.log(result.response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  

  };
  




 



  return (
    <div className='text-center d-flex flex-column justify-content-center '>
        <h3 className='fw-bolder text-dark' id='trend'>Post your Reviews</h3>
        <div className="border border-dark p-5 review" style={{width:'70%',marginLeft:'13%'}}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Brandname</Form.Label>
  <Form.Control 
    list='options-list' 
    type="text" 
    placeholder="Enter brand name" 
    value={post.brand} 
    onChange={e => setpost({...post, brand: e.target.value.toUpperCase()})} 
  />
  <datalist id="options-list">
    {uniqueBrands?.map((brand, index) => (
      <option key={index} value={brand} />
    ))}
  </datalist>
</Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product name</Form.Label>
        <Form.Control list='options-list2' type="text" placeholder="enter Product name" value={post.productname} onChange={e=>setpost({...post,productname:e.target.value.toUpperCase()})} />
        <datalist id="options-list2">
    {UniqueProductss?.map((brand, index) => (
      <option key={index} value={brand} />
    ))}
  </datalist>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload image</Form.Label>
        <Form.Control type="file"  onChange={e=>setpost({...post,postimage:e.target.files[0]})} />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter your experience</Form.Label>
        <Form.Control as="textarea" rows={3} value={post.reviews} onChange={e=>setpost({...post,reviews:e.target.value})} />
      </Form.Group>
      <button className='btn btn-info' onClick={handlePost}>submit</button>
    </Form>
        </div>
    
    </div>
  )
}

export default Review
