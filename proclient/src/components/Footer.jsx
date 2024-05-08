import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div >
          <MDBFooter bgColor='light' className='text-center text-lg-left' >
      <div className='text-center p-3 h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://review & resolve.com/'>
        review & resolve.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer