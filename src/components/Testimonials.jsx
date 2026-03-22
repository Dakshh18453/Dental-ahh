import React from 'react';
import { Star } from 'lucide-react';

const reviewsData = [
  {
    name: "Mahesh B",
    date: "2 months ago",
    text: "I visited Sabka Dentist in Chembur and had a great experience while cleaning my teeth. Dr. Shireen Shaikh was very professional, kind, and thorough in her treatment. I’m fully satisfied with the care and service provided. Highly recommended!"
  },
  {
    name: "Marie-Rose Musuamba",
    date: "3 months ago",
    text: "I visited Sabka Dentist – Chembur for the first time and had my cleaning done by Dr. Shireen. I’m really happy with the experience. The doctor was gentle, professional, and explained everything clearly. The cleaning was done very well."
  },
  {
    name: "Yadhu Krishna",
    date: "a month ago",
    text: "Very good service. Dr. Shireen sheikh is experienced and friendly. Behaviour of staff is also very good. Very reasonable prices as well."
  },
  {
    name: "Isha Kumar",
    date: "a month ago",
    text: "The visit to sabka dentist was excellent in terms of appointment booking and smooth process. Dr. Shireen Shaikh gave me very good treatment for teeth cleaning and gave good guidance about my teeth condition."
  },
  {
    name: "Nazneen Shaikh",
    date: "3 months ago",
    text: "Dr.Shireen is the best, humble and sweet doctors ever. Chembur branch staffs and doctors are soft spoken to their patients. I am the patient last two years for my braces treatment. I am very happy with my treatment."
  },
  {
    name: "Sameer Akram",
    date: "a month ago",
    text: "A great dentist doesn’t just fix teeth, they bring back smiles and confidence. Thank you for your gentle care and magical hands."
  }
];

const Testimonials = () => {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-subtitle">
          With hundreds of happy patients in Chembur East, your smile is in safe and experienced hands. 
          Here is what they have to say about our amazing team, especially Dr. Shireen Shaikh!
        </p>

        <div className="reviews-grid">
          {reviewsData.map((r, i) => (
            <div key={i} className="card review-card">
              <div className="review-header">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-date">{r.date}</div>
                </div>
              </div>
              <div className="stars">
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
                <Star fill="currentColor" size={16} />
              </div>
              <p className="review-text">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
