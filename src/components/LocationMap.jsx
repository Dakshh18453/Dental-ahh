import React from 'react';

const LocationMap = () => {
  return (
    <section className="section" style={{ backgroundColor: '#f8fafc', paddingBottom: '0' }}>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <h2 className="section-title">Our Location</h2>
        <p className="section-subtitle">
          Visit our Chembur East clinic. We are conveniently located near Diamond Garden, opposite Dena Bank.
        </p>
      </div>
      <div className="map-wrapper" style={{ width: '100%', height: '400px', backgroundColor: '#e2e8f0' }}>
        <iframe 
          src="https://maps.google.com/maps?q=Shop%20No%206%20Sunny%20Estate%20Sion%20Trombay%20Road%20Chembur%20East&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{border: 0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Sabka Dentist Chembur East Location"
        ></iframe>
      </div>
    </section>
  );
};

export default LocationMap;
