import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Profile.css'
import { Link } from 'react-router-dom';
function Dashhead() {

  const[username,setusername]=useState("")
  
   useEffect(()=>{
      if(sessionStorage.getItem("existingUser")){
        setusername(JSON.parse(sessionStorage.getItem("existingUser")).username)
        
      }
   },[])
  return (
   
    <div id='vvv'>
       <h4 className='mt-2' style={{marginLeft:'20px'}}> <i class="fa-solid fa-user-tie me-3"></i>{username}</h4>
    </div>
  )
}

export default Dashhead



