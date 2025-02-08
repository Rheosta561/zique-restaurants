import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "./1.jpg";

function UpdateDish() {
  const { dishId } = useParams(); 
  const [dish, setDish] = useState({
    name: "",
    category: "",
    type: "",
    allergens: "",
    cuisine: "",
  });


  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`https://zique-auth.onrender.com/auth/dish/${dishId}`);
        if (response.status === 200) {
          const { name, category, type, allergens, cuisine } = response.data;
          setDish({
            name,
            category,
            type: type.join(", "), 
            allergens: allergens.join(", "),
            cuisine: cuisine.join(", "),
          });
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
        alert("Error fetching dish details.");
      }
    };

    fetchDish();
  }, [dishId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://zique-auth.onrender.com/auth/update-dish/${dishId}`, {
        ...dish,
      });

      alert("Dish updated successfully!");
    } catch (error) {
      console.error("Error updating dish:", error);
      alert("Error updating dish.");
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center p-6">
      <div className="flex h-20 w-20 mb-8">
        <img src={logo} alt="Logo" className="h-full w-full scale-150" />
      </div>

      <div className="text-gray-700 p-4 text-4xl md:text-5xl font-semibold text-center mt-6">
        Update Dish
        <hr className="border rounded-lg bg-pink-500 border-pink-400 mt-4 w-full" />
      </div>

      <div className="p-6 w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md text-gray-700 mt-6">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="text-sm font-semibold" htmlFor="name">
            Dish Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dish.name}
            onChange={handleChange}
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
            required
          />

          <label className="text-sm font-semibold" htmlFor="category">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={dish.category}
            onChange={handleChange}
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold" htmlFor="type">
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={dish.type}
            onChange={handleChange}
            placeholder="e.g., Vegetarian, Non-Vegetarian"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold" htmlFor="allergens">
            Allergens:
          </label>
          <input
            type="text"
            id="allergens"
            name="allergens"
            value={dish.allergens}
            onChange={handleChange}
            placeholder="e.g., Nuts, Dairy"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <label className="text-sm font-semibold" htmlFor="cuisine">
            Cuisine:
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={dish.cuisine}
            onChange={handleChange}
            placeholder="e.g., Italian, Indian"
            className="p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-pink-500"
          />

          <button
            type="submit"
            className="bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
          >
            Update Dish
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDish;
