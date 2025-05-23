import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionURI);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
