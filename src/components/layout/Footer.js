import React from "react";
import "./layout.scss";

const Footer = () => {
  return (
    <div className="text-center my-5" id="Footer">
      <div className="icons-container">
        <span className="media-text">Seguinos en nuestras redes</span>
        <a href="https://www.instagram.com">
          <span className="footer-icon">
            <i class="fab fa-instagram"></i>
          </span>
        </a>
        <a href="https://twitter.com">
          <span className="footer-icon">
            <i class="fab fa-twitter"></i>
          </span>
        </a>
        <a href="https://www.facebook.com">
          <span className="footer-icon">
            <i class="fab fa-facebook"></i>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
