import React from 'react';
import { Stethoscope, Smile, Plus, Scissors, Square, Zap } from 'lucide-react';

const treatments = [
  { id: 1, title: 'Checkup & Consultation', icon: <Stethoscope size={32} />, desc: 'Comprehensive dental examination and personalized treatment plans.' },
  { id: 2, title: 'Teeth Cleaning', icon: <Zap size={32} />, desc: 'Professional scaling and polishing to remove plaque, tartar, and stains.' },
  { id: 3, title: 'Dental Implants', icon: <Plus size={32} />, desc: 'Permanent replacement for missing teeth offering natural look and feel.' },
  { id: 4, title: 'Root Canal', icon: <Square size={32} />, desc: 'Painless treatment to save severely infected or decayed teeth.' },
  { id: 5, title: 'Braces & Orthodontics', icon: <Smile size={32} />, desc: 'Aligners and traditional braces for perfectly straight teeth.' },
  { id: 6, title: 'Oral Surgery', icon: <Scissors size={32} />, desc: 'Safe and painless tooth extractions, including wisdom teeth removal.' }
];

const Services = () => {
  return (
    <section id="services" className="section section-gray">
      <div className="container">
        <h2 className="section-title">Our Treatments in Chembur East</h2>
        <p className="section-subtitle">
          We provide a comprehensive range of dental treatments using the latest technology to ensure your comfort and long-lasting oral health.
        </p>

        <div className="services-grid">
          {treatments.map((t) => (
            <div key={t.id} className="card service-card">
              <div className="service-icon-wrapper">
                {t.icon}
              </div>
              <h3 className="service-title">{t.title}</h3>
              <p className="service-desc">{t.desc}</p>
              <a href="#booking" className="service-link btn-outline">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
