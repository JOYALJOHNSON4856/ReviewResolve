import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Profile.css'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,

} from 'mdb-react-ui-kit';
function Header() {
  const [openNavCentred, setOpenNavCentred] = useState(false);

  return (
    <div>
     <MDBNavbar expand='lg'id='header'>
      <MDBContainer fluid>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavCentred(!openNavCentred)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openNavCentred} center id='navbarCenteredExample' style={{height:'30px'}} className='justify-content-center'>
          <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 justify-content-center ' style={{color:'white'}}>
            <MDBNavbarItem>
            <MDBNavbarLink href='#sss'>HOME</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#abb'>ABOUT</MDBNavbarLink>
            </MDBNavbarItem>
            
            <MDBNavbarItem>
            <MDBNavbarLink href='#ccc'>SERVICES</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBNavbarLink href='#ddd'>CONTACT</MDBNavbarLink>
            </MDBNavbarItem>
            {/* <MDBNavbarItem>
             <Link className='btn' to={'/login'}>login</Link>
            </MDBNavbarItem> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
  )
}

export default Header