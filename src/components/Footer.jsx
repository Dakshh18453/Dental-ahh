import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about-col">
            <h3 className="footer-title">Sabka Dentist <br/><span className="fw-normal">Chembur East</span></h3>
            <p className="footer-desc">
              Part of India's largest dental clinic chain, providing affordable, high-quality, and painless dental treatments to everyone.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Treatments</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#booking">Book Appointment</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Our Treatments</h4>
            <ul className="footer-links">
              <li><a href="#">Root Canal Treatment</a></li>
              <li><a href="#">Dental Implants</a></li>
              <li><a href="#">Teeth Whitening</a></li>
              <li><a href="#">Braces & Aligners</a></li>
            </ul>
          </div>

          <div className="footer-col" style={{gridColumn: 'span 1'}}>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-list">
              <li style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} className="contact-icon" style={{ marginTop: '4px' }} />
                <span>Shop No 6 Sunny Estate building no 2 Sion Trombay Road Chembur East Near to IDBI bank, Opp Dena bank, Near to Diamond Garden , Mumbai, Maharashtra – 400071</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>82918 49549</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>info@sabkadentist.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sabka Dentist Clinic. Built with modern React.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
