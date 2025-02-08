import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddNewCard(props) {
  const navigate = useNavigate();
  const name=props.name ;
  const id= props.id;
  const handleClick=()=>{
    navigate(`/add/${id}/${name}`)
  }
  return (
    <div className='flex border rounded-lg p-2 bg-white flex-col'>
    <button className='bg-zinc-100 p-2 rounded-lg hover:bg-zinc-400 transition-all' onClick={handleClick}>Add New</button>
</div>
  )
}

export default AddNewCard