import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Dashes.css'
import { allsollutionsAPI, createvideoAPI } from '../services/allApi';
import {  toast } from 'react-toastify';
function Sollutions() {
  const[tokens,settokens]=useState("")
  const[user,setuser]=useState("")
  const [uniqueBrands1, setUniqueBrands1] = useState([]);
  const [UniqueProductss1,  setUniqueProductss1] = useState([]);
 
  const[options1,setoptions1]=useState([])
  const[usernames,setusername]=useState({
    username:""
  })
  const[solutions,setsolutions]=useState({
    brandname:"",
    productnames:"",
    complaint:"",
    productimage:"",
    productvideo:"",
    description:""
  })


  const addSollutions = async (e) => {
    e.preventDefault();
    console.log(tokens);
    
   console.log(solutions);
    const { brandname,productnames,complaint,productimage,productvideo,description } =solutions;
    const{username }=usernames
    if (!username || !brandname || !productnames || !complaint||!productimage || !productvideo || !description ) {
      toast.warning("please fill all fields")
      return; // Return early if fields are not filled
    }else{


      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("brandname", brandname);
      reqBody.append("productnames", productnames);
      reqBody.append("complaint", complaint);
      reqBody.append("productimage", productimage);
      reqBody.append("productvideo",productvideo);
      reqBody.append("description", description);
    
      if(tokens){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${tokens}`
        }
      console.log(reqBody);
      console.log(reqHeader);
        try {
          const result = await createvideoAPI(reqBody, reqHeader);
          if (result.status === 200) {
            toast.success("successfully created sollution")
            setsolutions({
              brandname:"",
              productnames:"",
              complaint:"",
              productimage:"",
              productvideo:"",
              description:""
            })
            console.log(result.data);
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




  useEffect(() => {
    //  to fetch all post and extract brandname and product name to create datalist
    const fetchData = async () => {
      try {
        const response1 = await allsollutionsAPI();
        const data1 = response1.data;
        console.log("Fetched data:", data1);
        setoptions1(data1);
  
        const brands1 = new Set(data1.map(product => product.brandname));
        const productss1=new Set(data1.map(product => product.productnames));
        console.log("Unique brands:", brands1);
        setUniqueBrands1([...brands1]);
        setUniqueProductss1([...productss1]);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(()=>{
    if( sessionStorage.getItem("token")){
     settokens(sessionStorage.getItem("token").replace(/['"]+/g, ''))
  
     console.log(tokens);
    }else{
     settokens("")
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

  },[tokens])














  return (
    <div className='text-center d-flex flex-column justify-content-center '>
    <h3 className='fw-bolder text-dark' id='trend'>Post your Sollutions</h3>
    <div className="border border-dark p-5 review" style={{width:'70%',height:'100%',marginLeft:'13%'}}>
    <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Brandname</Form.Label>
    <Form.Control  id="options-list1" type="text" placeholder="enter brand name" value={solutions.brandname} onChange={e=>setsolutions({...solutions,brandname:e.target.value.toUpperCase()})} />
    <datalist id="options-list1">
    {uniqueBrands1?.map((brand, index) => (
      <option key={index} value={brand} />
    ))}
  </datalist>
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Product name</Form.Label>
    <Form.Control id="options-list2"  type="text" placeholder="enter Product name" value={solutions.productnames} onChange={e=>setsolutions({...solutions,productnames:e.target.value.toUpperCase()})} />
    <datalist id="options-list2">
    {UniqueProductss1?.map((brand, index) => (
      <option key={index} value={brand} />
    ))}
  </datalist>
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Complaint name</Form.Label>
    <Form.Control type="text" placeholder="enter complaint name" value={solutions.complaint} onChange={e=>setsolutions({...solutions,complaint:e.target.value})}  />
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload image</Form.Label>
    <Form.Control type="file" onChange={e=>setsolutions({...solutions,productimage:e.target.files[0]})} />
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload video</Form.Label>
    <Form.Control type="file" onChange={e=>setsolutions({...solutions,productvideo:e.target.files[0]})} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Complaint description</Form.Label>
    <Form.Control as="textarea" rows={3} value={solutions.description} onChange={e=>setsolutions({...solutions,description:e.target.value})} />
  </Form.Group>
  <button className='btn btn-info' onClick={ addSollutions}>submit</button>
</Form>
    </div>

</div>
  )
}

export default Sollutions
