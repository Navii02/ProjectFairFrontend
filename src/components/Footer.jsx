import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'


function Footer() {
  return (
    <>
        <div className='w-full bg-success container-fluid p-5 mt-5'>
            <div className="row">
                <div className="col-md-4">
                    <h2 className='text-white'> <FontAwesomeIcon className='me-3' icon={faStackOverflow} />Project Fair</h2>
                    <p className='text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo culpa, error iure modi deleniti, tempora laborum velit id eveniet in sed voluptatum! Quidem recusandae reprehenderit esse adipisci, quam illum ea?</p>
                </div>
                <div className="col-md-2">
                    <h2 className='text-white'>Guides</h2>
                    <p>Home</p>
                    <p>Project</p>
                    <p>Dashboard</p>
                </div>
                <div className="col-md-2">
                    <h2 className='text-white'>Links</h2>
                    <p>React</p>
                    <p>React-Bootstrap</p>
                    <p>Bootswatch</p>
                </div>
                <div className="col-md-4">
                    <h2 className='text-white'>Contact-Us</h2>
                    <div className='d-flex '>
                        <input type="text" placeholder='Email id' className='form-control me-2 rounded-0' />
                        <button className='btn rounded-0 btn-warning'>Subscribe</button>
                    </div>
                    <div className='d-flex justify-content-between mt-3 text-white'>
                        <FontAwesomeIcon icon={faInstagram} size="2xl" />
                        <FontAwesomeIcon icon={faXTwitter} size="2xl" />
                        <FontAwesomeIcon icon={faFacebook} size="2xl" />
                        <FontAwesomeIcon icon={faLinkedin} size="2xl" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer