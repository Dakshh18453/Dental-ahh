import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';
import OfferPopup from './components/OfferPopup';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <BookingForm />
        <LocationMap />
      </main>
      <Footer />
      <OfferPopup />
      <a href="https://wa.me/918291849549" target="_blank" rel="noopener noreferrer" 
         aria-label="Chat with us on WhatsApp" 
         style={{ 
           position: 'fixed', 
           bottom: '2rem', 
           right: '2rem', 
           backgroundColor: '#25D366', 
           width: '60px', 
           height: '60px', 
           borderRadius: '50%', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center', 
           boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', 
           zIndex: 9999 
         }}>
        <MessageCircle size={32} color="white" strokeWidth={1.5} />
      </a>
    </div>
  );
}

export default App;
