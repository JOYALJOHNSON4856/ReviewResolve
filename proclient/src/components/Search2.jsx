import React, { useEffect, useState } from 'react';
import './Dashes.css';
import { Likesollution, allsollutionsAPI, updatesollutionlike } from '../services/allApi';
import Modal from 'react-bootstrap/Modal';
import { styled } from '@mui/material/styles';
import Card from 'react-bootstrap/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Button from 'react-bootstrap/Button';
import { BASEURL } from '../services/baseurl';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {  toast } from 'react-toastify';
function Search2() {


  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (product) =>{
    setShow1(product);
  } 
    const[usermail,setusermail]=useState("")
    const [solutions, setSolutions] = useState([]);
    const[likes,setlikes]=useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false); // State to toggle showing results
    const[sollutiondata,setsollutiondata]=useState({
        email:"",
        productid:""
    })
    const[userid,setuserid]=useState({
        _id:""
       })
    const addsLikesollution = async (reviewID,usermail) => {
        setuserid({
            ...userid,
            _id:reviewID
          })
        setlikes(true)
        setsollutiondata({
          ...sollutiondata,
          email: usermail,
          productid:reviewID
        });
        console.log(sollutiondata);
      try{
        const {email,productid}=sollutiondata
        const {_id}=userid
        if(!email && !productid){
    
        }else{
          const result = await Likesollution(sollutiondata);
            
        if (result.status === 200) {
          toast.success("sollution liked successfully")
          
          const result =await updatesollutionlike(userid)
          setsollutiondata({
            email: "",
            productid: ""
          });
          setuserid({
          
            _id:""
          })
        }else{
    
          toast.error("sollution already liked")
          setsollutiondata({
            email: "",
            productid: ""
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











    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await allsollutionsAPI();
                const sortedPosts = result.data.sort((a, b) => b.solutionlikes - a.solutionlikes);
                console.log(sortedPosts);
                setSolutions(sortedPosts); // Update state with sorted posts
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setusermail(sessionStorage.getItem('Usermail').replace(/['"]+/g, ''))
        console.log(usermail);
    }, []); // Empty dependency array to ensure useEffect runs only once

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowResults(e.target.value.trim() !== ''); // Set showResults to true if search term is not empty
    };

    // Function to filter solutions based on complaint containing search term
    const filteredSolutions = solutions.filter(solution => {
        return solution.complaint.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className='text-center' >
         <h3 id='trend' className='fw-bolder text-dark' style={{marginTop:'20px'}}>Search for review</h3>
        <div className="inp" style={{width:'60%',marginLeft:'20%'}}>
            <input
            className='form-control'
                type="text"
                placeholder="Search for a keyword in complaint"
                value={searchTerm}
                onChange={handleSearchChange} 
            />
            {showResults && ( // Only render solutions if showResults is true
                <div>
                    {filteredSolutions.map((product) => {
                        const img = product ? `${BASEURL}/uploads/${product.productimage}` : 'gg';
                        const video= product ? `${BASEURL}/uploads/${product.productvideo}` : 'gg';
                        return (
                            <div key={product.username}>
                      
         <Card key={product} style={{ width: '100%', height: '100%' }}>
          <Card.Body >
          <Card.Title >{product.brandname}</Card.Title>
          <Card.Title >{product.productnames}</Card.Title>
          <Card.Img style={{ height: '100%', width: '100%', border: '2px solid black' }} variant="top" src={`${BASEURL}/uploads/${product.productimage}` } />
          <Card.Title >{product.complaint}</Card.Title>
          <Button className='btn btn-light' style={{ border: 'none' }} onClick={() => addsLikesollution(product._id, usermail)} > <FavoriteIcon/></Button>
          <Button className='btn btn-light' style={{ border: 'none',marginLeft:'20px' }} onClick={() => handleShow1(product)}>view</Button>
          <h6 style={{marginTop:'9px'}}>LIKES:{product.solutionlikes}</h6>
          </Card.Body>
        </Card>
  <Modal
        show={show1===product}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.complaint}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <video controls autoPlay style={{width:'100%',height:'40%'}} src={`${BASEURL}/uploads/${product.productvideo}` }></video>
      
        </Modal.Body>
        <Modal.Body>
           <p>{product.description}</p>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        </div>
    );
}

export default Search2;


