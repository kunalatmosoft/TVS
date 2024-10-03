"use client"


import React, { useState } from 'react';

const Page = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    contact: '',
    model: '',
    adhaar: ''
  }); // Track form input values

  const bikeModels = ["Apache RTR 160", "Apache RTR 200", "Apache RR 310"]; // Available models

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitted(true); // Set form as submitted
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-gray-900 py-16 px-4 text-white flex justify-center items-center">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-16 h-16 text-green-500 mx-auto mb-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
          </svg>
          <h2 className="text-4xl font-bold">Success!</h2>
          <p className="mt-4">Your test ride has been successfully booked.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen bg-gray-900 py-16 px-4 text-white">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-4xl font-bold text-center mb-12">Book a Test Ride</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              value={formValues.name}
              onChange={handleInputChange}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              placeholder={formValues.name ? '' : ' '}
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${formValues.name ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:left-4 peer-focus:text-red-500'}`}
            >
              Name
            </label>
          </div>

          {/* Address */}
          <div className="relative">
            <input
              type="text"
              id="address"
              value={formValues.address}
              onChange={handleInputChange}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              placeholder={formValues.address ? '' : ' '}
              required
            />
            <label
              htmlFor="address"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${formValues.address ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:left-4 peer-focus:text-red-500'}`}
            >
              Address
            </label>
          </div>

          {/* Contact */}
          <div className="relative">
            <input
              type="tel"
              id="contact"
              value={formValues.contact}
              onChange={handleInputChange}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              placeholder={formValues.contact ? '' : ' '}
              required
            />
            <label
              htmlFor="contact"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${formValues.contact ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:left-4 peer-focus:text-red-500'}`}
            >
              Contact
            </label>
          </div>

          {/* Select Model */}
          <div className="relative">
            <select
              id="model"
              value={formValues.model}
              onChange={handleInputChange}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            >
              <option value="" disabled hidden>
                {formValues.model ? '' : 'Select Model'}
              </option>
              {bikeModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Aadhaar Number */}
          <div className="relative">
            <input
              type="text"
              id="adhaar"
              value={formValues.adhaar}
              onChange={handleInputChange}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              placeholder={formValues.adhaar ? '' : ' '}
              required
            />
            <label
              htmlFor="adhaar"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${formValues.adhaar ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:left-4 peer-focus:text-red-500'}`}
            >
              Aadhaar Number
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 ease-in-out"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;
