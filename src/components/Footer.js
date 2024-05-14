import React from 'react';

export default function Footer() {
    return (
      <footer
  className="text-center text-white"
  style={{ backgroundColor: "#2c3e50" }} // Changed background color
>
  {/* Grid container */}
  <div className="container p-4">
    {/* Section: Links */}
    <section>
      {/* Grid row */}
      <div className="row">
        {/* Grid column */}
        <div className="col-md-6 mx-auto">
          {/* Follow us */}
          <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

          {/* Social media links */}
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://t.me/+BdSatS5bmdE5ODQ1"
            role="button"
            target='_blank'
          ><i className="fab fa-telegram"></i></a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA=="
            role="button"
            target="_blank" 
          ><i className="fab fa-instagram"></i></a>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          ><i className="fab fa-whatsapp"></i></a>

        </div>
      </div>
      {/* Grid row */}
    </section>
    {/* Section: Links */}
  </div>
  {/* Grid container */}

  {/* Copyright */}
  <div
    className="text-center p-3"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
  >
    © {new Date().getFullYear()} SpardhaWeb
    <br />
    Contact Us at: omkarmundlik11@gmail.com
    Mundlik Web Developers
  </div>
  {/* Copyright */}
</footer>


    );
}
