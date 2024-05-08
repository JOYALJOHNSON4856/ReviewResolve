import React from 'react'
import  { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import Form  from "react-bootstrap/Form";
import review from '../assets/Review.png'
import 'react-toastify/dist/ReactToastify.css';
import { adminloginAPI } from '../services/allApi';

function Admins() {

    const navigate=useNavigate()


    // store input from user-------------------------------------------------------------------------
    const[userdata1,setuserdata1]=useState({
        adminemail:"",
        password:""
      })


// login funtion for admin login--------------------------------------------------------
      const adminlogin=async (e)=>{
        e.preventDefault()
        const {adminemail,password}=userdata1;
        if(!adminemail||!password){
        }else{
         const result =await adminloginAPI(userdata1);
         
         if(result.status==200){
     
           sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
           sessionStorage.setItem("token",JSON.stringify(result.data.token))
           setuserdata1({
             adminemail:"",
             password:""
           })
            navigate('/admin')
         }else{
           alert(result.response.data)
           console.log(result);
         }
        }
      }

  return (
    <div>
      <div  style={{width:'100',height:'100vh',marginTop:'40px'}} className='d-flex justify-content-center'>
<div className="container w-75">
<div className="card shadow p-5 "  id='loo'>
<div className="row align-items-center">
<div className="col-lg-6">
<img src={review} alt="" className='rounded-start w-100'/>
</div>
<div className="col-lg-6">
<div className="d-flex align-items-center flex-column">
<h2 className='fw-bolder text-light mt-2' >Review and resolve</h2>
<h4 className='fw-bolder text-info mt-2' >Admin login</h4>
<h5 className='fw-bolder mt-4 pb-3 text-light'>

</h5>
<Form className='text-light w-100'>



<Form.Group className="mb-3" controlId="formBasicEmail2" >

<Form.Control type="email" placeholder="Enter Email" value={userdata1.adminemail} onChange={e=>setuserdata1({...userdata1,adminemail:e.target.value})}     />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail3">

<Form.Control type="password" placeholder="Enter password" value={userdata1.password} onChange={e=>setuserdata1({...userdata1,password:e.target.value})}    />
</Form.Group>

<div>
<button  className='btn btn-shadow btn-success mb-2' onClick={adminlogin}>
Login
</button>

</div>


</Form>
</div>
</div>
</div>
</div>
</div>
</div>
    </div>
  )
}

export default Admins
