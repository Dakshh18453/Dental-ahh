import React, { useState, useEffect } from 'react';
import { Check, Star, X } from 'lucide-react';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem'
    }}>
      <div className="popup-container" style={{
        maxWidth: '900px',
        width: '100%',
        background: '#8ec63f', // Vibrant green from the reference
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          style={{ 
            position: 'absolute', top: '16px', right: '16px', 
            background: 'rgba(0,0,0,0.2)', border: 'none', color: 'white', 
            borderRadius: '50%', width: '36px', height: '36px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', zIndex: 100 
          }}
        >
          <X size={20} />
        </button>

        {/* Left Content Area */}
        <div style={{ flex: 1, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '2rem', color: 'white', marginTop: 0 }}>
            Dental Cleaning & <br/> Polishing @ ₹249
          </h2>
          
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
              <Check size={24} style={{ flexShrink: 0 }} /> Complete Plaque Removal
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
              <Check size={24} style={{ flexShrink: 0 }} /> Tobacco & Tea Stain Removal
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' }}>
              <Check size={24} style={{ flexShrink: 0 }} /> Free Dental Checkup Included
            </li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2.5rem' }}>
            <a href="#booking" onClick={() => setIsOpen(false)} 
               style={{ 
                 background: 'white', 
                 color: '#8ec63f', 
                 padding: '1rem 3rem', 
                 borderRadius: '8px', 
                 fontWeight: 'bold', 
                 fontSize: '1.2rem', 
                 textAlign: 'center', 
                 display: 'inline-block',
                 textDecoration: 'none',
               }}>
              Claim Offer Now
            </a>
          </div>

          {/* Google Review Badge */}
          <div style={{ background: 'rgba(0,0,0,0.15)', padding: '0.75rem 1.25rem', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 'max-content' }}>
            <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
              <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
            </div>
            <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500' }}>4.9/5 • 2,500+ Happy Patients</span>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="popup-image-responsive" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img 
            src="/offer-graphic.png" 
            alt="Dental Offer" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center left' }} 
          />
        </div>
        
      </div>
      <style>{`
        @media(max-width: 850px) {
          .popup-container {
            flex-direction: column !important;
          }
          .popup-image-responsive {
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default OfferPopup;
