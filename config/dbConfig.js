const mongoose = require("mongoose");

const connectDB = async function (uri) {
  try {
    await mongoose.connect(uri);
    console.log(`DB connected successfully !`);
  } catch (error) {
    console.log(`DB connection error : ${error}`);
  }
};



module.exports = connectDB;