import React, { useState, useEffect } from 'react';
import SideBar from './Components/SideBar';
import logo from './1.jpg';
import ProfileCard from './Components/ProfileCard';
import CategoryLabel from './Components/CategoryLabel';
import DishCard from './Components/DishCard';
import AddNewCard from './Components/AddNewCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { userId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [dishes, setDishes] = useState([]); 
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`https://zique-restaurants-portal.onrender.com/find/${userId}`);
        if (response.data.restaurant) {
          setRestaurant(response.data.restaurant);
          setName(response.data.restaurant.name);
        } else {
          alert('No restaurant found');
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        alert('Error fetching restaurant');
      }
    };

    fetchRestaurant();
  }, [userId]);

  useEffect(() => {
    if (restaurant._id) {
      const fetchDishes = async () => {
        try {
          const response = await axios.get(`https://zique-auth.onrender.com/auth/dishes/${restaurant._id}`);
          setDishes(response.data);
        } catch (error) {
          console.error('Error fetching dishes:', error);
          alert('Error fetching dishes');
        }
      };

      fetchDishes();
    }
  }, [restaurant._id]);

  // Group dishes by category
  const groupedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  return (
    <div className='flex gap-2 -screen'>
      <SideBar userId={userId} />
      <div className='md:ml-64 md:mr-2 my-2 rounded-lg p-1 h-screen overflow-scroll w-full md:border'>
        <div className='w-full h-32'>
          <img src={logo} className='h-full mx-auto -mt-8' alt="Logo" />
        </div>

        <ProfileCard
          name={restaurant?.name}
          cuisine={restaurant?.cuisine}
          timings={restaurant?.timings}
          address={restaurant?.address}
          phone={restaurant?.phone}
          coverImage={restaurant?.coverImage}
          price={restaurant?.price}
          rating={restaurant?.ratings}
        />

        <div className='w-full border mt-2 rounded-lg p-2 bg-gray-50'>
          <h1 className='text-3xl font-semibold'>Dishes In The Menu
            <hr className='w-full border border-zinc-400 rounded-2xl' />
          </h1>

          {Object.keys(groupedDishes).length > 0 ? (
            Object.entries(groupedDishes).map(([category, dishesInCategory]) => (
              <div key={category} className="mt-4">
                <CategoryLabel category={category} />
                <div className='w-full mt-2 border p-2 rounded-lg bg-gray-100 grid grid-cols-2 gap-2 md:grid-cols-3'>
                  {dishesInCategory.map((dish) => (
                    <DishCard
                      key={dish._id}
                      name={dish.name}
                      price={dish.price}
                      category={dish.category}
                      cuisine={dish.cuisine}
                      meal={dish.meal}
                      restaurant_name={dish.restaurant_name}
                      id={dish._id}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No dishes available</p>
          )}

          <AddNewCard id={userId} name={name} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
