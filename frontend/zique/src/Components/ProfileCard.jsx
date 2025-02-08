import React from 'react'


function ProfileCard(props) {
  return (
    <div className='w-full border rounded-lg bg-gray-50 p-2'>
        <h1 className='text-3xl font-semibold ml-1'>{props.name}</h1>
        <h2 className='text-sm font-semibold ml-1 text-zinc-800'>{props.address}</h2>
        <h2 className='text-xs font-semibold ml-1 text-zinc-700'>{props.phone}</h2>
        <div className='w-full border h-56 rounded-lg bg-white p-2 relative'>
  <img 
    src={props.coverImage || 'https://via.placeholder.com/800x200'} 
    alt="" 
    className='h-full w-full rounded-lg shadow-md brightness-75 object-cover' 
  />
  <div className='absolute text-white top-2 left-2 p-2 w-full h-full flex flex-col justify-between'>
    <div className='w-full h-fit flex justify-start pr-4'>
        <button className=' p-1 text-sm text-zinc-50 rounded-md bg-opacity-100  underline'>Change ?</button>
    </div>
    <div className='bottom-3 pt-4 flex justify-between items-end '>
        <div>
        <h1 className=' font-semibold'>{props.price}</h1>
        <h1 className='text-sm font-semibold'>{props.cuisine}</h1>
        <div className='h-4'></div>

        </div>

        <button className='mr-4 mb-4 bg-green-500 font-semibold p-2 rounded-lg text-sm'>{props.rating}</button>
        
    
    </div>
  </div>
</div>

    </div>
  )
}

export default ProfileCard