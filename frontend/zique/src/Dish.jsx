import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "./1.jpg";

function Dish() {
  const { userId, username } = useParams(); // Get params from URL
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    allergens: "",
    cuisine: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      restaurant_id: userId,
      restaurant_name: username,
      ...formData,
    };

    try {
      const response = await axios.post("https://zique-auth.onrender.com/auth/create-dish", requestData);
      alert("Dish created successfully!");
      setFormData({
        name: "",
        category: "",
        type: "",
        allergens: "",
        cuisine: "",
      });
    } catch (error) {
      console.error("Error creating dish:", error);
      alert("Failed to create dish.");
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center p-6">
      <div className="flex h-20 w-20 mb-8">
        <img src={logo} alt="Logo" className="h-full w-full scale-150" />
      </div>

      <div className="text-gray-600 text-xs pt-2">Your Amazing Dining Guide</div>
      <div className="text-gray-600 text-xs">Your Perfect Wingman</div>
      <div className="text-pink-600 opacity-75 text-sm">Admin Server</div>

      <div className="text-gray-700 p-4 text-4xl md:text-5xl font-semibold text-center mt-6">
        {username}
        <hr className="border rounded-lg bg-pink-500 border-pink-400 mt-4 w-full" />
      </div>

      <div className="p-6 w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md text-gray-700 mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="text-sm font-semibold">Dish Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
            required
          />

          <label className="text-sm font-semibold">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Appetizer, Dessert"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold">Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="e.g., Vegetarian, Non-Vegetarian"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold">Allergens:</label>
          <input
            type="text"
            name="allergens"
            value={formData.allergens}
            onChange={handleChange}
            placeholder="e.g., Nuts, Dairy"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold">Cuisine:</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., Italian, Indian"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">
            Create Dish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dish;
