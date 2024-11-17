import React from "react";
import "../styles/Socials.css"; // Make sure you import your CSS file for styling

const Socials = () => {
  return (
    <div className="socials-container">
      <ul>
        <li>
          <a
            className="btn btn-floating "
            href="https://www.youtube.com/@Spardhaweb"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              width="30"
              height="30"
            />
          </a>
        </li>
        <li>
          <a
            className="btn btn-floating "
            href="https://t.me/+BdSatS5bmdE5ODQ1"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
              alt="Telegram"
              width="30"
              height="30"
            />
          </a>
        </li>
        <li>
          <a
            className="btn btn-floating "
            href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA=="
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              width="30"
              height="30"
            />
          </a>
        </li>
        <li>
          <a
            className="btn btn-floating "
            href="https://whatsapp.com/channel/0029VacaEMFInlqSAA9ilQ1f"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              width="30"
              height="30"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
