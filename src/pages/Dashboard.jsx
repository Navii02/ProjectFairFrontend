//import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'




function Dashboard() {
  const [username,setUserName]=useState([])
  //console.log(username);
  
  useEffect(()=>{
    if (sessionStorage.getItem("existingUsers")) {
      const user = JSON.parse(sessionStorage.getItem("existingUsers"))
      setUserName(user.username)
    }
  },[])
  return (
    <>
    <Header/>
      <div className='p-4 'style={{marginTop:"60px"}}>
        <h3 className='mt-3'>Welcome <span className='text-warning'>{username}</span></h3>
        <Container>
          <Row className='mt-5'>
            <Col sm={12} md={8}><Myproject/></Col>
            <Col sm={12} md={4}><Profile/></Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </>
  )
}

export default Dashboard