import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import './Profile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {  toast } from 'react-toastify';

import { deletepostAPI, seperatecomments, seperatesollution, seperateusers, updateprofileAPI } from '../services/allApi';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import { BASEURL } from '../services/baseurl';

function Profile() {


  const [show1, setShow1] = useState(false);

  // show and close modal
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (post) =>{
    setShow1(post);
  } 


const [deleteitem,setdeleteitem]=useState({
  deleteid:""
})
  const[del,setdel]=useState(false)
  const [itemData,setitemData]=useState([])
  const [itemData2,setitemData2]=useState([])
  const [itemData3,setitemData3]=useState([])
  const[tokens,settokens]=useState("")
  const[id,setid]=useState("")
  const[userids,setuserids]=useState({
    userId:""
  })
  const[mailids,setmailids]=useState({
    email:""
  })
  const[profile,setprofile]=useState({
    postimage:"",
  })

  // upload profile picture for user
  const handleporfile = async (e) => {
    e.preventDefault();
    const{postimage}=profile;
    if(!postimage){
      toast.warning("please select a image")
    }else{
      const reqBody = new FormData();
      reqBody.append("postimage", postimage);
      if(tokens){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${tokens}`
        }
    try {
      console.log(reqBody);
      const result = await updateprofileAPI(reqBody,reqHeader);
      if (result.status === 200) {
        console.log(result.data);
        toast.success("profile updated successfully")
        setdel(!del)
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  }
}


// delete user comments

const handledelete= async(postid)=>{
  setdeleteitem({
    ...deleteitem,
    deleteid:postid
  })
   try{
    const{deleteid}=deleteitem
    if(!deleteid ){
    }else{
      const result = await deletepostAPI(deleteitem);
        
    if (result.status === 200) {
       toast.success("comment deleted")
      setdel(!del)
    }
   }
  }catch(err){
    console.log(`ndddd ${err}`);
  }
 }
  useEffect(()=>{
    if( sessionStorage.getItem("token")){
     settokens(sessionStorage.getItem("token").replace(/['"]+/g, ''))
  
     console.log(tokens);
    }else{
     settokens("")
    }
    if( sessionStorage.getItem("userid")){
      setuserids({ ...userids, userId: JSON.parse(sessionStorage.getItem("userid")) });
      setmailids({...mailids,email:JSON.parse(sessionStorage.getItem("Usermail"))})
      console.log(userids);
     }else{
      settokens("")
     }


     // fetch datas to display in profile like profile details,works,comments
     const fetchData = async () => {
      try {
  
        if(tokens){
          const reqHeader = {
           
            "Authorization": `Bearer ${tokens}`
          } 
          const resultz= await seperateusers(reqHeader)
          const result = await seperatesollution(reqHeader);
          const results = await seperatecomments(reqHeader); 
           
          const sortedPosts = result.data.sort((a, b) => b.solutionlikes - a.solutionlikes);
          const sortedcomments = results.data.sort((a, b) => b.likes - a.likes);
          setitemData( sortedPosts)
          setitemData2( sortedcomments)
          setitemData3(resultz.data ) 
          console.log(sortedPosts);
          console.log(sortedcomments);
          console.log(itemData3); 
         
        
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  },[tokens,del])



  return (
    <div className='text-center profilemain'>
         <h1 className='fw-bolder text-dark'>Profile information</h1>
         {Array.isArray(itemData3) && itemData3.map(postz => (
      <div key={postz._id} style={{width:'60%',height:'200px',backgroundColor:'blue',display:'flex',marginLeft:'190px'}}  >
        <div className="proimg" style={{width:'30%',height:'100%'}}>
          <label htmlFor='im' style={{width:'100%',height:'100%'}}>
            <img src={`${BASEURL}/uploads/${postz.profileimage}`} style={{height:'100%',width:'100%'}} alt="" />
          </label>
        </div>
        <div className="text-center names" style={{width:'70%',height:'100%'}}>
          <h4 className='mt-3'>USERNAME: {postz.username}</h4>
          <h4>EMAIL: {postz.email}</h4>
          <p>NO OF BRANDS FOLLOWED: {(postz.brands || []).length}</p> {/* Use empty array fallback to handle undefined brands */}
          <input id='im' style={{display:'none'}} type="file" onChange={e => setprofile({...profile, postimage:e.target.files[0]})} />
          <button className='btn btn-secondary' onClick={handleporfile}>Upload Image</button>
        </div>
      </div>
    ))}
       <div className="myworks">
        <h1 className='fw-bolder text-dark'> works</h1>
  <div style={{ width: '100%', height: '100%', overflowX: 'auto', display: 'flex' }}>
        {itemData?itemData.map(post => (
           <div key={post._id} style={{ flex: '0 0 auto', width:'20%', marginLeft: '10px' }}>
        <Card key={post._id} style={{ width: '100%', height: '100%',border:'2px solid black',padding:'5px' }}>
          <Card.Img style={{border:'2px solid black,',height:'100%'}} variant="top" src={`${BASEURL}/uploads/${post.productimage}` } />
          <Card.Body>
          <Card.Title>{post.productnames}</Card.Title>
          <button className='btn btn-secondary' onClick={()=>handleShow1(post)}>show</button>
          </Card.Body>
        </Card>
        <Modal
        show={show1===post}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{post.complaint}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body style={{width:'100%',height:'50%'}}>
          <video controls autoPlay style={{width:'100%',height:'40%'}} src={`${BASEURL}/uploads/${post.productvideo}` }></video>
       <div style={{width:'100%',height:'100%'}}><p >{post.description}</p></div>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )):<div><h4>noting to display</h4></div>}
</div>


       <div className="listss" style={{width:'100%'}}>
       <h1 className='fw-bolder text-dark'> Reviews</h1>
      {itemData2.map(post => (
         <div key={post._id} style={{width:'60%'}} > 
           <Card key={post._id} style={{ width: '100%', height: '100%',marginBottom:'30px' }}>
          <Card.Body style={{width:'100%'}} >
          <Card.Title style={{fontSize:'20px',width:'100%'}}>{post.productname}</Card.Title>
          <Card.Title style={{fontSize:'15px',width:'100%'}}>{post.brand}</Card.Title>
          <Card.Title style={{fontSize:'10px',width:'100%'}}>{post.reviews}</Card.Title>
          <Card.Title  style={{fontSize:'10px'}}><p>no of likes {post.likes}</p></Card.Title>

          <button style={{visibility:'none',border:'none',marginLeft:'500px',height:'0px'}} onClick={()=>handledelete(post._id)}><DeleteIcon style={{height:'15px'}}/></button>
          </Card.Body>
        </Card>
        </div>
      ))}
    
       </div>
    </div>
    </div>
  )
}

export default Profile
