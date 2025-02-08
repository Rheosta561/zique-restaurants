const express = require('express');
const path = require('path');
const app = express();
const conn = require('./Connection/Conn');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
const Restaurant = require('./Models/restaurant');
const cloudinary = require("./cloudinary");
const multer = require('multer');
conn();
const cors = require('cors')

const mongoose = require('mongoose');
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/' , (req,res)=>{
    res.send('The restaurant service is working fine');
});

app.post('/createUser' , async(req,res)=>{
    try {
        const{username, password}= req.body;
        const existingUser = await Restaurant.findOne({username});
        if(existingUser){
            return res.json({message:"Username already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Restaurant.create({username,
            password
        });
        console.log(user);
        res.status(200).json({user});
        
    } catch (error) {
        res.status(404).json({message:"Something went wrong",
            error:error.message
        });
        
    }
    
});
app.post('/verify', async(req,res)=>{
    try {
        const{username,password} = req.body;
        const foundUser = await Restaurant.findOne({username});
        if(!foundUser){
            return res.status(404).json({message:"User Not Found"});

        }
        if(foundUser.password===password){
            res.status(200).json({message:"Access Granted",
                user:foundUser
            });
        }else{
            return res.status(404).json({message:"Username or Password is Wrong"})
        }
        
    } catch (error) {
        res.status(404).json({message:"Something went wrong",
            error:error.message}
        );
        
    }
    
});
app.post('/profile/:userId', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('hit');
        const { userId } = req.params;
        const { name, address, timings, price, location, cuisine, menu, phone } = req.body;

        const updateData = {
            name,
            address,
            timings,
            price,
            location,
            cuisine,
            menu,
            phone,
            userId,
        };


        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                uploadStream.end(fileBuffer);
            });
        };

        if (req.files['profileImage']) {
            updateData.profileImage = await uploadToCloudinary(req.files['profileImage'][0].buffer);

        }

        if (req.files['coverImage']) {
            updateData.coverImage = await uploadToCloudinary(req.files['coverImage'][0].buffer);

        }

        const restaurant = await Restaurant.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true, upsert: true }
        );


        res.status(200).json({ message: 'Profile updated successfully', data: restaurant });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});




app.get('/find/:userId', async (req, res) => {
    try {

        const restaurant = await Restaurant.findOne({ _id: req.params.userId });

        if (!restaurant) {
            return res.status(400).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ restaurant });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});








app.post('/createRestaurant', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'food' },
    { name: 'ambience' }
]), async (req, res) => {
    try {
        const {
            name, ratings, cuisine, address, dateTime, price,
            phone, menu, location, timings
        } = req.body;

        const profileImage = req.files['profileImage'] ? {
            data: req.files['profileImage'][0].buffer,
            contentType: req.files['profileImage'][0].mimetype
        } : null;

        const coverImage = req.files['coverImage'] ? {
            data: req.files['coverImage'][0].buffer,
            contentType: req.files['coverImage'][0].mimetype
        } : null;

        const food = req.files['food'] ? req.files['food'].map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        })) : [];

        const ambience = req.files['ambience'] ? req.files['ambience'].map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        })) : [];


        const restaurant = await Restaurant.create({
            name,
            ratings,
            cuisine,
            address,
            dateTime,
            price,
            phone,
            menu,
            location,
            timings,
            profileImage,
            coverImage,
            food,
            ambience
        });

        res.status(201).json({ message: 'Restaurant created successfully', restaurant });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
});

app.post('/foodGallery/upload/:userId', upload.array('images', 15), async (req, res) => {
    try {
        const { userId } = req.params;


        const restaurant = await Restaurant.findById(userId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }


        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        const updatedImages = [...restaurant.food, ...uploadedImages];

        restaurant.food = updatedImages;
        await restaurant.save();

        res.status(200).json({
            message: 'Images uploaded successfully',
            images: updatedImages,
        });

    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
app.post('/delete/food/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { imageUrls } = req.body; 
        if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
            return res.status(400).json({ message: 'No images provided for deletion' });
        }

        const restaurant = await Restaurant.findById(userId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }


        restaurant.food = restaurant.food.filter(url => !imageUrls.includes(url));
        await restaurant.save();

        res.status(200).json({
            message: 'Images deleted successfully',
            images: restaurant.food, 
        });
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});


// For ambience photos
app.post('/ambienceGallery/upload/:userId', upload.array('images', 15), async (req, res) => {
    try {
        const { userId } = req.params;

        const restaurant = await Restaurant.findById(userId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        const updatedImages = [...restaurant.ambience, ...uploadedImages];

        restaurant.ambience = updatedImages;
        await restaurant.save();

        res.status(200).json({
            message: 'Ambience images uploaded successfully',
            images: updatedImages,
        });

    } catch (error) {
        console.error('Error uploading ambience images:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

app.post('/delete/ambience/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { imageUrls } = req.body; 

        if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
            return res.status(400).json({ message: 'No images provided for deletion' });
        }

        const restaurant = await Restaurant.findById(userId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }


        restaurant.ambience = restaurant.ambience.filter(url => !imageUrls.includes(url));
        await restaurant.save();

        res.status(200).json({
            message: 'Ambience images deleted successfully',
            images: restaurant.ambience, 
        });
    } catch (error) {
        console.error('Error deleting ambience images:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});







app.listen(3000, ()=>{
    console.log('server is live and running on port 3000');
});