import React, { useState } from 'react';
import { Calendar, User, Phone, MessageSquare, Clock } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleExternalSubmit = (e, method) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Please enter Name, Phone, and Date.");
      return;
    }
    const details = `New Appointment Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTreatment: ${formData.service || 'Not specified'}\nMessage: ${formData.message || 'None'}`;
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/918291849549?text=${encodeURIComponent(details)}`, '_blank');
    } else {
      window.location.href = `mailto:info@sabkadentist.com?subject=New Appointment Request&body=${encodeURIComponent(details)}`;
    }

    setSubmitted(true);
    setFormData({ name: '', phone: '', service: '', date: '', message: '' });
  };

  return (
    <section id="booking" className="section booking-section">
      <div className="container booking-container">
        <div className="booking-content animate-fade-in">
          <h2>Book Your Free Consultation</h2>
          <p>
            Schedule a visit at our Chembur East clinic today. 
            Fill out the form below, and our team will get back to you to confirm your appointment.
          </p>
          
          <div className="contact-features">
            <div className="cf-item">
              <div className="cf-icon"><Phone size={24} /></div>
              <div>
                <h4>Call or WhatsApp Us</h4>
                <p>82918 49549</p>
              </div>
            </div>
            <div className="cf-item">
              <div className="cf-icon"><Clock size={24} /></div>
              <div>
                <h4>Clinic Timings</h4>
                <p>Monday – Saturday 11 AM – 8 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-wrapper card animate-fade-in" style={{animationDelay: '0.2s'}}>
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Request Received!</h3>
              <p>Thank you for choosing Sabka Dentist. Our executive will call you shortly to confirm your slot.</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form className="booking-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-group">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group w-50 pe-2 inline-block">
                <label>Phone Number</label>
                <div className="input-group">
                  <Phone className="input-icon" size={20} />
                  <input 
                    type="tel" 
                    placeholder="9876543210" 
                    required 
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group w-50 ps-2 inline-block">
                <label>Preferred Date</label>
                <div className="input-group">
                  <Calendar className="input-icon" size={20} />
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Treatment</label>
                <select 
                  className="form-control"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Select Treatment</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Root Canal">Root Canal Treatment</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Braces">Braces / Orthodontics</option>
                  <option value="Aligners">Aligners (Invisalign etc.)</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                </select>
              </div>

              <div className="form-group">
                <label>Any Message</label>
                <div className="input-group">
                  <MessageSquare className="input-icon textarea-icon" size={20} />
                  <textarea 
                    placeholder="Describe your dental issue briefly..." 
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-primary btn-submit w-full" onClick={(e) => handleExternalSubmit(e, 'whatsapp')}>
                  Book via WhatsApp
                </button>
                <button type="button" className="btn btn-secondary btn-submit w-full" onClick={(e) => handleExternalSubmit(e, 'email')}>
                  Book via Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
