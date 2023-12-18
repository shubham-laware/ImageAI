import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const DB_KEY=process.env.DB_CONNECT;

export const dbConnect = async ()=>{
  try {
    await mongoose.connect(DB_KEY)
    console.log('DB CONNECTED')
  } catch (error) {
    console.log("DB CONNECTION ERROR",error)
  } 
}


