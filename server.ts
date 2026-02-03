import dotenv from "dotenv";
dotenv.config();
import express ,{ Request, Response } from "express";
import {connectDB} from './config/db';
import inviteRoutes from "./routes/inviteRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes"
import cors from "cors";
const app=express();
const PORT=3000;
dotenv.config();
app.use(express.json())
app.use(cors());
connectDB();
app.get('/',(req: Request , res: Response)=>{
    res.send("API is working");
})
app.use('/api',userRoutes);
app.use('/api/invites',inviteRoutes)
app.use('/api/projects',projectRoutes);
app.use('/api',taskRoutes);
app.listen(PORT,()=>{
    console.log(`Server is Running at the ${PORT}`)
})