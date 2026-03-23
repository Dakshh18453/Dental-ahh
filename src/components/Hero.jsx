import React from 'react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="badge">
            <Star size={16} fill="currentColor" />
            <span>#1 Dental Clinic in Chembur East</span>
          </div>
          <h1 className="hero-title">
            Your Smile is Our <br />
            <span className="highlight-text">Top Priority</span>
          </h1>
          <p className="hero-description">
            Experience painless, affordable, and world-class dental care at Sabka Dentist, Chembur East. Over 10 lakh smiles restored across Mumbai.
          </p>
          
          <div className="hero-features">
            <div className="feature-item">
              <CheckCircle2 size={20} className="icon-check" />
              <span>Free Consultation</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="icon-check" />
              <span>EMI Options Available</span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#booking" className="btn btn-primary btn-large">
              Book Appointment
              <ArrowRight size={20} />
            </a>
            <a href="#services" className="btn btn-outline btn-large btn-white">
              View Treatments
            </a>
          </div>
        </div>
        
        {/* Placeholder for actual generated image, using CSS gradient/shape for now until replacing with actual image in final integration */}
        <div className="hero-image-wrapper animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="hero-image-card">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Dental checkup at Chembur East Clinic" 
              className="hero-image"
            />
            <div className="trusted-badge floating-animation">
              <div className="trusted-number">10L+</div>
              <div className="trusted-text">Happy Smiles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
