import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API calls

export default function Home() {
  // State for handling user input and API response
  const [formData, setFormData] = useState({ name: "", symptoms: "" });
  const [response, setResponse] = useState(""); // Stores response from backend

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      // POST data to the backend API
      const res = await axios.post("http://localhost:8000/api/predict", formData);
      setResponse(res.data.message); // Display backend response
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setResponse("Failed to connect to backend.");
    }
  };

  return (
    <div>
      <h1>PCOS Diagnosis Platform</h1>
      {/* Form to collect user input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>} {/* Display response message */}
    </div>
  );
}