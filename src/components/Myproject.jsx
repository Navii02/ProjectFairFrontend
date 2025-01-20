import  { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { userprojects,deleteproject } from '../service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext } from '../context/ContextShare'


function Myproject() {
    const [userProject,setUserProject]=useState([])
     const {addResponse}=useContext(addResponseContext)
     const [removestatus,setRemoveStatus]=useState("")

    const userDetails = async () => {
        if (sessionStorage.getItem("token")) {
            const token =sessionStorage.getItem("token");
        
          const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const result = await userprojects(reqHeader);
          //console.log(result);
          setUserProject(result.data);
        }
      };
      const handleDelete = async (id)=>{
        if (sessionStorage.getItem("token")) {
          const token =sessionStorage.getItem("token");
      
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await deleteproject(id,reqHeader);
        //console.log(result);
        if(result.status==200) {
          alert("Data deleted successfully")
          setRemoveStatus(result)
        }
        else{
          alert("Something went wrong")
        }
      }
      }

      useEffect(()=>{
        userDetails()
      },[addResponse,removestatus])

      console.log(userProject);
      
  return (
    <div className=' p-5  shadow-lg'>
        <div className='d-flex justify-content-between'>
        <h3>My Project</h3>
        <Addproject />

        </div>
        {userProject?.length>0?
        userProject?.map((item)=>(
        <div className='p-3 bg-light d-flex align-items-center justify-content-between rounded mt-3'>
            <h4>{item.title}</h4>
            <div className='d-flex '>
                <Edit project={item}/>
                <Link to={item.github}><FontAwesomeIcon icon={faGithub} size="lg" className='me-4 text-warning' /></Link>
                <Link to={item.website}><FontAwesomeIcon icon={faGlobe} size="lg" className='me-4 text-success' /></Link>
                <FontAwesomeIcon onClick={(e)=>handleDelete(item._id)} icon={faTrash} size="lg" className='me-4 text-danger' />
            </div>
        </div>
             )):
       <h4 className='text-center text-warning mt-5'>No Projects Added</h4>}
    </div>
  )
}

export default Myproject