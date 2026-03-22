import React from 'react';
import { Check } from 'lucide-react';

const OfferBanner = () => {
  return (
    <section className="section" style={{ padding: '0 0 5rem 0', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div style={{
          backgroundColor: 'var(--color-primary)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }} className="banner-responsive">
          
          <div style={{ flex: '1', padding: '3rem 4rem', color: 'white' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>
              Dental Cleaning & <br/> Polishing @ ₹249
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <Check size={24} /> Complete Plaque Removal
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <Check size={24} /> Tobacco & Tea Stain Removal
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <Check size={24} /> Free Dental Checkup Included
              </li>
            </ul>
            <a href="#booking" className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'var(--color-primary)', 
              padding: '1rem 2.5rem', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Claim Offer Now
            </a>
          </div>
          
          <div style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.05)',
            minHeight: '250px'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>Cleaning Offer</span>
          </div>
          
        </div>
      </div>
      <style>{`
        @media(min-width: 992px) {
          .banner-responsive { flex-direction: row !important; }
        }
      `}</style>
    </section>
  );
};

export default OfferBanner;
