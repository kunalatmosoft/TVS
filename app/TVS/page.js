"use client"; // Enable client-side rendering in Next.js

import React, { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";
import { Search, Users } from "lucide-react"; // Lucide icon import
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const RegistrationDashboard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Initialize state variables unconditionally
  const [registrations, setRegistrations] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [adhaar, setNewAdhaar] = useState("");
  const [address, setNewAddress] = useState("");
  const [model, setNewModel] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null); // For editing entries
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.replace("/login");
    } else {
      fetchRegistrations(); // Fetch registrations only if authenticated
    }
  }, [isAuthenticated, router]);

  // Function to fetch registrations
  const fetchRegistrations = async () => {
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

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId
      );

      setRegistrations(response.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle adding or updating a registration
  const handleAddRegistration = async () => {
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
        alert("Registration added successfully!");
      }

      fetchRegistrations();
      resetForm();
    } catch (error) {
      console.error("Error adding registration:", error);
      alert("Error adding registration. Please try again.");
    }
  };

  // Handle deleting a registration
  const handleDeleteRegistration = async (registrationId) => {
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

      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        registrationId
      );

      alert("Registration successfully deleted!");
      fetchRegistrations();
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Error deleting registration. Please try again.");
    }
  };

  // Reset the form
  const resetForm = () => {
    setName("");
    setContact("");
    setNewAdhaar("");
    setNewAddress("");
    setNewModel("");
    setStatus("Pending");
    setEditId(null);
  };

  // Handle editing a registration
  const handleEditRegistration = (registration) => {
    setName(registration.name);
    setContact(registration.contact);
    setNewAdhaar(registration.adhaar);
    setNewAddress(registration.address);
    setNewModel(registration.model);
    setStatus(registration.status);
    setEditId(registration.$id);
  };

  // Filter registrations based on search query
  const filteredRegistrations = registrations.filter((registration) =>
    registration.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not authenticated, show loading or redirecting message
  if (!isAuthenticated) {
    return <div>Loading...</div>; // or a spinner, etc.
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TVS Vehicle Registrations</h1>
        <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md">
          <Users className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold text-blue-600">
            {registrations.length} Total Registrations
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex items-center space-x-4">
        <Search className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search by Contact Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-lg shadow-sm"
        />
      </div>

      {/* Form for Adding/Editing a Registration */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">
          {editId ? "Edit Registration" : "Add New Registration"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          />
          <input
            type="text"
            placeholder="Adhaar"
            value={adhaar}
            onChange={(e) => setNewAdhaar(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          />
          <select
            value={model}
            onChange={(e) => setNewModel(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          >
            <option value="">Select a Model</option>
            <option value="ApacheRTR">Apache</option>
            <option value="Raider">Raider</option>
            <option value="Jupiter">Jupiter</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-3 rounded-lg w-full shadow-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          onClick={handleAddRegistration}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          {editId ? "Update Registration" : "Submit"}
        </button>
      </div>

      {/* Registration List */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="table-auto w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Adhaar</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((registration) => (
              <tr key={registration.$id} className="border-b hover:bg-gray-50 transition-all duration-150">
                <td className="px-4 py-2">{registration.name}</td>
                <td className="px-4 py-2">{registration.contact}</td>
                <td className="px-4 py-2">{registration.adhaar}</td>
                <td className="px-4 py-2">{registration.address}</td>
                <td className="px-4 py-2">{registration.model}</td>
                <td className="px-4 py-2">{registration.status}</td>
                <td className="px-4 py-2">{new Date(registration.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditRegistration(registration)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRegistration(registration.$id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationDashboard;
