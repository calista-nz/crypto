import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {


  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>Crypto</h2>

          <p>
            Explore cryptocurrency prices, market data,
            and trends in one simple place.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="#market">Market</a>
            <a href="#about">About</a>
          </div>

          <div>
            <h4>Contact</h4>

            <a
              href="https://github.com/calista-nz"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/calista-zhang-nz"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Crypto. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;