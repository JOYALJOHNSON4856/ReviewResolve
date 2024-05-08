import React, { useEffect, useState } from 'react'
import Dashhead from '../components/Dashhead'
import './Dashboard.css'
import Dashes from '../components/Dashes'
import Profile from '../components/Profile'
import Search1 from '../components/Search1'
import Search2 from '../components/Search2'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Review from '../components/Review'
import Sollutions from '../components/Sollutions'
import Posts from '../components/Posts'
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ForumIcon from '@mui/icons-material/Forum';
function Dashboard() {
  const navigate=useNavigate()
  const [selectedComponent, setSelectedComponent] = useState(<Dashes/>);
  // Function to handle button clicks and set the selected component
  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    console.log(selectedComponent);
  };
  const handleClick = () => {
    navigate('/review');
  };
  const handleClick1 = () => {
    navigate('/sollutions');
  };
  return (
    <div className='dashboard'>
       <Dashhead/>
   <div className="parts" style={{width:'100%',display:'flex'}}>
    <div className="part1" style={{width:'21%'}}>
    <div  style={({ height: "100vh",width:'20px' }, { display: "flex" })}>
      <Sidebar id="app" style={{ height: "100vh",width:'80%' }}>
        <Menu>

          <MenuItem icon={<HomeOutlinedIcon />} onClick={() => handleButtonClick(<Dashes/>)}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => handleButtonClick(<Profile/>)}  >Profile</MenuItem>
          <MenuItem icon={<SearchIcon/>} onClick={() => handleButtonClick(<Search1/>)} >Search review</MenuItem>
          <MenuItem icon={<SearchIcon />}  onClick={() => handleButtonClick(<Search2/>)}>solutions</MenuItem>
          <MenuItem icon={<CreateIcon />} onClick={() => handleButtonClick(<Review/>)}>create review</MenuItem>
          <MenuItem icon={<AddCircleIcon  />} onClick={() => handleButtonClick(<Sollutions/>)}>create solution</MenuItem>
          <MenuItem icon={<ForumIcon />} onClick={() => handleButtonClick(<Posts/>)}>my feeds</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>
      </main>
    </div>

    </div>
    <div className="part2" style={{width:'80%',height:'100vh',overflow:'scroll'}}>


    {selectedComponent}
     
  
     
    
    </div>


   </div>
       
   

    
    </div>
  )
}

export default Dashboard