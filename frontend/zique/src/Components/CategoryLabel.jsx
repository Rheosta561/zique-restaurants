import React from 'react'

function CategoryLabel(props) {
  return (
    <div className='p-2 border mt-2 rounded-lg bg-white flex justify-between '>
        <p className='font-semibold'>{props.category}</p>
        {/* <button className='underline pr-2'>Edit</button> */}
    </div>
  )
}

export default CategoryLabel