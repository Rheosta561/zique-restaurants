import React from 'react'
import logo from './1.jpg'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const handleStartClick = ()=>{
        navigate('/signup');
    }
  return (
    <div className='min-h-screen w-screen'>
        <div className='h-28 w-40  mx-auto mt-32'>
            <img src={logo} alt="" className='h-full w-full scale-150 object-cover ' />
        </div>
        <div className='text-center z-50 mt-24 font-semibold text-3xl '>Restaurant Portal</div>
        <h1 className='text-center font-semibold text-zinc-600 '>Your Perfect Wingman</h1>
        <div className='w-screen flex justify-center mt-4'>
        <button className=' w-fit bg-zinc-900 text-white p-4 rounded-full text-center text-xs hover:bg-zinc-950' onClick={handleStartClick}>Get Started</button>
        </div>
       
    </div>
  )
}

export default Home