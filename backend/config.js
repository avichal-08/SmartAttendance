import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected ")
    }catch(error){
        console.error("MongoDB connection error ", error)
    }
}

export {connectDB}