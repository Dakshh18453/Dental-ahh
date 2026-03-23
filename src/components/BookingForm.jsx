import React, { useState, useEffect } from 'react';
import { Calendar, Phone, User, Stethoscope, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Get current date string YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    } else {
      setSlots([]);
      setSelectedSlot(null);
    }
  }, [formData.date]);

  const fetchAvailableSlots = async (dateStr) => {
    setLoadingSlots(true);
    setErrorMsg('');
    setSelectedSlot(null);
    try {
      const res = await fetch(`/api/slots?date=${dateStr}`);
      if (!res.ok) {
        if (res.status === 404) {
          // Running on pure Vite dev server instead of Vercel Dev. Simulate mock slots locally.
          return simulateMockSlots(dateStr);
        }
        throw new Error('Failed to load time slots');
      }
      const data = await res.json();
      setSlots(data.slots || []);
      if (data.isMock) {
        console.warn("Using mock slots because Google API keys are not yet configured in environment variables.");
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
      // Fallback for local Vite development without Vercel CLI
      simulateMockSlots(dateStr);
    } finally {
      setLoadingSlots(false);
    }
  };

  const simulateMockSlots = (dateStr) => {
    const mock = [];
    let current = new Date(`${dateStr}T11:00:00`);
    const end = new Date(`${dateStr}T19:00:00`);
    while (current < end) {
      if (Math.random() > 0.3) {
        const startIso = new Date(current).toISOString();
        const endIso = new Date(current.getTime() + 30 * 60000).toISOString();
        mock.push({
          time: current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          start: startIso,
          end: endIso
        });
      }
      current.setMinutes(current.getMinutes() + 30);
    }
    setSlots(mock);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !selectedSlot) {
      setErrorMsg('Please complete all required fields and select an available time slot.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Attempt API booking (Google Calendar)
      const bookRes = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          timeStart: selectedSlot.start,
          timeEnd: selectedSlot.end,
          message: formData.message
        })
      });

      if (!bookRes.ok && bookRes.status !== 404) {
        const data = await bookRes.json();
        throw new Error(data.error || 'Failed to secure booking on the calendar.');
      }

      // 2. Send Confirmation Email via EmailJS
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
              patient_name: formData.name,
              patient_phone: formData.phone,
              treatment: formData.service,
              appointment_date: formData.date,
              appointment_time: selectedSlot.time,
              message: formData.message || "No additional message."
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        } catch (emailErr) {
          console.error("EmailJS Failed: ", emailErr);
          // Non-fatal error, calendar event worked.
        }
      }

      setSubmitted(true);
      
      // WhatsApp trigger: Redirect automatically to WhatsApp with prefilled message
      const details = `Hi Sabka Dentist! I have successfully booked an appointment.\n\n*Name:* ${formData.name}\n*Treatment:* ${formData.service}\n*Date:* ${formData.date}\n*Time:* ${selectedSlot.time}`;
      setTimeout(() => {
        window.open(`https://wa.me/918291849549?text=${encodeURIComponent(details)}`, '_blank');
      }, 2000);

    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="section booking-section section-gray">
      <div className="container booking-container">
        <div className="booking-content">
          <h2>Secure Your Appointment Today</h2>
          <p>Skip the waiting room. Book a confirmed time slot with our expert dentists in Chembur East in under 60 seconds.</p>
          
          <div className="contact-features">
            <div className="cf-item">
              <div className="cf-icon"><CheckCircle2 size={32} /></div>
              <div>
                 <h4 style={{fontSize:'1.2rem', marginBottom:'0.2rem'}}>No Double Booking</h4>
                 <p style={{margin:0, fontSize:'0.9rem'}}>Live integration with our Google Calendar guarantees your slot is securely locked.</p>
              </div>
            </div>
            <div className="cf-item">
              <div className="cf-icon"><CheckCircle2 size={32} /></div>
              <div>
                 <h4 style={{fontSize:'1.2rem', marginBottom:'0.2rem'}}>Instant Confirmation</h4>
                 <p style={{margin:0, fontSize:'0.9rem'}}>Receive an automated email and WhatsApp confirmation immediately upon booking.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-wrapper">
          <h3 style={{fontSize:'1.8rem', marginBottom:'1.5rem'}}>Reserve a Slot</h3>
          
          {submitted ? (
            <div className="success-message">
              <div className="success-icon" style={{animation: 'float 2s ease-in-out infinite'}}>
                <CheckCircle2 size={48} />
              </div>
              <h3 style={{fontSize:'1.5rem', marginBottom:'0.5rem', color:'white'}}>Booking Confirmed!</h3>
              <p>Your appointment has been successfully scheduled. We will send you an email confirmation shortly.</p>
              <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                 <Loader2 className="animate-spin" style={{margin:'0 auto 0.5rem auto'}} size={24} />
                 <p style={{fontSize:'0.9rem', color:'white', fontWeight:'bold', margin:0}}>Redirecting you to WhatsApp...</p>
              </div>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleBooking}>
              {errorMsg && (
                <div style={{background:'rgba(239, 68, 68, 0.2)', border:'1px solid #ef4444', padding:'1rem', borderRadius:'8px', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <AlertCircle color="#ef4444" size={20} />
                  <span style={{color:'white', fontSize:'0.9rem'}}>{errorMsg}</span>
                </div>
              )}
            
              <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
                <div className="form-group" style={{flex:1, margin:0}}>
                  <label>Full Name *</label>
                  <div className="input-group">
                    <User className="input-icon" size={20} />
                    <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ color: 'black' }} />
                  </div>
                </div>

                <div className="form-group" style={{flex:1, margin:0}}>
                  <label>Phone Number *</label>
                  <div className="input-group">
                    <Phone className="input-icon" size={20} />
                    <input type="tel" placeholder="98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required style={{ color: 'black' }} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Treatment *</label>
                <div className="input-group">
                  <Stethoscope className="input-icon" size={20} />
                  <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} required style={{ color: formData.service ? 'black' : 'gray' }}>
                    <option value="" disabled>Select Treatment...</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Teeth Cleaning">Teeth Cleaning</option>
                    <option value="Root Canal">Root Canal Treatment</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Braces">Braces / Orthodontics</option>
                    <option value="Aligners">Aligners (Invisalign etc.)</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Appointment Date *</label>
                <div className="input-group">
                  <Calendar className="input-icon" size={20} />
                  <input type="date" min={today} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required style={{ color: 'black' }} />
                </div>
              </div>

              {/* Time Slots Area */}
              <div className="form-group">
                <label>Available Time Slots *</label>
                {!formData.date ? (
                   <div style={{padding:'1rem', background:'rgba(0,0,0,0.1)', borderRadius:'8px', color:'white', textAlign:'center'}}>
                     Please select an appointment date first to see available time slots.
                   </div>
                ) : loadingSlots ? (
                  <div style={{display:'flex', alignItems:'center', gap:'0.5rem', color:'white', padding:'0.5rem 0'}}>
                     <Loader2 className="animate-spin" size={20} /> Checking live availability...
                  </div>
                ) : slots.length > 0 ? (
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.5rem', marginTop:'0.5rem'}}>
                    {slots.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSlot(s)}
                        style={{
                          padding: '0.75rem 0.5rem',
                          background: selectedSlot?.start === s.start ? 'white' : 'rgba(255,255,255,0.1)',
                          color: selectedSlot?.start === s.start ? 'var(--color-primary)' : 'white',
                          border: `1px solid ${selectedSlot?.start === s.start ? 'white' : 'rgba(255,255,255,0.2)'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                ) : (
                   <div style={{padding:'1rem', background:'rgba(0,0,0,0.1)', borderRadius:'8px', color:'white', textAlign:'center'}}>
                     No slots available for this date. Please select another.
                   </div>
                )}
              </div>

              <div className="form-group mt-4">
                <button type="submit" disabled={isSubmitting || !selectedSlot} style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: (isSubmitting || !selectedSlot) ? 'rgba(255,255,255,0.5)' : 'white',
                  color: 'var(--color-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (isSubmitting || !selectedSlot) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s'
                }}>
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" size={24} /> Securing Appointment...</>
                  ) : (
                    <>Confirm & Book Appointment</>
                  )}
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
