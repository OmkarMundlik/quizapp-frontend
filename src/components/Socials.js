// src/components/Socials.js

import React from "react";
import "../styles/Socials.css"; // Make sure you import your CSS file for styling

const Socials = () => {
  return (
    <div className="socials-container">
      <ul>
        <li>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="https://www.youtube.com/@Spardhaweb"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-youtube"></i>
          </a>
        </li>
        <li>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="https://t.me/+BdSatS5bmdE5ODQ1"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-telegram"></i>
          </a>
        </li>
        <li>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA=="
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: "#25D366" }} // Corrected WhatsApp color
            href="https://whatsapp.com/channel/0029VacaEMFInlqSAA9ilQ1f"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
