const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(
      "mongodb+srv://todoListAdmin:todoListAdmin@todolistcluster.cz2jqg4.mongodb.net/todoListDB?retryWrites=true&w=majority"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log("Error occurred in the MongoDB Database!\n", error);
    process.exit(1);
  }
};

module.exports = connectDB;
