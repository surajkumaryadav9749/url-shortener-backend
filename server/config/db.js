const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log(`Database connected successfully and the host is`);
    }
  } catch (error) {
    console.log("An error occured: ", error);
    process.exit(1);
  }
};

module.exports = connectDb;
