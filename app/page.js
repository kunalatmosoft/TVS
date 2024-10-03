"use client"

import React, { useState } from 'react';
import { bikes } from '../constants/bikes'; // Import the bikes data
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// FAQ Section
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: 'What is the warranty period for TVS bikes?', answer: 'The warranty period for TVS bikes is typically 5 years or 60,000 kilometers, whichever comes first.' },
    { question: 'How often should I service my TVS bike?', answer: 'It’s recommended to service your TVS bike every 3000 kilometers or every 3 months, whichever comes first.' },
    { question: 'Where can I book a test ride?', answer: 'You can book a test ride directly from our website or visit any nearby TVS dealership.' },
  ];

  return (
    <section id="faq" className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <button onClick={() => toggleFAQ(index)} className="w-full text-left text-xl font-semibold">
              {faq.question}
            </button>
            {openIndex === index && <p className="mt-4 text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
      <div className="max-w-md mx-auto">
        <form className="space-y-6">
          <div>
            <input type="text" placeholder="Your Name" className="w-full p-4 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <input type="email" placeholder="Your Email" className="w-full p-4 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <textarea placeholder="Your Message" className="w-full p-4 border border-gray-300 rounded-lg" required />
          </div>
          <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">Send Message</button>
        </form>
      </div>
    </section>
  );
};



// Main Page Component
const IndexPage = () => {
  // Dynamic Hero section content
  const heroData = {
    image: 'https://images.hdqwalls.com/wallpapers/honda-motorcycle-track-bike-qj.jpg',
    headline: "Power, Style, and Innovation: Discover the Perfect TVS Bike for You",
    subheadline: "Experience unmatched performance with cutting-edge design and technology.",
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen text-white" style={{ backgroundImage: `url(${heroData.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{heroData.headline}</h1>
            <p className="text-lg mb-6">{heroData.subheadline}</p>
            <a href="/Bookings" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg">Book a Test Ride</a>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Superior Performance</h3>
            <p>Powerful Engine Range from 125cc to 200cc.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Innovative Design</h3>
            <p>Sleek Aerodynamic Build with LED Headlights, Digital Cluster.</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Safety First</h3>
            <p>ABS, Dual-Channel Disc Brakes, and more.</p>
          </div>
        </div>
      </section>

      {/* Bike Models Section */}
      <section id="models" className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Explore TVS Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16">
          {bikes.map(bike => (
            <div key={bike.id} className="bg-gray-100 shadow-md p-6 rounded-lg">
              <img src={bike.image} alt={bike.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold mb-4">{bike.name}</h3>
              <p className="mb-2">{bike.engine}</p>
              <p className="mb-2">{bike.power}</p>
              <p className="mb-4">{bike.price}</p>
              <a href="#learn-more" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Learn More</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndexPage;
