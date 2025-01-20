import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { loginResponseContext } from '../context/ContextShare';

function Header() {
    const {setLoginResponse}=useContext(loginResponseContext)
    const [token,setToken]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setToken(sessionStorage.getItem('token'));
        }

    },[])
    const handleLogout=()=>{
        if(token){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('existingUsers')
           
            navigate("/")
            setLoginResponse(false);
        }
    }
    return (
        <>
            <div>
                <Navbar className="bg-success d-flex align-items-center" fixed='top'>
                    <Container>
                        <Navbar.Brand>
                            <Link to={'/'} className='text-decoration-none'> <span className='text-light fs-3'><FontAwesomeIcon icon={faStackOverflow} size="xl" style={{color: "#ffffff",}} className='me-4' />Project Fair</span></Link>
                        </Navbar.Brand>
{token&&                       <button onClick={handleLogout} className='btn btn-warning rounded'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button> 
}                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header