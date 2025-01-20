import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { serverUrl } from '../service/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../service/allApi';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);
    const [updateStatus,setUpdateStatus]=useState({})
    const [preview, setPreview] = useState("")
    const [existingImg, setExistingImg] = useState("")
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        profile: "",
        github: "",
        linkedin: ""
    })
    console.log(userDetails);
    const handleFile = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
    }
    useEffect(() => {
        if (userDetails.profile) {
            setPreview(URL.createObjectURL(userDetails.profile))
        }
    }, [userDetails.profile])
    console.log(preview);

    useEffect(() => {
        if (sessionStorage.getItem("existingUsers")) {
            const user = JSON.parse(sessionStorage.getItem("existingUsers"))
            console.log(user);
            setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
            setExistingImg(user.profile)
        }
    }, [updateStatus])

    const handleUpdate = async () => {
        const { username, email, profile, password, github, linkedin } = userDetails
        if (!github || !linkedin) {
            toast.info('Fill the form completely')
        }
        else {
            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImg)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "COntent-Type": "multipart/form-data",
                    "Authorization":` Bearer ${token}`
                }
                const result = await updateUserProfileApi(reqBody, reqHeader)
                console.log(result);
                if(result.status==200){
                    toast.success('Profile updated successfully')
                    sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
                    setUpdateStatus(result)
                }
                else{
                    toast.error('something went wrong')
                }

            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization":` Bearer ${token}`
                }
                const result = await updateUserProfileApi(reqBody, reqHeader)
                console.log(result);
                if(result.status==200){
                    toast.success('Profile updated successfully')
                    sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
                    setUpdateStatus(result)
                }
                else{
                    toast.error('something went wrong')
                }

            }

        }
    }


    return (
        <>
            <div className='p-4 shadow' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                <div className='d-flex justify-content-between'>
                    <h3 className='text-success'>Profile</h3>
                    <button  onClick={() => setOpen(!open)} className='btn'>
                        {open ?<FontAwesomeIcon icon={faAngleUp} size="2xl" />
                    :<FontAwesomeIcon icon={faAngleDown} size="2xl" />}
                    </button>
                </div>
                <Collapse in={open}>
                 <div>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <label htmlFor="profileimage" className='d-flex justify-content-center align-items-center mt-3'>
                        <input onChange={(e) => handleFile(e)} type="file" id='profileimage' className='d-none' />
                        {existingImg == "" ? <img src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/013/042/571/non_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"} alt="" style={{ width: '250px', height: '250px', borderRadius: '50%' }} />
                            :
                            <img src={preview ? preview :` ${serverUrl}/upload/${existingImg}`} alt="" style={{ width: '250px', height: '250px', borderRadius: '50%' }} />}
                    </label>
                    <div className='w-100 mt-4'>
                        <div className='mb-3'><input onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} value={userDetails?.github} type="text" placeholder='Github' className='form-control' /></div>
                        <div className='mb-4'><input onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} value={userDetails?.linkedin} type="text" placeholder='Linkedin' className='form-control' /></div>
                        <div className='mb-3 text-center'><button onClick={handleUpdate} className='btn btn-success w-75'>Update Profile</button></div>
                    </div>
                </div>
                </div>
                </Collapse>
            </div>
            <ToastContainer position='top-center' autoClose={2000} theme="colored" />
        </>
    )
}

export default Profile