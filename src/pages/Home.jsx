import { useState,useEffect } from 'react'
import photo from '../assets/photo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { homeprojects } from '../service/allApi'
import Footer from '../components/Footer'




function Home() {
  const [islogin , setisLogin] = useState(false)
  const [homeProject ,sethomeProject] = useState([])
  console.log(homeProject);
  

  const gethomeproject = async()=>{
    const result= await homeprojects()
    //console.log(result);
    sethomeProject(result.data)
  }

  useEffect(()=>{
    gethomeproject()
    if(sessionStorage.getItem("token")){
      setisLogin(true)
    }else{
      setisLogin(false)
    }
  },[])

  return (
    <>
      <div className='p-5 bg-success mt-5' style={{ height: '100vh' }}>
        <div className='container-fluid '>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className='text-light' style={{ fontSize: '50px' }}>Project Fair</h1>
              <p>One stop destination for all software development projects</p>
              {islogin == false ?  <Link to={'/login'}> <button className='btn text-light p-1 mt-3'>Get Started  <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} /></button></Link> :
        <Link to={'/dashboard'}> <button className='btn text-light p-1 mt-3'>Manage Project  <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} /></button></Link>}
            </div>
            <div className="col-md-6 mt-4">
              <img className='w-100 p-3' src={photo} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* explore */}
      <div>
        <h1 className='text-center mt-5'>Explore Our Project</h1>
       
        <div className='container mt-5'>
       
           <div className="row">
           {homeProject?.map((item)=>(
            <div className="col-md-4"><ProductCard project={item}/></div>
          ))}
          </div>
        
        </div>
     
        <Link className='text-decoration-none' to={'/project'}><p className='text-center text-warning mt-5'>See more projetcs.....</p></Link>
      </div>
      <Footer/>
    </>
  )
}

export default Home