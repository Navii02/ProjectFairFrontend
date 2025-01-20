import  { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addProjectApi } from '../service/allApi';
import { addResponseContext } from '../context/ContextShare';

function Addproject() {
    const {setAddResponse}=useContext(addResponseContext)
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [token,setToken]=useState("")
    console.log(token);
    const [key,setKey]=useState(1)
    

    const [projectDetails,setProjectDetails]=useState({
        title:"",
        language:"",
        github:"",
        website:"",
        overview:"",
        projectImage:""
    })
    console.log(projectDetails);
    const handleFile=(e)=>{
        //console.log(e.target.files[0]);
        setProjectDetails({...projectDetails,projectImage:e.target.files[0]})
    }
    useEffect(()=>{
        if(projectDetails.projectImage){
           setPreview(URL.createObjectURL(projectDetails.projectImage)) 
        }
    },[projectDetails.projectImage])

    const handleCancel=()=>{
        setProjectDetails({
            title:"",
            language:"",
            github:"",
            website:"",
            overview:"",
            projectImage:""
        })
        setPreview("")
        if(key==1){
            setKey(0)
        }
        else{
            setKey(1)
        }
    }

    const handleAdd=async()=>{
      
        const{title,language,github,website,overview,projectImage}=projectDetails
       
        
        if(!title||!language||!github||!website||!overview||!projectImage){
            toast.info('please fill the form completly')
        }else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            reqBody.append("projectImage",projectImage)

            if(token){
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                
                
                const result= await addProjectApi(reqBody,reqHeader)
                console.log(result);
                if(result.status == 200){
                 
                  toast.success("Project added successfully")
                  setTimeout(()=>{
                    handleClose()
                  },2000)
                  setAddResponse(result)
                }
                else if(result.status == 406){
                  toast.warning(result.response.data)
                  setTimeout(()=>{
                    handleCancel()
                  },2000)
                }
                else{
                  toast.error("Something went wrong")
                  setTimeout(()=>{
                    handleClose()
                  },2000)
                }
                
            }else{
                toast.warning('please login')
            }
        }
    }
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setToken(sessionStorage.getItem('token'))
        }
    },[])
    

    const handleClose = () => {
        setShow(false)
        handleCancel()
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <div>
                <button onClick={handleShow} className='btn btn-success rounded-0'>Add Project</button>
            </div>

            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Add Project details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="projectimage">
                                    <input type="file" id='projectimage' className='d-none' key={key}  onChange={(e)=>handleFile(e)}/>
                                    <img src={preview? preview:"https://img.freepik.com/free-vector/image-upload-concept-illustration_114360-996.jpg"} alt="" className='w-100' />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <input type="text" placeholder='Title' value={projectDetails.title}  className='form-control mt-3' onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Language'  value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  className='form-control mt-3 '/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Github'  value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  className='form-control mt-3'/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Website'  value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}  className='form-control mt-3'/>
                                </div>
                                <div>
                                    <textarea rows={5} placeholder='Overview'  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control mt-3'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAdd}>
                       Add Project
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' autoClose={2000} theme="colored"/>
        </>
    )
}

export default Addproject
