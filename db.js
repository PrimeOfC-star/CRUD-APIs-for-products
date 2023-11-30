const mongoose = require("mongoose")

//mongodb://127.0.0.1:27017/test

//connecting to db
async function dbConnect(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/digiapt")  
        console.log("database is connected");   
    } catch (error) {
        console.log("something gone wrong",error);
    }
}

module.exports = dbConnect