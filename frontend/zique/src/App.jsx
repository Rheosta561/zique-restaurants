import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import Dish from './Dish'
import ProfilePage from './ProfilePage'
import FoodGallery from './FoodGallery'
import UpdateDish from './UpdateDish'
import AmbienceGallery from './FoodGallery'
import Login from './Login'
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard/:userId" element={<Dashboard/>}/>
    <Route path="/add/:userId/:username" element={<Dish/>}/>
    <Route path="/profile/:userId" element={<ProfilePage/>}/>
    <Route path="/foodGallery/:userId" element={<FoodGallery/>}/>
    <Route path="/ambienceGallery/:userId" element={<AmbienceGallery/>}/>
    <Route path="/updateDish/:dishId" element={<UpdateDish/>}/>

    
   </Routes>
   </BrowserRouter>
  )
}

export default App