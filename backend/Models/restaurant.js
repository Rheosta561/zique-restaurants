const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Restaurant name is required'], 
    default: 'Unnamed Restaurant' 
  },
  ratings: { 
    type: Number, 
    min: 0, 
    max: 5, 
    required: true, 
    default: 4 
  },
  cuisine: { 
    type: String, 
    required: [true, 'Cuisine type is required'], 
    default: 'Not Specified' 
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'], 
    default: 'Not Provided' 
  },
  dateTime: { 
    type: Date, 
    default: Date.now 
  },
  price: { 
    type: String, 
    required: [true, 'Price range is required'], 
    default: 'Moderate' 
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'], 
    default:"91 XXXXXXXX"
  },
  food: [String],
  ambience: [String],
  profileImage: { type:String },
  coverImage: { type:String },
  menu: { type: String, default: 'No menu available' },
  location: { 
    type: String, 
    required: [true, 'Location is required'], 
    default: 'Unknown' 
  },
  timings: { 
    type: String, 
    required: [true, 'Timings are required'], 
    default: '9 AM - 9 PM' 
  },
  username: { 
    type: String, 
    unique: true, 
    required: [true, 'Username is required'] 
  },
  password: { 
    type: String,
    required: [true, 'Password is required'] 
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
