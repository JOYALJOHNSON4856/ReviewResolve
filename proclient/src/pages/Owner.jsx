import React, { useEffect } from 'react'
import './Home.css'
import { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import { allmessagesAPI, allusersAPI } from '../services/allApi'

import Card from 'react-bootstrap/Card';
import { BASEURL } from '../services/baseurl'
function Owner() {
    const navigate=useNavigate()
    const[logout1,setlogout1]=useState(false)
    const[loggedin1,setloggedin1]=useState(false)
    const[userss,setAlluserss]=useState([])
    const[messages,setAllmessages]=useState([])
    const handlelogout1=()=>{
      sessionStorage.clear();
      
      setlogout1(!logout1)
      navigate('/')
    }
      useEffect(()=>{

        const fetchData = async () => {
            try {
              const result = await allusersAPI();
              const results =await allmessagesAPI()
              const sortedPosts1 = result.data
              const sortedPosts2 = results.data
              
              console.log(sortedPosts2);
              setAlluserss(sortedPosts1);
              setAllmessages(sortedPosts2)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
        if(sessionStorage.getItem("token")){
           setloggedin1(true)
        }else{
          setloggedin1(false)
        }


      
      },[logout1])
  return (
    <div>
      <div className="headerz">
     <button className='btn btn-primary' style={{marginLeft:'1100px',marginTop:'15px'}} onClick={handlelogout1}>log out</button>
      </div>
      <div className="bodeis">
        <div className="text-center users" style={{ width: '100%', height: '100%', overflowY: 'auto' }} >
          <div className='bv' >
          <h3  style={{color:'white'}}>All users</h3>
          </div>
           
           {
                userss?userss.map(post => (
                    <div key={post._id} style={{  width:'90%', marginLeft: '10px' }} > 
                      <Card key={post._id} style={{ width: '100%', height: '100%',marginTop:'30px' }}>
                     <Card.Body style={{width:'100%',display:'flex'}} >
                      <div style={{flex:'1',borderRadius:'50%'}}>
                      <img src={`${BASEURL}/uploads/${post.profileimage}`} style={{height:'100%',width:'60%'}} alt="" />
                      </div>
                      <div style={{flex:'2'}}> <Card.Title style={{fontSize:'20px',width:'100%'}}>{post.username}</Card.Title>
                     <Card.Title style={{fontSize:'15px',width:'100%'}}>{post.email}</Card.Title>
                     </div>
             
                     </Card.Body>
                   </Card>
                   </div>
                 )):''}
        </div>
        <div className="messages text-center" style={{ width: '100%', height: '100%', overflowY: 'auto' }} >
        <div className='bv' >
        <h3  style={{color:'white'}}>All messages</h3>
          </div>
        {
                messages?messages.map(post => (
                    <div key={post._id} style={{  width:'90%', marginLeft: '10px' }} > 
                      <Card key={post._id} style={{ width: '100%', height: '100%',marginTop:'30px', border:'1px solid black' }}>
                     <Card.Body style={{width:'100%'}} >
                     <Card.Title style={{fontSize:'20px',width:'100%'}}>NAME:{post.messagename}</Card.Title>
                     <Card.Title style={{fontSize:'20px',width:'100%'}}>EMAIL{post.messageemail}</Card.Title>
                 
                     <div style={{width:'100%', border:'1px solid black'}}>
                     <Card.Title style={{fontSize:'20px',width:'100%'}}>{post.subject}</Card.Title>
                     <Card.Title style={{fontSize:'13px',width:'100%'}}>{post.message}</Card.Title>
                     </div>
                  
              
                     </Card.Body>
                   </Card>
                   </div>
                 )):''}
          
        </div>
      </div>
    </div>
  )
}

export default Owner
