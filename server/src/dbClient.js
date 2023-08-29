import { MongoClient } from "mongodb";
import mongoose from "mongoose"

const dbConnect = async () => {
 
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("Connected to db");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};
export default dbConnect;
