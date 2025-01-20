import React, { useState } from 'react'
import projectimg from '../assets/proimg.png'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../service/serviceUrl';



function ProductCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '100%' }} className='shadow border-0'>
                <Card.Img onClick={handleShow} variant="top" src={`${serverUrl}/upload/${project.projectImage}`} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>

                </Card.Body>
            </Card>

            

            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-fluid'>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={`${serverUrl}/upload/${project.projectImage}`} alt="" className='w-100' />
                            </div>
                            <div className="col-md-6">
                                <h3>Description</h3>
                                <p>
                                    {project.overview}
                                </p>
                                <h4>Technologies</h4>
                                <p>{project.language}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={project.website} target='_blank'><FontAwesomeIcon icon={faGlobe} size="xl" className='me-3' /></Link>
                    <Link to={project.github} target='_blank'><FontAwesomeIcon icon={faGithub} size="xl" className='me-3' /></Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductCard