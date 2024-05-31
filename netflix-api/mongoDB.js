const mongoose = require('mongoose');

const uri = "mongodb+srv://dheeraj9508820247:hktKndNOXq6aPyPu@movibreak.zrieylp.mongodb.net/?retryWrites=true&w=majority&appName=movibreak"
async function connectToDB(){
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


module.exports = {connectToDB};