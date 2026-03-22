import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MapPin } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <div className="logo">
          <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="34" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="700" fill="var(--color-primary)" letterSpacing="-0.5">Sabka dentist</text>
            <path d="M 12 38 Q 40 52 68 38" stroke="var(--color-primary)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Treatments</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Actions */}
        <div className="header-actions desktop-actions">
          <div className="contact-info">
            <Phone size={18} className="icon-text" />
            <span>82918 49549</span>
          </div>
          <a href="#booking" className="btn btn-primary">
            <Calendar size={18} />
            Book Appointment
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
        <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
        <a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <a href="#booking" className="btn btn-primary w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
          Book Appointment
        </a>
      </div>
    </header>
  );
};

export default Header;
