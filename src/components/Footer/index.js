import React from 'react';
/* Style */
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">{new Date().getFullYear()} &copy; made by <span className="footer__owner-name">Gabriele Polli</span></p>
    </footer>
  );
}

export default Footer;
