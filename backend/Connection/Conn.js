const mongoose = require('mongoose');
require('dotenv').config();

const conn = async()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('mongoose connected');
        
    } catch (error) {
        console.log('Something went wrong ', error.message);
        
    }
    
}
conn();
module.exports = conn;