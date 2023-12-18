import express from "express";
import bodyParser from 'body-parser'
import dotenv from "dotenv";
import cors from 'cors'
import { dbConnect } from "./src/mongodb/dbConnect/dbConnect.js";
import dalleRoutes from "./src/routes/dalleRoutes.js";
import postRoutes from "./src/routes/postsRoutes.js"

dotenv.config();
const PORT = process.env.PORT;

await dbConnect();

const app=express()
app.use(bodyParser.json())
app.use(cors());
app.use('/api/v1/dalle',dalleRoutes)
app.use('/api/v1/post',postRoutes)


const startServer =  () => {
        app.listen(PORT, () => {
            console.log(`App starting at http://localhost:${PORT}`);
        });
};


startServer()
