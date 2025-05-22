import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.cred}@cluster0.rhpbso1.mongodb.net/chatterbox?retryWrites=true&w=majority&appName=Cluster0`;
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

