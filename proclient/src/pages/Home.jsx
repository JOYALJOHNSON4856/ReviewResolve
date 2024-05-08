import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import tittleimage from '../assets/homelogo.png'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import logoss from '../assets/Untitled_design-removebg-preview.png'
import screw from '../assets/sreww.png'
import './Home.css'
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import one from '../assets/images-removebg-preview.png'
import two from '../assets/review-icon-vector-19399937-removebg-preview.png'
import three from '../assets/solution-removebg-preview.png'
import four from '../assets/connect-removebg-preview.png'
import {  toast } from 'react-toastify';
import { sendmessageAPI } from '../services/allApi'
import { tokenauthzz } from '../Context/TokenAuth'


function Home() {
  const{istokenauth,setistokenauth}=useContext(tokenauthzz)
  const[userdata3,setuserdata3]=useState({
    messagename:"",
    messageemail:"",
    subject:"",
    message:""
  })
  const[tokens,settokens]=useState("")
  const[logout,setlogout]=useState(false)
const[loggedin,setloggedin]=useState(false)



const handlesend=async (e)=>{
  e.preventDefault()
  const {messagename,messageemail,subject,message}=userdata3;
    console.log(messagename,messageemail,subject,message);
  if(!messagename||!messageemail||!subject||!message){
    alert("fill all filed")
   }else{
    
      try {
        const result = await sendmessageAPI(userdata3);
        if (result.status === 200) {
          toast.success("message send successfully")
        } else {
          toast.error("please login to sedn message")
          console.log(result);
          console.log(result.response.data);
        }
      } catch (error) {
        console.error(error);
      }


   }

}

const handlelogout=()=>{
  sessionStorage.clear();
  setistokenauth(false)
  setlogout(!logout)
}
  useEffect(()=>{
    if( sessionStorage.getItem("token")){
      settokens(sessionStorage.getItem("token").replace(/['"]+/g, ''))
      setloggedin(true)
      console.log(tokens);
     }else{
      settokens("")
      setloggedin(false)
     }
  },[logout])
  return (
    <div>
      <div className="header" style={{position:'sticky',top:'0px',zIndex:'5'}}>
      <Header/>
      </div>
        
         <section id='sss'>
         <div className="container-fluid rounded mm ">
            <Row className='align-items-center p-5'>
                <Col sm={12} md={6}>
                    <h1 className='fw-bolder text-dark' id='rr'>Review and Resolve</h1>
                    <p>Join Review and resolve and create genuine review, find solutions, and stay connected with the brands you trust.
                        </p>
                        {
                          
                          loggedin? 
                          <div>
                         <Link to={'/dashboard'} className='btn btn-info ms-3 '>start to explore</Link>
                         <Link to={'/'} className='btn btn-info ms-3 ' onClick={handlelogout}>logout</Link>
                          </div>
                           :
                           <div className="doo">
                          <Link to={'/login'} className='btn btn-info '>Sign in</Link>
                                                   <Link to={'/register'} className='btn btn-info ms-3 '>sign up</Link>
                                                   <Link to={'/adminlogin'} className='btn btn-info ms-3 '>admin login</Link>
                                                   </div>
                        }
                     
                 
                </Col>
                <Col sm={12} md={6}>
                <img width={'700px'} height={'400px'} style={{marginLeft:'-70px'}} src={tittleimage} alt="" />

                </Col>
            </Row>
        </div>
         </section>
         <section id='abb'>
          <div className="about">
            <h1 className='fw-bolder text-dark' style={{marginTop:'50px'}} >About</h1>
              <div className="cardss mt-2">
                 <p>"Request and resolve" is an innovative platform designed to empower consumers by facilitating reviews, providing solutions to complaints, and connecting users with brands for product updates. Through Review and resolve, users can share their experiences and opinions on specific products, contributing to a transparent and informed marketplace.This review display globally according to the no of likes.each user can like others review if they are agree with it Additionally, users can submit complaints or issues along with sollution for a product, and Review & Resolve offers a collaborative space for community-sourced solutions. The platform also enables direct connect with brands, ensuring that users stay informed about product reviewsfor that conneted brand. Join Review and resolve and create genuine review, find solutions, and stay connected with the brands you trust.</p>
              </div>
              <div className="imgs" style={{backgroundImage: `url(${logoss})`,backgroundSize: 'cover', // Adjust the background size as needed
        backgroundPosition: 'center'}} >
                <div className="imgss" style={{backgroundImage: `url(${screw})`,backgroundSize: 'cover', // Adjust the background size as needed
        backgroundPosition: 'center'}} ></div>
              </div>
             
          </div>
         </section>

         <section id='ccc'>
          <div className="services">
          <h1 className='fw-bolder text-dark' style={{marginTop:'50px'}} >Services</h1>
           
           <div className="services-main">
            <div className="servicees-cards">
            <Card style={{ width: '100%',height:'100%' }}>
      <Card.Img variant="top" src={one} />
      <Card.Body>
        <Card.Title>Create review</Card.Title>
        <Card.Text>
          Create a user experience of a product and post it globally
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
            <div className="servicees-cards">
            <Card style={{ width: '100%',height:'100%' }}>
      <Card.Img variant="top" src={three} />
      <Card.Body>
        <Card.Title>Create a solution</Card.Title>
        <Card.Text>
          create sollutions for complaints of a particular product
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
            <div className="servicees-cards">    <Card style={{ width: '100%',height:'100%' }}>
      <Card.Img variant="top" src={four} />
      <Card.Body>
        <Card.Title>Connect with brands</Card.Title>
        <Card.Text>
          Connect with brand for all product review updates
        </Card.Text>
      </Card.Body>
    </Card></div>
            <div className="servicees-cards">    <Card style={{ width: '100%',height:'100%' }}>
      <Card.Img variant="top" src={two} />
      <Card.Body>
        <Card.Title>search for reviews solutions</Card.Title>
        <Card.Text>
          Search for a review or a sollution for a particular product
        </Card.Text>
      </Card.Body>
    </Card></div>
           </div>

          </div>
         </section>
       <section id='ddd'>
        <div className="contact">
        <h1 className='fw-bolder text-dark' style={{marginTop:'50px'}} >Connect with Us</h1>
          <div className="contact-card">
            <div className="address p-4 text-center">
             <h3 className='mb-3'>send us a message</h3>
              <input type="text  " placeholder='enter name' className='form-control mb-4' value={userdata3.messagename} onChange={e=>setuserdata3({...userdata3,messagename:e.target.value})} />
              <input type="email " placeholder='enter email' className='form-control mb-4' value={userdata3.messageemail} onChange={e=>setuserdata3({...userdata3,messageemail:e.target.value})} />
              <input type="text " placeholder='enter subject' className='form-control mb-4' value={userdata3.subject} onChange={e=>setuserdata3({...userdata3,subject:e.target.value})} />
              <textarea className='mb-4' id="" cols="48" rows="4" placeholder='enter meaasge' value={userdata3.message} onChange={e=>setuserdata3({...userdata3,message:e.target.value})}></textarea>
              <Button variant="contained" onClick={handlesend}>send</Button>
            </div>
            <div className="names p-5 text-center">
            <h3 className='mb-4'>Contact Us</h3>
            <h4 className='mb-4'><i class="fa-solid fa-location-dot"></i><b>Address:</b>123 Main Street, Anytown, USA 12345</h4>
            <h4 className='mb-4'><i class="fa-solid fa-phone"></i><b>Phone:</b>89848488484</h4>
            <h4 className='mb-4'><i class="fa-solid fa-envelope"></i><b>Email:</b>joyal@amail.com</h4>
            <h4 className='mb-3'><i class="fa-solid fa-link"></i><b>website:</b>review.com</h4>
            </div>
          </div>
        </div>
       </section>



    </div>
  )
}

export default Home