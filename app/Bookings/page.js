"use client"; // This should be placed at the top for a Next.js client component

import React, { useState } from 'react';
import { Client, Databases, ID } from 'appwrite'; // Import necessary Appwrite services
import { CheckCircle, X } from 'lucide-react'; // Import icons from Lucide React

const Page = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [adhaar, setNewAdhaar] = useState("");
  const [address, setNewAddress] = useState("");
  const [model, setNewModel] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false); // New state for showing modal

  const handleAddRegistration = async () => {
    if (!name || !contact || !adhaar || !address || !model) {
      alert("All fields are required.");
      return;
    }

    try {
      const appwriteConfig = {
        endpoint: "https://cloud.appwrite.io/v1",
        project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTIONS_ID,
      };

      const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.project);

      const databases = new Databases(client);
      const timestamp = new Date().toISOString();

      const documentData = {
        name,
        contact,
        adhaar,
        address,
        model,
        status,
        timestamp,
      };

      if (editId) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          editId,
          documentData
        );
        alert("Registration updated successfully!");
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collectionId,
          ID.unique(),
          documentData
        );
        setShowModal(true); // Show modal on successful registration
      }

      resetForm();
    } catch (error) {
      console.error("Error adding registration:", error);
      alert("Error adding registration. Please try again.");
    }
  };

  const bikeModels = ["Apache RTR 160", "Apache RTR 200", "Apache RR 310"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    handleAddRegistration();
  };

  const resetForm = () => {
    setName("");
    setContact("");
    setNewAdhaar("");
    setNewAddress("");
    setNewModel("");
    setStatus("Pending");
    setEditId(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            />
            <label
              htmlFor="name"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${
                name ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400'
              }`}
            >
              Name
            </label>
          </div>

          {/* Address */}
          <div className="relative">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setNewAddress(e.target.value)}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            />
            <label
              htmlFor="address"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${
                address ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400'
              }`}
            >
              Address
            </label>
          </div>

          {/* Contact */}
          <div className="relative">
            <input
              type="tel"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            />
            <label
              htmlFor="contact"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${
                contact ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400'
              }`}
            >
              Contact
            </label>
          </div>

          {/* Select Model */}
          <div className="relative">
            <select
              id="model"
              value={model}
              onChange={(e) => setNewModel(e.target.value)}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            >
              <option value="" disabled hidden>
                Select Model
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
              value={adhaar}
              onChange={(e) => setNewAdhaar(e.target.value)}
              className="peer w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-300 ease-in-out"
              required
            />
            <label
              htmlFor="adhaar"
              className={`absolute left-4 top-2 text-gray-500 transition-all duration-300 ease-in-out ${
                adhaar ? 'hidden' : 'peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400'
              }`}
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

        {/* Modal for success */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
              <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
              <h3 className="text-2xl font-bold mb-2 text-black">Success!</h3>
              <p className="mb-4 text-green-700">Your registration was successful.</p>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
