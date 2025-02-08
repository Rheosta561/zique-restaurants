import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const { userId } = useParams();
    console.log('userId from params:', userId);
    const navigate = useNavigate();

    const [restaurantData, setRestaurantData] = useState({
        name: '',
        address: '',
        timings: '',
        price: '',
        location: '',
        menu: '',
        cuisine: '',
        phone: '',
        profileImage: null,
        coverImage: null,
        profileImagePreview: null,
        coverImagePreview: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`https://zique-restaurants-portal.onrender.com/find/${userId}`);
                console.log('API Response:', response);
    
                if (response.data.restaurant) {
                    const { restaurant } = response.data;
    
                    setRestaurantData({
                        name: restaurant.name,
                        address: restaurant.address,
                        timings: restaurant.timings,
                        price: restaurant.price,
                        location: restaurant.location,
                        menu: restaurant.menu,
                        cuisine: restaurant.cuisine,
                        phone: restaurant.phone,
                        profileImage: restaurant.profileImage,  
                        coverImage: restaurant.coverImage,      
                        profileImagePreview: restaurant.profileImage,
                        coverImagePreview: restaurant.coverImage,
                    });
                } else {
                    console.error('No restaurant found');
                    alert('No restaurant found');
                }
            } catch (error) {
                console.error('Error fetching restaurant data:', error.message);
                alert('Error fetching restaurant data');
            } finally {
                setLoading(false);
            }
        };
    
        if (userId) {
            fetchRestaurantData();
        }
    }, [userId]);
    console.log('hello' ,restaurantData.profileImage);

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRestaurantData({ ...restaurantData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);

            setRestaurantData((prevData) => ({
                ...prevData,
                [name]: file,
                [`${name}Preview`]: imageUrl,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', restaurantData.name);
        data.append('address', restaurantData.address);
        data.append('timings', restaurantData.timings);
        data.append('price', restaurantData.price);
        data.append('location', restaurantData.location);
        data.append('menu', restaurantData.menu);
        data.append('cuisine', restaurantData.cuisine);
        data.append('phone', restaurantData.phone);

        if (restaurantData.profileImage instanceof File) {
            data.append('profileImage', restaurantData.profileImage);
        }
        if (restaurantData.coverImage instanceof File) {
            data.append('coverImage', restaurantData.coverImage);
        }

        try {
            const response = await axios.post(`https://zique-restaurants-portal.onrender.com/profile/${userId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile updated:', response.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
        navigate(`/dashboard/${userId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(restaurantData.profileImage)

    return (
        <div className="min-h-screen w-screen overflow-hidden">
            <div className="border m-4 rounded-lg flex flex-col p-4">


                <div className="h-48 w-48 border mx-auto rounded-full">
                    <img
                        src={
                            restaurantData.profileImagePreview ||
                            restaurantData.profileImage ||
                            'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg'
                        }
                        alt='profile Image'
                        className="h-full w-full rounded-full"
                    />
                </div>
                <input type="file" id="profileImage" name="profileImage" className="hidden" onChange={handleFileChange} />
                <button
                    className="p-3 bg-gray-50 underline w-fit mx-auto mt-2 px-8 rounded-lg"
                    onClick={() => document.getElementById("profileImage").click()}
                >
                    Update Profile Picture
                </button>

                <hr className="mt-2 border rounded-full" />


                <div className="h-40 w-full border rounded-lg overflow-hidden mt-4">
                    <img
                        src={
                            restaurantData.coverImagePreview ||
                            restaurantData.coverImage ||
                            'https://via.placeholder.com/800x200'
                        }
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                </div>
                <input type="file" id="coverImage" name="coverImage" className="hidden" onChange={handleFileChange} />
                <button
                    className="p-3 bg-gray-50 underline w-fit mx-auto mt-2 px-8 rounded-lg"
                    onClick={() => document.getElementById("coverImage").click()}
                >
                    Update Cover Image
                </button>

                <form className="flex flex-col space-y-4 mt-4 p-4" onSubmit={handleSubmit}>
                    <label className="text-sm font-semibold" htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className="p-2 border rounded-lg" value={restaurantData.name} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" className="p-2 border rounded-lg" value={restaurantData.address} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="timings">Timings:</label>
                    <input type="text" id="timings" name="timings" className="p-2 border rounded-lg" value={restaurantData.timings} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="price">Price for Two:</label>
                    <input type="text" id="price" name="price" className="p-2 border rounded-lg" value={restaurantData.price} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="location">Location (Google Maps Link):</label>
                    <input type="url" id="location" name="location" className="p-2 border rounded-lg" value={restaurantData.location} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="menu">Menu (PDF Link):</label>
                    <input type="url" id="menu" name="menu" className="p-2 border rounded-lg" value={restaurantData.menu} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="cuisine">Cuisine:</label>
                    <input type="text" id="cuisine" name="cuisine" className="p-2 border rounded-lg" value={restaurantData.cuisine} onChange={handleInputChange} />

                    <label className="text-sm font-semibold" htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" className="p-2 border rounded-lg" value={restaurantData.phone} onChange={handleInputChange} />

                    <button type="submit" className="p-3 bg-zinc-800 text-white rounded-lg">Save</button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
