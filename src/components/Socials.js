// src/components/Socials.js

import React from "react";
import Draggable from "react-draggable";
import "../styles/Socials.css";

const Socials = () => {
  return (
    <div className="socials-wrapper">
      <Draggable bounds="parent">
        <div className="socials-container">
          <ul style={{ listStyle: "none", padding: "5px", display: "flex", gap: "15px" }}>
            <li>
              <a
                href="https://www.youtube.com/@Spardhaweb"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="YouTube"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
            <li>
              <a
                href="https://t.me/+BdSatS5bmdE5ODQ1"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                  alt="Telegram"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA=="
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
            <li>
              <a
                href="https://whatsapp.com/channel/0029VacaEMFInlqSAA9ilQ1f"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                  alt="WhatsApp"
                  style={{ width: "30px", height: "30px" }}
                />
              </a>
            </li>
          </ul>
        </div>
      </Draggable>
    </div>
  );
};

export default Socials;
