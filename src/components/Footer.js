import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center text-white" style={{ backgroundColor: "#2c3e50" }}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <Link className="text-white mx-2" to="/about-us">About Us</Link>
              <Link className="text-white mx-2" to="/contact-us">Contact Us</Link>
              <Link className="text-white mx-2" to="/terms-conditions">Terms and Conditions</Link>
              <Link className="text-white mx-2" to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div>
              <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#3b5998" }} href="https://t.me/+BdSatS5bmdE5ODQ1" role="button" target='_blank'><i className="fab fa-telegram"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#55acee" }} href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA==" role="button" target="_blank"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#0082ca" }} href="#!" role="button"><i className="fab fa-whatsapp"></i></a>
            </div>
            <div className="mt-4">
              <p>© {new Date().getFullYear()} spardhaweb.com | All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
