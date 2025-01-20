import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { serverUrl } from "../service/serviceUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserProject } from "../service/allApi";
import { addResponseContext } from "../context/ContextShare";

function Edit({ project }) {
      const {setAddResponse}=useContext(addResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [key, setKey] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log(project)
  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: "",
  });
  console.log(projectDetails);
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] });
  };
  const handleCancel = () => {
    setProjectDetails({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: "",
    });
    setPreview("");
    if (key == 0) {
      setKey(1);
    } else {
      setKey(0);
    }
  };
  const handleUpdate = async () => {
    const { title, language, github, website, overview, projectImage } =
      projectDetails;
    if ((!title, !language, !github, !website, !overview)) {
      toast.info("Fill The form Correctly");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);

      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        };
        const result = await updateUserProject(project._id, reqBody, reqHeader);
        console.log(result);
        if(result.status == 200){
                 
          toast.success("Project Updated successfully")
          setTimeout(()=>{
            handleClose()
          },2000)
          setAddResponse(result)

        }    else if(result.status == 406){
          toast.warning(result.response.data)
          setTimeout(()=>{
            handleCancel()
          },2000)
        }
        else{
          toast.error("Something went wrong")
          setTimeout(()=>{
            handleClose()
          },2000)}
       
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        const result = await updateUserProject(project._id, reqBody, reqHeader);
        console.log(result);
        if(result.status == 200){
                 
          toast.success("Project Updated successfully")
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
      }}
      
    }
  };
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage));
    }
  }, [projectDetails.projectImage]);

  return (
    <>
      <FontAwesomeIcon
        icon={faPenToSquare}
        size="lg"
        onClick={handleShow}
        className="text-info me-4"
      />
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Edit Project details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectimage">
                  <input
                    type="file"
                    id="projectimage"
                    key={key}
                    className="d-none"
                    onChange={(e) => handleFile(e)}
                  />
                  <img
                    src={
                      preview
                        ? preview
                        : `${serverUrl}/upload/${project.projectImage}`
                    }
                    alt=""
                    className="w-100"
                  />
                </label>
              </div>
              <div className="col-md-6">
                <div>
                  <input
                    type="text"
                    value={projectDetails.title}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        title: e.target.value,
                      })
                    }
                    placeholder="Title"
                    className="form-control mt-3"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={projectDetails.language}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        language: e.target.value,
                      })
                    }
                    placeholder="Language"
                    className="form-control mt-3 "
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={projectDetails.github}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        github: e.target.value,
                      })
                    }
                    placeholder="Github"
                    className="form-control mt-3"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={projectDetails.website}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        website: e.target.value,
                      })
                    }
                    placeholder="Website"
                    className="form-control mt-3"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Overview"
                    value={projectDetails.overview}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectDetails,
                        overview: e.target.value,
                      })
                    }
                    className="form-control mt-3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Edit Project
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default Edit;
