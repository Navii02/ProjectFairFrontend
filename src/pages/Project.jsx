import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { allProjectsapi } from "../service/allApi";
import Footer from '../components/Footer'


function Project() {
  const [token, setToken] = useState("");
  const [allprojects, setAllProjects] = useState([]);
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey);
  

  const getAllProjects = async () => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await allProjectsapi(searchKey,reqHeader);
      //console.log(result.data);
      setAllProjects(result.data);
    }
  };
  useEffect(()=>{
    getAllProjects();
  },[searchKey])
 
  useEffect(() => {
    getAllProjects();
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  },[token]);

  return (
    <>
     <div>
        <Header />
        <h1 className='mt-4 text-center'>All Projects</h1>

        {!token ? <div className='mt-5'>
          <div className='container-fluid'>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/a78d7491269521.5e3166194e2b2.gif" alt="" className='w-100' />
                <h4 className='text-center mt-3'>Please <Link>Login</Link> to see more projects</h4>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>

        </div>


          :
          <div>
            <div className='mt-5'>
              <div className='container'>
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 d-flex">
                    <input type="text"onChange={(e)=>setSearchKey(e.target.value)} placeholder='Technologies' className='shadow form-control' />
                    <FontAwesomeIcon style={{ color: 'lightgrey', marginTop: '10px', marginLeft: '-30px' }} icon={faMagnifyingGlass} />
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>

            </div>

            <div className='container mt-5 p-1'>
              <div className="row">
                {allprojects?.map((item)=>(
                  <div className="col-md-3 mt-5"><ProductCard project={item} /></div>
                ))
                }
              </div>
            </div>
          </div>
        }

      </div>
      <Footer/>
    </>
  );
}

export default Project;
