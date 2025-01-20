import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogiApi, requestApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/ContextShare'

function Auth({register}) {
 const {setLoginResponse}=useContext(loginResponseContext)
  const navigate=useNavigate()

  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);
 

  const handleRegister= async ()=>{
    const {username, email, password}=userDetails
    if(!username||!email||!password){
      toast.info('please fill the form')
    }else{
      const result = await requestApi(userDetails)
      console.log(result.status);
      if(result.status== 200){
        toast.success("Registration successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate("/login")
      }
      else if(result.status==406){
        toast.error(result.response.status)
      }
      else{
        toast.error("Something went wrong")
      }
      
    }
  }
  const handleLogin = async()=> {
    const {email,password} = userDetails;
    if (!email || !password) {
     toast.info('fill the form completely')
    }else{
     const result = await LogiApi( {email,password})
    
     if(result.status ==200){
       console.log(result);
       toast.success('Login successful')
       setUserDetails({
         username:"",
         email:"",
         password:""
        })
        setLoginResponse(true)

        sessionStorage.setItem("existingUsers", JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token",result.data.token)

        setTimeout(()=>{
         navigate("/")
        },2000)

        
      

     }else if (result.status == 406) {
       toast.error(result.response.status)

     }else{
       toast.error('Something went wrong')
     }
    }
}
  
  

  return (
    <>
      <div className='container-fluid mt-5'>
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h3 className='text-warning'>Back to home</h3>
            <div className="row  bg-success">
              <div className="col-md-6 p-5">
                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-100' />
              </div>
              <div className="col-md-6 p-5">
                <div className='mt-5 text-light'>
                  <h3 className='text-center'>
                    <FontAwesomeIcon icon={faStackOverflow} className=' me-2' />
                    Project Fair
                  </h3>
                  {!register? <p className='text-center'>Sign In to your Account</p>
                  :
                  <p className='text-center'>Sign Up to your Account</p>}
                </div>
                <div className=''>
                 {register && <div>
                    <input type="text" placeholder='Username' className='form-control rounded-0 mt-4' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>
                  </div>}
                  <div>
                    <input type="Email " placeholder='Email ID' className='form-control rounded-0 mt-4' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
                  </div>
                  <div>
                  <input type="password" placeholder='password' className='form-control rounded-0 mt-2 ' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>
                  </div>
                  
                  {!register? <div>
                    <button className='btn btn-warning form-control rounded-0 mt-2' onClick={handleLogin}>Login</button>
                    <p className='mt-4 text-light'>New User? Click Here to <Link  to={'/register'} className='text-danger text-decoration-none'>Register</Link></p>
                  </div>
                    :
                  <div>
                    <button className='btn btn-warning form-control rounded-0 mt-2'onClick={handleRegister}>Register</button>
                    <p className='mt-4 text-light'>Already a User? Click Here to <Link  to={'/login' }className='text-danger text-decoration-none'>Login</Link></p>
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="colored"/>
    </>
  )
}

export default Auth