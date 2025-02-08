import React from 'react';
import { useNavigate } from 'react-router-dom';

function DishCard(props) {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(`/updateDish/${props.id}`)
  }
  return (
    <div className='flex border rounded-lg p-2 bg-white flex-col'>
      <h1 className='font-semibold text-zinc-700'>{props.name}</h1>
      <p className='text-sm text-gray-600'>Category: <span>{props.category || 'General'}</span></p>
      <p className='text-sm'>Price: <span>{props.price ? `${props.price} INR` : 'N/A'}</span></p>
      <p className='text-sm'>Cuisine: <span>{props.cuisine?.join(', ') || 'N/A'}</span></p>
      <p className='text-sm'>Meal Type: <span>{props.meal?.join(', ') || 'N/A'}</span></p>
      <p className='text-sm text-gray-600'>Restaurant: <span>{props.restaurant_name}</span></p>
      <button className='w-fit underline text-pink-950' onClick={handleClick}>Edit</button>
    </div>
  );
}

export default DishCard;
