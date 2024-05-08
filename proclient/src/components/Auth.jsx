
import React, { useContext, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import Form  from "react-bootstrap/Form";
import review from '../assets/Review.png'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Profile.css'
import { loginAPI, registerAPI } from '../services/allApi';
import { tokenauthzz } from '../Context/TokenAuth';

function Auth({register}) {
  const{istokenauth,setistokenauth}=useContext(tokenauthzz)
  const navigate=useNavigate()
// store input values from user------------------------------------------------------------------------------------
  const[userdata,setuserdata]=useState({
    username:"",
    email:"",
    password:""
  })
//------------------------------------------------------------------------------------------------------------------


  // for register----------------------------------------------------------------------------------------------------
  const handleRegister=async (e)=>{
   e.preventDefault()
   const {username,email,password}=userdata;
   if(!username||!email||!password){
     toast.warning("Please enter all fileds")
   }else{
    const result =await registerAPI(userdata);
    
    if(result.status==200){
      console.log(result);
      toast.success(`${result.data.username} registered successfully`)
      setuserdata({
        username:"",
        email:"",
        password:""
      })
       navigate('/login')
    }else{
      alert(result.response.data)
    }
   }
  }
//------------------------------------------------------------------------------------------------------------
 // for userlogin----------------------------------------------------------------------------------------------------
const handleLogin=async (e)=>{
  e.preventDefault()
  const {email,password}=userdata;
  if(!email||!password){
   }else{
    const result =await loginAPI(userdata);
    
    if(result.status==200){

      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("Usermail",JSON.stringify(result.data.existingUser.email))
      sessionStorage.setItem("brandfollow",JSON.stringify(result.data.existingUser.brands))
      sessionStorage.setItem("userid",JSON.stringify(result.data.existingUser._id))
      sessionStorage.setItem("likedComments",JSON.stringify(result.data.existingUser.likedComments ))
      sessionStorage.setItem("token",JSON.stringify(result.data.token))
      setistokenauth(true)
      setuserdata({
        email:"",
        password:""
      })
       navigate('/')
    }else{
      alert(result.response.data)
      console.log(result);
    }
   }
}
// check whether it is register or login--------------------------------------------------
const isRegisterForm=register?true:false
  return (

    <>
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
<h5 className='fw-bolder mt-4 pb-3 text-light'>
{
isRegisterForm?"Sign up to your account":"sign in to your account"
}
</h5>
<Form className='text-light w-100'>
{
isRegisterForm&&
<Form.Group className="mb-3" controlId="formBasicEmail1">

<Form.Control type="text" placeholder="Enter Username" value={userdata.username} onChange={e=>setuserdata({...userdata,username:e.target.value})} />
</Form.Group>
}
<Form.Group className="mb-3" controlId="formBasicEmail2" >

<Form.Control type="email" placeholder="Enter Email" value={userdata.email} onChange={e=>setuserdata({...userdata,email:e.target.value})}   />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail3">

<Form.Control type="password" placeholder="Enter password" value={userdata.password} onChange={e=>setuserdata({...userdata,password:e.target.value})}  />
</Form.Group>
{
isRegisterForm?
<div>
<button className='btn btn-shadow btn-primary mb-2' onClick={handleRegister}>

Register
</button>
<p>Already have an account ?click here to<Link to={"/login"} style={{textDecoration:'none',color:'blue'}}>Login</Link></p>

</div>:
<div>
<button  className='btn btn-shadow btn-success mb-2' onClick={handleLogin}>
Login
</button>
<p>Create an account click here to<Link to={"/register"} style={{textDecoration:'none',color:'red'}}>Register</Link></p>

</div>

}

</Form>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  )
}

export default Auth