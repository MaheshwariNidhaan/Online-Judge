const mongoose = require("mongoose"); //ODM it will act between our Nodejs and mongoDB
const dotenv = require("dotenv");

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGO_URI); //mongoose is helping us to connect with mongoDb
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};

module.exports = { DBConnection }; // can even use single brackets here but if in future i wish to write multiple functions then it will come in handy

//after this we have set up our database but now we need to store data in our database for which we need schema
//hence models folder is present
