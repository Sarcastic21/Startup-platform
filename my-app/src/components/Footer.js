import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // Icons for social media

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section footer-left">
        <h4>Links</h4>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/uiux">UI/UX</Link>
        <Link to="/web">Web </Link>
        <Link to="/app">App </Link>
        <Link to="/ai-ml">AI/ML</Link>
      </div>
      <div className="footer-section footer-center">
        <h4>About</h4>
        <p>
        This platform is designed to help aspiring entrepreneurs showcase their startup ideas and connect with potential investors. Whether you're a founder with an innovative concept or an investor looking for the next big opportunity, our goal is to bridge the gap and make funding more accessible. With an intuitive interface and powerful features, we provide a seamless way for startups to present their vision, attract the right investors, and turn ideas into reality. 🚀        </p>
      </div>
      <div className="footer-section footer-right">
        <h4>Contact</h4>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaInstagram size={20} /> Instagram
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaLinkedin size={20} /> LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
